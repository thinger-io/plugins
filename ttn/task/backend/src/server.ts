import express, { Express, Request, Response } from 'express';
import { FrontEndRouter } from './frontend/routes.js';
import process from "node:process";
import { DevicesApi, PluginsApi, ApiException, PropertyCreate } from "@thinger-io/thinger-node";
import { request } from 'undici'

import { thingerApiConfig } from "./lib/api.js";
import { DownlinkMessage, parseEncodedToken } from "./lib/loriot.js";
import { Log } from "./lib/log.js";
import { stringify } from 'node:querystring';

const _user: string = process.env.THINGER_USER || "";
const _plugin = process.env.THINGER_PLUGIN || "";

// Initialize Products and Plugins API
const devicesApi = new DevicesApi(thingerApiConfig);
const pluginsApi = new PluginsApi(thingerApiConfig);

export type Application = {
  applicationId: string;
  applicationName: string;
  deviceIdPrefix: string;
  accessToken: string;
  enabled: boolean;
}

let settings: { applications: Application[] } = { applications: [] };

const app: Express = express();
app.enable('trust proxy');
app.use(express.json({ strict: false, limit: '8mb' }))

// Serve the API
app.post(`/downlink`, async (req: Request, res: Response) => {

  Log.log("Received downlink message:\n", JSON.stringify(req.body, null, 2));

  const { data, port, priority, confirmed, device_id, application_id } = req.body;

  if (!data || !device_id) {
    return res.status(400).send({ message: "Missing required fields: data or device_id" });
  }

  ///////////////////////////////////////////

  if (req.body.data === '' || req.body.data === null || req.body.data === 'null') {
    return res.status(200).send({
      cmd: "",
      EUI: "",
      data: "",
      port: 0,
      priority: 0,
      success: "",
      error: "Enter a valid downlink message"
    });
  }

  // find data by token
  const application: Application | undefined = settings.applications.find(
    (app: { applicationName: string }) => app.applicationName
  );
  if (typeof application === 'undefined') {
    Log.error(`Application ${req.body.uplink.appId} not found`);
    return res.status(404).send({ message: "Application not found" });
  }
  if (typeof application.accessToken === 'undefined') {
    Log.error(`Access token not found for application ${req.body.uplink.appId}`);
    return res.status(400).send({ message: "Application access token not found" });
  }

  try {
    //Obtain the device properties to get the downlink URL and API key
    Log.log("Fetching device properties for downlink:", device_id);
    const downlinkInfoResponse = await devicesApi.readProperty(_user, device_id, "downlink_info");
    const downlinkInfo = downlinkInfoResponse.value || {};

    const downlinkUrl = downlinkInfo.push_url || downlinkInfo.replace_url;
    const apiKey = downlinkInfo.api_key;

    if (!downlinkUrl || !apiKey) {
      Log.error("Downlink URL or API key not found in device properties");
      return res.status(500).send({ message: "Downlink URL or API key not found in device properties" });
    }

    const downlinkPayload = {
      downlinks: [
        {
          f_port: req.body.port,
          frm_payload: req.body.data, // base64
          priority: req.body.priority || "NORMAL",
          confirmed: req.body.confirmed || false
        }
      ]
    };

    Log.log("Sending downlink to TTN:", JSON.stringify(downlinkPayload, null, 2));
    Log.log("Using URL:", downlinkUrl);

    const downlink_headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    };

    const { statusCode, body } = await request(downlinkUrl, {
      method: 'POST',
      headers: downlink_headers,
      body: JSON.stringify(downlinkPayload)
    });

    // Process response
    let responseBody = '';
    for await (const chunk of body) {
      responseBody += chunk.toString();
    }
    let parsedBody;
    try {
      parsedBody = JSON.parse(responseBody);
    } catch {
      parsedBody = responseBody;
    }

    Log.debug(`Downlink response:\n`, statusCode, parsedBody);
    res.status(statusCode).send(parsedBody);

  } catch (err: any) {
    Log.error("Error while sending downlink:", err.message || err);
    res.status(500).send({ message: "Error while sending downlink", error: err.message || err });
  }

});

