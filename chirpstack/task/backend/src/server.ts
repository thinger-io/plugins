import express, { Express, Request, Response } from 'express';
import { FrontEndRouter } from './frontend/routes.js';
import process from "node:process";
import { DevicesApi, PluginsApi, ApiException, PropertyCreate } from "@thinger-io/thinger-node";
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

// Initialize chirpstack gRPC api
import * as grpc from '@grpc/grpc-js';

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const device_grpc = require('@chirpstack/chirpstack-api/api/device_grpc_pb');
const device_pb = require('@chirpstack/chirpstack-api/api/device_pb');

export type chirpstackApplication = {
  applicationId: string;
  applicationName: string;
  deviceIdPrefix: string;
  accessToken: string;
  serverUrl: string;
  enabled: boolean;
}

let settings: { applications: chirpstackApplication[] } = { applications: [] };

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

/*
Ensure the server URL has a port, if not, add the default port.
*/
function ensurePortInServer(server: string, defaultPort: number): string {
  if (server.includes(':')) {
    return server;
  }
  return `${server}:${defaultPort}`;
}

// Serve the API
/*
Downlink endpoint expects a JSON body with the following fields:
- data: payload to send
- port: port to use for the downlink message
- priority: priority of the downlink message
- confirmed: whether the downlink message is confirmed or not
- uplink: last uplink message to use for the downlink (stored in the device properties)

This JSON body is used by all LNS plugins supported by Thinger.io, including ChirpStack, TTN and LORIOT.
*/
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
app.post("/downlink", async (req: Request, res: Response) => {

  Log.log("Received downlink message:\n", JSON.stringify(req.body, null, 2));

  const { data, port, priority, confirmed, uplink } = req.body;

  if (!data || !uplink) {
    Log.error("Invalid downlink message: missing required fields");
    userEvents.push({
      category: 'downlink',
      severity: 'error',
      title: `Uplink rejected: invalid message format`,
      details: {
        error: 'Missing required fields in Downlink Body: data or uplink',
        downlinkRecieved: req.body
      }
    });
    res.status(400).send({ message: "Missing required fields: data or uplink" });
    return;
  }

  // Obtain the device ID from the uplink message
  const deviceId = uplink.deviceEui;

  if (data === '' || data === null || data === 'null') {
    Log.error("Invalid downlink message: data is empty");
    userEvents.push({
      category: 'downlink',
      severity: 'error',
      title: `Downlink rejected: empty data`,
      device: deviceId,
      application: uplink.appId,
      details: {
        error: 'Downlink data is empty',
        deviceId: uplink.deviceId,
        downlinkRecieved: req.body
      }
    });
    res.status(400).send({
      error: "Enter a valid downlink message"
    });
    return;
  }

  // find data
  const application = settings.applications.find(app => app.applicationName === uplink.appId);

  if (typeof application === 'undefined') {
    Log.error(`Application not found`);
    userEvents.push({
      category: 'downlink',
      severity: 'warning',
      title: `Uplink rejected: unknown application ${uplink.appId}`,
      device: deviceId,
      application: uplink.appId,
      details: {
        error: 'Application not configured in plugin settings',
        applicationId: uplink.appId,
        availableApplications: settings.applications.map(a => a.applicationName)
      }
    });
    res.status(404).send({ message: "Application not found" });
    return;
  }

  console.log("All data found.");

  try {
    Log.log("Fetching data for downlink:", deviceId);
    
    const server = application.serverUrl;
    const apiKey = application.accessToken;

    Log.log("Using server:", server);
    Log.log("Using API key:", apiKey);

    if (!server || !apiKey) {
      Log.error("Downlink URL or API key not found in application settings.");
      userEvents.push({
        category: 'downlink',
        severity: 'error',
        title: 'Downlink failed: missing configuration',
        device: uplink.deviceEui,
        details: {
          error: 'Downlink URL or API key not found',
          deviceId: uplink.deviceId,
          serverUrl: !!server,
          hasApiKey: !!apiKey
        }
      });
      res.status(500).send({ message: "Downlink URL or API key not found in application settings" });
      return;
    }

    // Create the client for the DeviceService.
    const deviceService = new device_grpc.DeviceServiceClient(
      ensurePortInServer(server, 8080),
      grpc.credentials.createInsecure(),
    );

    Log.log("Sending downlink message:", {
      deviceId: deviceId,
      data: data,
      port: port,
      priority: priority,
      confirmed: confirmed
    });

    userEvents.push({
      category: 'downlink',
      severity: 'info',
      title: `Downlink initiated to ${uplink.deviceEui}`,
      device: uplink.deviceEui,
      application: application.applicationName,
      details: {
        deviceId: uplink.deviceId,
        port: port,
        priority: priority,
        confirmed: confirmed,
        dataHex: data
      },
      metadata: {
        size: Buffer.from(data, 'hex').length
      }
    });

    // Create the Metadata object.
    const metadata = new grpc.Metadata();
    metadata.set("authorization", "Bearer " + apiKey);

    const item = new device_pb.DeviceQueueItem(); 
    item.setDevEui(deviceId);
    item.setFPort(port || 1); // Default to port 1 if not provided
    item.setConfirmed(confirmed || false); // Default to false if not provided
    item.setData(Buffer.from(data, 'hex'));

    const startTime = Date.now();
    const enqueueReq = new device_pb.EnqueueDeviceQueueItemRequest();
    enqueueReq.setQueueItem(item);
    const resp = await new Promise((resolve, reject) => {
      deviceService.enqueue(enqueueReq, metadata, (err: never, r: never) => {
        if (err) return reject(err);
        resolve(r);
      });
    });
    const duration = Date.now() - startTime;

    userEvents.push({
      category: 'downlink',
      severity: 'success',
      title: `Downlink sent to ${uplink.deviceEui}`,
      device: uplink.deviceEui,
      application: application.applicationName,
      details: {
        deviceId: uplink.deviceId,
        port: port,
        priority: priority,
        confirmed: confirmed,
        response: resp
      },
      metadata: {
        duration: duration,
        size: Buffer.from(data, 'hex').length
      }
    });

    Log.log("Downlink message sent successfully for device:", deviceId);
    return res.status(200).json({ message: "Downlink message sent successfully", deviceId });


  } catch (err: any) {
    Log.error("Error while sending downlink:", err.message || err);

    userEvents.push({
      category: 'downlink',
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

/**
 * Convert a Chirpstack uplink message into a common Thinger.io uplink format.
 * This "common" format can be found in the Thinger.io LoRaWAN plugins documentation.
 *
 * @param {Object} msg - Chirpstack uplink message.
 * @returns {Object} - Thinger.io uplink message.
 */
function chirpstackToThinger(msg: any, appId: string, deviceId: string): any {
  if (!msg) throw new Error('Invalid message: msg is undefined or null');

  // Chirpstack "data" field use to come in base64 format yet StringHEX is expected
  const payloadHex = Buffer.from(msg.data, 'base64').toString('hex') || null;

  return {
    deviceEui: msg.deviceInfo.devEui.toUpperCase(),
    deviceId: deviceId,
    source: 'chirpstack',
    appId: appId || '',
    fPort: msg.fPort ?? null,
    fCnt: msg.fCnt ?? null,
    payload: payloadHex,
    decodedPayload: msg.decoded || null,
    metadata: {
      ack: msg.ack ?? null,
      battery: msg.bat ?? null,
      offline: msg.offline ?? null,
      seqNo: msg.seqno ?? null
    }
  };
} 

// Default uplink endpoint
app.post(`/uplink`, (req: Request, res: Response) => {

  Log.debug("Received message from device:\n", JSON.stringify(req.body, null, 2));
  //Log.debug("Headers:", req.headers);

  let application: chirpstackApplication | undefined;
  let applicationId: string;
  let deviceEui: string;

  try {
    applicationId = req.body.deviceInfo.applicationName;
    application = settings.applications.find((app: { applicationName: string }) => app.applicationName === applicationId);
    deviceEui = req.body.deviceInfo.devEui.toUpperCase();
  } catch (error: any) {
    Log.error("Error parsing uplink message:", error.message || error);
    userEvents.push({
      category: 'uplink',
      severity: 'error',
      title: `Uplink rejected: invalid message format`,
      details: {
        error: error.message || 'Unknown error parsing uplink message',
        uplinkRecieved: req.body
      }
    });
    res.status(400).send({ message: "Invalid message format" });
    return;
  }


  if (typeof application === 'undefined') {
    Log.error(`Application ${applicationId} not found`);

    userEvents.push({
      category: 'uplink',
      severity: 'warning',
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

  Log.log("HTTP PUSH 'uplink' for user ", _user, "device", device, "application", applicationId);

  const chirpstackMessage = chirpstackToThinger(req.body, applicationId, device);

  console.log("Converted Chirpstack message to Thinger.io format:\n", JSON.stringify(chirpstackMessage, null, 2));

  devicesApi.accessInputResources(_user, device, 'uplink', chirpstackMessage).then(() => {
    Log.log("Uplink of callback handled:", device);

    userEvents.push({
      category: 'uplink',
      severity: 'success',
      title: `Uplink forwarded to Thinger (${device})`,
      device: deviceEui,
      application: applicationId,
      details: {
        deviceId: device,
        action: 'forwarded_to_thinger',
        fPort: chirpstackMessage.fPort,
        fCnt: chirpstackMessage.fCnt
      }
    });
    res.status(200).send();
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
        httpErrorCode: error.code || 'N/A',
        error: error.message,
        description: 'This plugin couldn\'t forward the uplink message to Thinger.io platform. Check you product id prefix',
        fPort: chirpstackMessage.fPort,
        fCnt: chirpstackMessage.fCnt
      }
    });
    res.status(500).send();
  }).catch((error: any) => {
    Log.log("Unexpected error while handling uplink", error);
    userEvents.push({
      category: 'error',
      severity: 'error',
      title: `Unexpected error forwarding uplink from ${deviceEui}`,
      device: deviceEui,
      application: applicationId,
      details: {
        deviceId: device,
        httpErrorCode: error.code || 'N/A',
        error: error.message || 'Unknown unexpected error',
        uplinkRecieved: req.body
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

async function readSettings() {

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
await readSettings();

httpServer.listen(3000, () => {
  Log.log("Server running on port 3000 with WebSocket support");
});

