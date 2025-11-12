import express, { Express, Request, Response } from 'express';
import { FrontEndRouter } from './frontend/routes.js';
import process from "node:process";
import { DevicesApi, PluginsApi, ApiException, PropertyCreate } from "@thinger-io/thinger-node";
import { request } from 'undici'
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

import { thingerApiConfig } from "./lib/api.js";
import { Log } from "./lib/log.js";
import { UserEvents } from './lib/user-events.js';

const _user: string = process.env.THINGER_USER || "";
const _plugin = process.env.THINGER_PLUGIN || "";

// Initialize Products and Plugins API
const devicesApi = new DevicesApi(thingerApiConfig);
const pluginsApi = new PluginsApi(thingerApiConfig);

export type ttnApplication = {
  applicationId: string;
  applicationName: string;
  deviceIdPrefix: string;
  accessToken: string;
  enabled: boolean;
}

let settings: { applications: ttnApplication[] } = { applications: [] };

// Set up user events logger. This logger is used to give the user feedback about
// the plugin operations. It souldnt be used for debugging purposes.
const userEvents = new UserEvents();

const app: Express = express();
app.enable('trust proxy');
app.use(express.json({ strict: false, limit: '8mb' }))

const httpServer = createServer(app);

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  path: '/socket.io'
});

/**
 * Convert a TTN uplink message into a common Thinger.io uplink format.
 * This "common" format can be found in the Thinger.io LoRaWAN plugins documentation.
 *
 * @param {Object} msg - TTN uplink message.
 * @returns {Object} - Thinger.io uplink message.
 */
function ttnToThinger(msg: any, appId: string, deviceId: string): any {
  if (!msg) {
    throw new Error('Invalid message: msg is undefined or null');
  }

  if (!msg.end_device_ids?.dev_eui) {
    throw new Error('Invalid message: missing device EUI');
  }

  if (!msg.uplink_message) {
    throw new Error('Invalid message: missing uplink_message');
  }

  // If no device template was selected in TTN workspace, encoded data
  // will be sent as raw payload 

  const rawPayload = msg.uplink_message?.frm_payload || null;
  let hexPayload = null;
  if (rawPayload) {
    try {
      hexPayload = Buffer.from(rawPayload, 'base64').toString('hex');
    } catch (error) {
      console.error('Error converting payload to hex:', error);
      hexPayload = null;
    }
  }

  return {
    deviceEui: msg.end_device_ids.dev_eui,
    deviceId: deviceId || '',
    source: 'ttn',
    appId: appId || '',
    fPort: msg.uplink_message?.f_port ?? null,
    fCnt: msg.uplink_message?.f_cnt ?? null,
    payload: hexPayload,
    decodedPayload: msg.uplink_message?.decoded_payload || null,
    metadata: {
      ack: msg.ack ?? null,
      battery: msg.uplink_message?.last_battery_percentage?.value ?? null,
      offline: msg.offline ?? null,
      seqNo: msg.seqno ?? null
    }
  };
} 