// Default uplink endpoint
app.post(`/uplink`, (req: Request, res: Response) => {

  Log.info("Received message from device:\n", JSON.stringify(req.body, null, 2));
  Log.info("Headers recibidos:", JSON.stringify(req.headers, null, 2));

  // Application id is recieved in payload from TTN according to
  // TTN-Data-Format specifications:
  // https://www.thethingsindustries.com/docs/integrations/data-formats/
  const applicationId = req.body.end_device_ids.application_ids.application_id;

  const application: Application | undefined = settings.applications.find((app: { applicationName: string }) => app.applicationName === applicationId);

  if (typeof application === 'undefined') {
    Log.error(`Application ${applicationId} not found`);
    res.status(404).send({ message: "Application not found" });
    return;
  }

  const device = `${application.deviceIdPrefix}${req.body.end_device_ids.dev_eui}`;
  console.log("Device:", device);

  // Add the source to handle other LNS
  req.body["source"] = "ttn";

  devicesApi.accessInputResources(_user, device, 'uplink', req.body).then(() => {
    Log.log("Uplink of callback handled:", device);

    // In order to make downlink requests, it is necessary to store relevant data from
    // the uplink payload in the device's properties.

    Log.info("Headers recibidos:", JSON.stringify(req.headers, null, 2));

    const downlinkInfo = {
      api_key: req.header("X-Downlink-Apikey") || "",
      push_url: req.header("X-Downlink-Push") || "",
      replace_url: req.header("X-Downlink-Replace") || "",
      domain: req.body.uplink_message?.network_ids?.cluster_address || "",
    };


    const prop = new PropertyCreate();
    prop.property = "downlink_info";
    prop.value = downlinkInfo;

    devicesApi.createProperty(_user, device, prop)
      .then(() => {
        Log.info("Downlink info updated for device", device);
        res.status(200).send();
      })
      .catch((err: ApiException<any>) => {
        Log.error("Error saving downlink info", err);
        res.status(500).send({ message: "Error saving downlink info" });
      });
  }).catch((error: ApiException<any>) => {
    Log.log("Error while handling uplink", error);
    res.status(500).send();
  });
});

// Endpoint to return the os environment variables that start with THINGER
app.get("/env", (req: Request, res: Response) => {
  const thingerEnv = Object.keys(process.env)
    .filter((key) => key.startsWith("THINGER"))
    .reduce((obj: { [key: string]: string }, key) => {
      obj[key] = process.env[key] as string;
      return obj;
    }, {});
  res.json(thingerEnv);
});

// Endpoint to return the plugin settings
app.get("/settings", async (req: Request, res: Response) => {
  res.json(settings);
});

// Endpoint to send the plugins
app.post("/settings", async (req: Request, res: Response) => {
  Log.log("Post settings", req.body);
  saveSettings(req.body).then((response: { value: { applications: Application[] } }) => {
    settings = response.value;
    res.status(200).send(settings);
  }).catch((error: any) => {
    res.status(400).send(error);
  });

});

// Serve the Angular app after the API
app.use(FrontEndRouter);

// Settings functions
function saveSettings(value: object = {}) {

  const prop = new PropertyCreate();
  prop.property = "settings";
  prop.value = value;

  return pluginsApi.createProperty(_user, _plugin, prop);
}

function readSettings() {

  pluginsApi.readProperty(_user, _plugin, "settings").then((response: { value: { applications: Application[] } }) => {

    Log.debug("Retrieved settings:\n", JSON.stringify(response, null, 2));
    settings = response.value;

    //}).catch((error: PluginsApiResponseProcessor) => {
  }).catch((error: ApiException<any>) => {

    if (error.code === 404) {
      //Log.log(error.message);
      Log.log("Settings property not found, initializing...");
    }

    // Initialize empty value settings
    saveSettings({ "applications": [] }).then((response: { value: { applications: Application[] } }) => {
      settings = response.value;
      Log.log(`Settings initialized: ${response}`);
    }).catch((error: any) => {
      // TODO: Do something, show an error message, etc.
      Log.error(`Error initializing settings: ${error.message}`);
    });

  });
}

// Read settings on startup
readSettings();

app.listen(3000, () => {
  Log.log("Server running on port 3000");
});
