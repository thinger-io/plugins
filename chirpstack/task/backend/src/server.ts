import express, { Express, Request, Response } from 'express';
import { FrontEndRouter } from './frontend/routes.js';
import process from "node:process";
import { DevicesApi, PluginsApi, ApiException, PropertyCreate } from "@thinger-io/thinger-node";
import { request } from 'undici'

import { thingerApiConfig } from "./lib/api.js";
import { Log } from "./lib/log.js";
import { stringify } from 'node:querystring';

const _user: string = process.env.THINGER_USER || "";
const _plugin = process.env.THINGER_PLUGIN || "";

// Initialize Products and Plugins API
const devicesApi = new DevicesApi(thingerApiConfig);
const pluginsApi = new PluginsApi(thingerApiConfig);

// Initialize chirpstack gRPC api
import * as grpc from '@grpc/grpc-js';
import * as device_grpc from "@chirpstack/chirpstack-api/api/device_grpc_pb";
import * as device_pb from "@chirpstack/chirpstack-api/api/device_pb";


export type chirpstackApplication = {
  applicationId: string;
  applicationName: string;
  deviceIdPrefix: string;
  accessToken: string;
  serverUrl: string;
  enabled: boolean;
}

let settings: { applications: chirpstackApplication[] } = { applications: [] };

const app: Express = express();
app.enable('trust proxy');
app.use(express.json({ strict: false, limit: '8mb' }))

// Serve the API
/*
Downlink endpoint expects a JSON body with the following fields:
- data: poayload to send (base64 encoded)
- port: port to use for the downlink message
- priority: priority of the downlink message
- confirmed: whether the downlink message is confirmed or not
- uplink: last uplink message to use for the downlink (stored in the device properties)

This JSON body is used by all LNS plugins supported by Thinger.io, including ChirpStack, TTN and LORIOT.
*/
app.post("/downlink", async (req: Request, res: Response) => {

  Log.log("Received downlink message:\n", JSON.stringify(req.body, null, 2));

  const { data, port, priority, confirmed, uplink } = req.body;

  if (!data || !uplink) {
    res.status(400).send({ message: "Missing required fields: data or uplink" });
    return;
  }

  // Obtain the device ID from the uplink message
  const deviceId = uplink.deviceInfo.devEui;

  if (req.body.data === '' || req.body.data === null || req.body.data === 'null') {
    res.status(200).send({
      error: "Enter a valid downlink message"
    });
    return;
  }

  // find data
  const application: chirpstackApplication | undefined = settings.applications.find(
    (app: { applicationName: string }) => app.applicationName
  );
  if (typeof application === 'undefined') {
    Log.error(`Application not found`);
    res.status(404).send({ message: "Application not found" });
    return;
  }

  try {
    Log.log("Fetching data for downlink:", deviceId);
    
    const server = application.serverUrl;
    const apiKey = application.accessToken;

    if (!server || !apiKey) {
      Log.error("Downlink URL or API key not found in application settings");
      res.status(500).send({ message: "Downlink URL or API key not found in application settings" });
      return;
    }

    // Create the client for the DeviceService.
    const deviceService = new device_grpc.DeviceServiceClient(
      server,
      grpc.credentials.createInsecure(),
    );

    // Create the Metadata object.
    const metadata = new grpc.Metadata();
    metadata.set("authorization", "Bearer " + apiKey);

    const item = new device_pb.DeviceQueueItem(); 
    item.setDevEui(deviceId);
    item.setFPort(port || 1); // Default to port 1 if not provided
    item.setConfirmed(confirmed || false); // Default to false if not provided
    item.setData(Buffer.from(data, 'base64')); // Decode base64 data

    const enqueueReq = new device_pb.EnqueueDeviceQueueItemRequest();
    enqueueReq.setQueueItem(item);

    deviceService.enqueue(enqueueReq, metadata, (err, resp) => {
      if (err !== null) {
        Log.error("Error while sending downlink:", err.message || err);
        res.status(500).send({ message: "Error while sending downlink", error: err.message || err });
        return;
      }
    });

    Log.log("Downlink message sent successfully for device:", deviceId);
    res.status(200).send({ message: "Downlink message sent successfully", deviceId: deviceId });

  } catch (err: any) {
    Log.error("Error while sending downlink:", err.message || err);
    res.status(500).send({ message: "Error while sending downlink", error: err.message || err });
  }

});

// Default uplink endpoint
app.post(`/uplink`, (req: Request, res: Response) => {

  Log.debug("Received message from device:\n", JSON.stringify(req.body, null, 2));
  //Log.debug("Headers:", req.headers);

  const applicationId = req.body.deviceInfo.applicationName;

  const application: chirpstackApplication | undefined = settings.applications.find((app: { applicationName: string }) => app.applicationName === applicationId);

  if (typeof application === 'undefined') {
    Log.error(`Application ${applicationId} not found`);
    res.status(404).send({ message: "Application not found" });
    return;
  }

  const device = `${application.deviceIdPrefix}${req.body.deviceInfo.devEui}`;

  // Add the source to handle other LNS
  req.body["source"] = "chirpstack";

  Log.log("HTTP PUSH 'uplink' for user ", _user, "device", device, "application", applicationId);
  devicesApi.accessInputResources(_user, device, 'uplink', req.body).then(() => {
    Log.log("Uplink of callback handled:", device);
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
  saveSettings(req.body).then((response: { value: { applications: chirpstackApplication[] } }) => {
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

  pluginsApi.readProperty(_user, _plugin, "settings").then((response: { value: { applications: chirpstackApplication[] } }) => {

    Log.debug("Retrieved settings:\n", JSON.stringify(response, null, 2));
    settings = response.value;

    //}).catch((error: PluginsApiResponseProcessor) => {
  }).catch((error: ApiException<any>) => {

    if (error.code === 404) {
      //Log.log(error.message);
      Log.log("Settings property not found, initializing...");
    }

    // Initialize empty value settings
    saveSettings({ "applications": [] }).then((response: { value: { applications: chirpstackApplication[] } }) => {
      settings = response.value;
      Log.log(`Settings initialized: ${JSON.stringify(response)}`);
    }).catch((error: any) => {
      // TODO: Do something, show an error message, etc.
      Log.error(`Error initializing settings: ${error.message}`);
    });

  });
}

// Read settings on startup
readSettings();

app.listen(4444, () => {
  Log.log("Server running on port 4444");
});