// Serve the API
app.post("/downlink", async (req: Request, res: Response) => {

  Log.log("Received downlink message:\n", JSON.stringify(req.body, null, 2));

  const { data, port, priority, confirmed, uplink } = req.body;

  if (!data || !uplink) {
    userEvents.push({
      category: 'error',
      severity: 'error',
      title: 'Downlink rejected: missing required fields',
      details: {
        error: 'Missing data or uplink information',
        received: { data, uplink }
      }
    });
    res.status(400).send({ message: "Missing required fields: data or uplink" });
    return;
  }

  if (data === '' || data === null || data === 'null') {
    userEvents.push({
      category: 'warning',
      severity: 'warning',
      title: 'Downlink rejected: invalid data',
      device: uplink.deviceEui,
      details: {
        error: 'Empty or null data provided',
        deviceId: uplink.deviceId
      }
    });
    res.status(200).send({
      error: "Enter a valid downlink message"
    });
    return;
  }

  // find data
  const application: ttnApplication | undefined = settings.applications.find(
    (app: { applicationName: string }) => app.applicationName
  );
  if (typeof application === 'undefined') {
    Log.error(`Application not found`);
    userEvents.push({
      category: 'error',
      severity: 'error',
      title: 'Downlink failed: application not configured',
      device: uplink.deviceEui,
      details: {
        error: 'Application not found in plugin settings',
        deviceId: uplink.deviceId
      }
    });
    res.status(404).send({ message: "Application not found" });
    return;
  }

  try {
    //Obtain the device properties to get the downlink URL and API key
    Log.log("Fetching device properties for downlink:", uplink.deviceId);
    const downlinkInfoResponse = await devicesApi.readProperty(_user, uplink.deviceId, "downlink_info");
    const downlinkInfo = downlinkInfoResponse.value || {};

    let downlinkUrl = downlinkInfo.replace_url || downlinkInfo.push_url;
    const apiKey = downlinkInfo.api_key;

    if (!downlinkUrl || !apiKey) {
      Log.error("Downlink URL or API key not found in device properties");
      userEvents.push({
        category: 'error',
        severity: 'error',
        title: 'Downlink failed: missing configuration',
        device: uplink.deviceEui,
        details: {
          error: 'Downlink URL or API key not found',
          deviceId: uplink.deviceId,
          hasUrl: !!downlinkUrl,
          hasApiKey: !!apiKey
        }
      });
      res.status(500).send({ message: "Downlink URL or API key not found in device properties" });
      return;
    }

    // Parse priority. Given Thinger.io standard downlink format. "Priority" is a unsigned
    // integer from 0 (lowest priority) to 6 (highest priority)
    const priorityLevels = ["LOW","LOW","NORMAL", "NORMAL", "NORMAL", "HIGH", "HIGH"];
    const priority_str = priorityLevels[priority] || "NORMAL";

    // Data is StringHex encoded
    const data_base64 = Buffer.from(data, 'hex').toString('base64');

    const downlinkPayload = {
      downlinks: [
        {
          f_port: port,
          frm_payload: data_base64,
          priority: priority_str,
          confirmed: confirmed || false,
        }
      ]
    };

    console.log("Downlink Payload:", downlinkPayload);

    if (req.body.replace_downlink) {
      downlinkUrl = downlinkInfo.replace_url;
    } else {
      downlinkUrl = downlinkInfo.push_url;
    }

    Log.log("Using URL:", downlinkUrl);

    userEvents.push({
      category: 'downlink',
      severity: 'info',
      title: `Downlink initiated to ${uplink.deviceEui}`,
      device: uplink.deviceEui,
      application: application.applicationName,
      details: {
        deviceId: uplink.deviceId,
        port: port,
        priority: priority_str,
        confirmed: confirmed || false,
        dataHex: data,
        replace: req.body.replace_downlink || false
      },
      metadata: {
        size: Buffer.from(data, 'hex').length
      }
    });

    const downlink_headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    };

    const startTime = Date.now();
    const { statusCode, body } = await request(downlinkUrl, {
      method: 'POST',
      headers: downlink_headers,
      body: JSON.stringify(downlinkPayload)
    });
    const duration = Date.now() - startTime;

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
    if (statusCode >= 200 && statusCode < 300) {
      userEvents.push({
        category: 'downlink',
        severity: 'success',
        title: `Downlink sent to ${uplink.deviceEui}`,
        device: uplink.deviceEui,
        application: application.applicationName,
        details: {
          deviceId: uplink.deviceId,
          port: port,
          priority: priority_str,
          statusCode: statusCode,
          response: parsedBody
        },
        metadata: {
          duration: duration,
          size: Buffer.from(data, 'hex').length
        }
      });
    } else {
      userEvents.push({
        category: 'error',
        severity: 'error',
        title: `Downlink failed for ${uplink.deviceEui} (HTTP ${statusCode})`,
        device: uplink.deviceEui,
        application: application.applicationName,
        details: {
          deviceId: uplink.deviceId,
          statusCode: statusCode,
          error: parsedBody,
          request: {
            port: port,
            priority: priority_str,
            dataHex: data
          }
        },
        metadata: {
          duration: duration
        }
      });
    }
    res.status(statusCode).send(parsedBody);

  } catch (err: any) {
    Log.error("Error while sending downlink:", err.message || err);

    userEvents.push({
      category: 'error',
      severity: 'error',
      title: `Downlink exception for ${uplink.deviceEui}`,
      device: uplink.deviceEui,
      details: {
        deviceId: uplink.deviceId,
        error: err.message || err,
        stack: err.stack
      }
    });

    res.status(500).send({ message: "Error while sending downlink", error: err.message || err });
  }

});

