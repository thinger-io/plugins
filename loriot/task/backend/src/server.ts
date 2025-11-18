import express, { Express, Request, Response } from 'express';
import { FrontEndRouter } from './frontend/routes.js';
import process from "node:process";
import { DevicesApi, PluginsApi, ApiException, PropertyCreate } from "@thinger-io/thinger-node";
import { request } from 'undici'
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';


import { thingerApiConfig } from "./lib/api.js";
import { DownlinkMessage, parseEncodedToken } from "./lib/loriot.js";
import { Log } from "./lib/log.js";
import { UserEvents } from './lib/user-events.js';

const _user: string = process.env.THINGER_USER || "";
const _plugin = process.env.THINGER_PLUGIN || "";

// Initialize Products and Plugins API
const devicesApi = new DevicesApi(thingerApiConfig);
const pluginsApi = new PluginsApi(thingerApiConfig);

export type Application = {
  applicationId: string;
  deviceIdPrefix: string;
  accessToken: string;
  enabled: boolean;
}

let settings: {applications: Application[]} = { applications: [] };

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

// Serve the API
app.post(`/downlink`, async (req: Request, res: Response) => {

  Log.log("Received downlink message:\n", JSON.stringify(req.body, null, 2));

  // Check if the downlink message is valid
  if ( req.body.data === '' || req.body.data === null || req.body.data === 'null' ) {
    res.status(200).send(
      {
        cmd: "",
        EUI: "",
        data: "",
        port: 0,
        priority: 0,
        success: "",
        error: "Enter a valid downlink message"
      }
    );
    return;
  }

  // find data by token
  const application: Application | undefined = settings.applications.find((app: {applicationId: string}) => app.applicationId === req.body.uplink.appId);
  if ( typeof application === 'undefined' ) {
    Log.error(`Application ${req.body.uplink.appId} not found`);
    res.status(404).send({message: "Application not found"});
    return;
  }
  if ( typeof application.accessToken === 'undefined' ) {
    Log.error(`Access token not found for application ${req.body.uplink.appId}`);
    res.status(400).send({message: "Application access token not found"});
    return;
  }

  // Build downlink message to send to the device
  const msg: DownlinkMessage = {
    cmd: "tx",
    EUI: req.body.uplink.deviceEui,
    port: req.body.port,
    confirmed: req.body.confirmed || false,
    data: req.body.data,
    appid: req.body.uplink.appId,
  }

  const allDefined = Object.values(msg).every(value => value !== undefined);
  if ( !allDefined ) {
    Log.error("Downlink message is not well defined:\n", JSON.stringify(msg, null, 2));
    res.status(400).send({message: "Downlink message is not well defined"});
    return;
  }

  const msg_headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${application.accessToken}`
  }

  const token = parseEncodedToken(application.accessToken, null);
  const server = token.serverId;
  Log.log("Sending downlink message:\n", JSON.stringify(msg, null, 2) );

  const {
    statusCode,
    //headers,
    body
  } = await request(`https://${server}/1/rest`, { method: 'POST', headers: msg_headers , body: JSON.stringify(msg) })

  // Collect stream chunks into a string
  let responseBody = '';
  for await (const chunk of body) {
    responseBody += chunk.toString(); // Assuming chunks are Buffer or string
  }

  // Now parse if it's JSON
  const parsedBody = JSON.parse(responseBody);
  console.log(parsedBody);

  Log.debug(`Downlink response:\n`, statusCode, body);
  res.status(statusCode).send(parsedBody);

});

/**
 * Convert a LORIOT uplink message into a common Thinger.io uplink format.
 * This "common" format can be found in the Thinger.io LoRaWAN plugins documentation.
 * 
 * @param {Object} msg - LORIOT uplink message.
 * @returns {Object} - Thinger.io uplink message.
 */
function loriotToThinger(msg: any, appId: string, deviceId: string): any {
  if (!msg) throw new Error('Invalid message: msg is undefined or null');
  if (msg.cmd !== 'rx') return null; // Only process 'rx' commands

  // Pick payload: prefer 'data' (decrypted) over 'encdata'
  const payloadHex = (msg.data || msg.encdata || '').toUpperCase() || null;

  return {
    deviceEui: msg.EUI,
    deviceId: deviceId,
    source: 'loriot',
    appId: appId || '',
    fPort: msg.port ?? null,
    fCnt: msg.fcnt ?? null,
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

  Log.info("[/uplink] Received message from device:\n", JSON.stringify(req.body, null, 2));

  // Don't accept gateway messages
  if (req.body.cmd != "rx") { res.status(200).send(); return; }
  else {

    const device = req.body.EUI;
    devicesApi.accessInputResources(_user, device, 'uplink', req.body).then(() => {
      Log.log("Uplink of callback handled:", device);
      res.status(200).send();
    }).catch((error: ApiException<any>) => {
      Log.log("Error while handling uplink", error);
      res.status(500).send();
    });
  }
});

app.post(`/:applicationId/uplink`, (req: Request, res: Response) => {

  Log.log(`[/applicationId/uplink] Received message for application ${req.params.applicationId} from device`, req.body?.EUI);

  // Don't accept gateway messages
  if (req.body.cmd != "rx") {res.status(200).send(); return; }
  Log.log(JSON.stringify(req.body, null, 2));

  const applicationId = req.params.applicationId;

  // find data by id
  const application: Application | undefined = settings.applications.find((app: {applicationId: string}) => app.applicationId === applicationId);
  const deviceEui = req.body.EUI;

  if ( typeof application !== 'undefined' ) {
    const device = `${ application.deviceIdPrefix }${deviceEui}`;

    const thingerUplink = loriotToThinger(req.body, applicationId, device);

    devicesApi.accessInputResources(_user, device, 'uplink', thingerUplink).then((response: object) => {
      Log.log(`handling uplink callback for device ${device} and 'uplink ${response}'`);
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
          fPort: thingerUplink.fPort,
          fCnt: thingerUplink.fCnt
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

  } else {
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
        availableApplications: settings.applications.map(a => a.applicationId)
      }
    });
    res.status(404).send();
  }
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
  saveSettings(req.body).then((response: { value: {applications: Application[]} }) => {
    settings = response.value;
    res.status(200).send(settings);
  }).catch((error: any) => {
    res.status(400).send(error);
  });

});

// Serve the Angular app after the API
app.use( FrontEndRouter );

// Settings functions
function saveSettings(value: object = {}){

  const prop = new PropertyCreate();
  prop.property = "settings";
  prop.value = value;

  return pluginsApi.createProperty(_user, _plugin, prop);
}

async function readSettings(){

  pluginsApi.readProperty(_user, _plugin, "settings").then((response: { value: {applications: Application[]} }) => {

    Log.debug("Retrieved settings:\n", JSON.stringify(response, null, 2));
    settings = response.value;

  //}).catch((error: PluginsApiResponseProcessor) => {
  }).catch((error: ApiException<any>) => {

    if ( error.code === 404 ){
      Log.log("Settings property not found, initializing...");
    }

    // Initialize empty value settings
    saveSettings({"applications": []}).then((response: { value: {applications: Application[]} }) => {
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