// Default uplink endpoint
app.post(`/uplink`, (req: Request, res: Response) => {

  Log.debug("Received message from device:\n", JSON.stringify(req.body, null, 2));

  // Application id is recieved in payload from TTN according to
  // TTN-Data-Format specifications:
  // https://www.thethingsindustries.com/docs/integrations/data-formats/
  const applicationId = req.body.end_device_ids.application_ids.application_id;
  const deviceEui = req.body.end_device_ids.dev_eui;

  const application: ttnApplication | undefined = settings.applications.find((app: { applicationName: string }) => app.applicationName === applicationId);

  if (typeof application === 'undefined') {
    Log.error(`Application ${applicationId} not found`);

    userEvents.push({
      category: 'error',
      severity: 'error',
      title: `Uplink rejected: unknown application ${applicationId}`,
      device: deviceEui,
      application: applicationId,
      details: {
        error: 'Application not configured in plugin settings',
        applicationId: applicationId,
        availableApplications: settings.applications.map(a => a.applicationName)
      }
    });

    res.status(404).send({ message: "Application not found" });
    return;
  }

  const device = `${application.deviceIdPrefix}${deviceEui}`;
  console.log("Device:", device);

  const ttnMessage = ttnToThinger(req.body, applicationId, device);
  console.log("TTN Message:", ttnMessage);

  const hasDecodedPayload = ttnMessage.decodedPayload &&
    Object.keys(ttnMessage.decodedPayload).length > 0;

  userEvents.push({
    category: 'uplink',
    severity: 'success',
    title: hasDecodedPayload
      ? `Uplink from ${deviceEui}`
      : `Uplink from ${deviceEui} (no decoded payload)`,
    device: deviceEui,
    application: applicationId,
    details: {
      deviceId: device,
      fPort: ttnMessage.fPort,
      fCnt: ttnMessage.fCnt,
      payload: ttnMessage.payload,
      decodedPayload: ttnMessage.decodedPayload,
      metadata: ttnMessage.metadata
    },
    metadata: {
      size: ttnMessage.payload ? Buffer.from(ttnMessage.payload, 'hex').length : 0
    }
  });

  devicesApi.accessInputResources(_user, device, 'uplink', ttnMessage).then(() => {
    Log.log("Uplink of callback handled:", device);

    // In order to make downlink requests, it is necessary to store relevant data from
    // the uplink payload in the device's properties.
    userEvents.push({
      category: 'uplink',
      severity: 'success',
      title: `Uplink forwarded to Thinger (${device})`,
      device: deviceEui,
      application: applicationId,
      details: {
        deviceId: device,
        action: 'forwarded_to_thinger',
        fPort: ttnMessage.fPort,
        fCnt: ttnMessage.fCnt
      }
    });

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
        userEvents.push({
          category: 'device',
          severity: 'info',
          title: `Downlink config updated for ${deviceEui}`,
          device: deviceEui,
          application: applicationId,
          details: {
            deviceId: device,
            hasApiKey: !!downlinkInfo.api_key,
            hasPushUrl: !!downlinkInfo.push_url,
            hasReplaceUrl: !!downlinkInfo.replace_url
          }
        });
        res.status(200).send();
      })
      .catch((err: ApiException<any>) => {
        Log.error("Error saving downlink info", err);

        userEvents.push({
          category: 'warning',
          severity: 'warning',
          title: `Failed to save downlink config for ${deviceEui}`,
          device: deviceEui,
          application: applicationId,
          details: {
            deviceId: device,
            error: err.message || 'Unknown error saving downlink info'
          }
        });
        res.status(500).send({ message: "Error saving downlink info" });
      });
  }).catch((error: ApiException<any>) => {
    Log.log("Error while handling uplink", error);

    userEvents.push({
      category: 'error',
      severity: 'error',
      title: `Failed to forward uplink from ${deviceEui}`,
      device: deviceEui,
      application: applicationId,
      details: {
        deviceId: device,
        error: error.message || 'Unknown error forwarding to Thinger',
        fPort: ttnMessage.fPort,
        fCnt: ttnMessage.fCnt
      }
    });
    res.status(500).send();
  });
});

io.on('connection', (socket) => {
  Log.info('Client connected to events stream:', socket.id);

  // Send initial data when client connects
  socket.emit('initial-events', {
    events: userEvents.getRecent({ limit: 20 }),
    config: userEvents.getConfig(),
    stats: userEvents.getStats()
  });

  // Handle client requests for filtered events
  socket.on('get-events', (filters) => {
    try {
      const events = userEvents.getRecent(filters);
      socket.emit('events-response', { events, filters });
    } catch (error: any) {
      socket.emit('error', { message: 'Error fetching events', error: error.message });
    }
  });

  // Handle clear events request
  socket.on('clear-events', () => {
    try {
      userEvents.clear();
      socket.emit('events-cleared');
    } catch (error: any) {
      socket.emit('error', { message: 'Error clearing events', error: error.message });
    }
  });

  // Handle get stats request
  socket.on('get-stats', () => {
    try {
      socket.emit('stats-response', userEvents.getStats());
    } catch (error: any) {
      socket.emit('error', { message: 'Error fetching stats', error: error.message });
    }
  });

  socket.on('disconnect', () => {
    Log.info('Client disconnected from events stream:', socket.id);
  });
});

userEvents.on('new-event', (event) => {
  io.emit('new-event', event);
});

// When events are cleared, notify all clients
userEvents.on('events-cleared', () => {
  io.emit('events-cleared');
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
  saveSettings(req.body).then((response: { value: { applications: ttnApplication[] } }) => {
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

async function readSettings() {

  pluginsApi.readProperty(_user, _plugin, "settings").then((response: { value: { applications: ttnApplication[] } }) => {

    Log.debug("Retrieved settings:\n", JSON.stringify(response, null, 2));
    settings = response.value;

    //}).catch((error: PluginsApiResponseProcessor) => {
  }).catch((error: ApiException<any>) => {

    if (error.code === 404) {
      //Log.log(error.message);
      Log.log("Settings property not found, initializing...");
    }

    // Initialize empty value settings
    saveSettings({ "applications": [] }).then((response: { value: { applications: ttnApplication[] } }) => {
      settings = response.value;
      Log.log(`Settings initialized: ${response}`);
    }).catch((error: any) => {
      // TODO: Do something, show an error message, etc.
      Log.error(`Error initializing settings: ${error.message}`);
    });

  });
}

// Read settings on startup
await readSettings();

httpServer.listen(3000, () => {
  Log.log("Server running on port 3000 with WebSocket support");
});
