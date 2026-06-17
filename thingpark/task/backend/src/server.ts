import express, { Express, Request, Response } from 'express';
import { FrontEndRouter } from './frontend/routes.js';
import process from "node:process";
import { DevicesApi, PluginsApi, ApiException, PropertyCreate } from "@thinger-io/thinger-node";
import { request } from 'undici'
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { createHash } from 'crypto';

import { thingerApiConfig } from "./lib/api.js";
import { Log } from "./lib/log.js";
import { UserEvents } from './lib/user-events.js';

const _user: string = process.env.THINGER_USER || "";
const _plugin = process.env.THINGER_PLUGIN || "";

const devicesApi = new DevicesApi(thingerApiConfig);
const pluginsApi = new PluginsApi(thingerApiConfig);

export type thingparkApplication = {
  applicationId: string;    // Routing profile name (LrnInfos) used to match incoming uplinks
  applicationName: string;  // Display name
  deviceIdPrefix: string;   // Prefix for auto-provisioned Thinger.io device IDs
  thingparkUrl: string;     // ThingPark server base URL (e.g. https://myserver.thingpark.com)
  asId: string;             // AS_ID for downlink authentication (optional)
  asKey: string;            // Pre-shared tunnel key in hex for downlink auth (optional)
  enabled: boolean;
}

let settings: { applications: thingparkApplication[] } = { applications: [] };

const userEvents = new UserEvents();

const app: Express = express();
app.enable('trust proxy');
app.use(express.json({ strict: false, limit: '8mb' }));

const httpServer = createServer(app);

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  path: '/socket.io'
});

/**
 * Convert a ThingPark uplink message into the common Thinger.io uplink format.
 *
 * ThingPark delivers uplinks as a POST with:
 *  - Query params: LrnInfos (routing profile), LrnDevEui, LrnFPort, AS_ID, Time, Token
 *  - JSON body: UplinkFrameReport (DevEUI, FCntUp, FPort, payload_hex, BatteryLevel, ACKbit, ...)
 *
 * The Thinger.io common format is documented at:
 * https://docs.thinger.io/lpwan/the-things-stack#integrating-lorawan-devices
 */
function thingparkToThinger(body: any, queryParams: any, appId: string, deviceId: string): any {
  if (!body) {
    throw new Error('Invalid message: body is undefined or null');
  }

  const devEui = body.DevEUI || (queryParams.LrnDevEui as string);
  if (!devEui) {
    throw new Error('Invalid message: missing device EUI (DevEUI in body or LrnDevEui in query)');
  }

  const fPort = body.FPort ?? (queryParams.LrnFPort ? parseInt(queryParams.LrnFPort as string, 10) : null);

  return {
    deviceEui: devEui,
    deviceId: deviceId,
    source: 'thingpark',
    appId: appId,
    fPort: fPort ?? null,
    fCnt: body.FCntUp ?? null,
    payload: body.payload_hex || null,  // ThingPark provides payload already in hex
    decodedPayload: null,               // Basic connection does not decode payloads
    metadata: {
      ack: body.ACKbit ?? null,
      battery: body.BatteryLevel ?? null,
      offline: null,
      seqNo: null
    }
  };
}

/**
 * Compute the ThingPark downlink authentication token.
 * Token = hex(SHA-256(AS_ID + DevEUI + Time + FPort + Payload + TunnelKey))
 */
function computeDownlinkToken(asId: string, devEui: string, time: string, fPort: number, payload: string, asKey: string): string {
  const message = asId + devEui + time + fPort.toString() + payload + asKey;
  return createHash('sha256').update(message).digest('hex');
}

// Downlink endpoint — receives downlink requests from Thinger.io and forwards to ThingPark
app.post("/downlink", async (req: Request, res: Response) => {

  Log.log("Received downlink message:\n", JSON.stringify(req.body, null, 2));

  const { data, port, confirmed, uplink } = req.body;

  if (!data || !uplink) {
    userEvents.push({
      category: 'downlink',
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
      category: 'downlink',
      severity: 'warning',
      title: 'Downlink rejected: invalid data',
      device: uplink.deviceEui,
      details: {
        error: 'Empty or null data provided',
        deviceId: uplink.deviceId
      }
    });
    res.status(200).send({ error: "Enter a valid downlink message" });
    return;
  }

  try {
    Log.log("Fetching downlink_info for device:", uplink.deviceId);
    const downlinkInfoResponse = await devicesApi.readProperty(_user, uplink.deviceId, "downlink_info");
    const downlinkInfo = downlinkInfoResponse.value || {};

    const thingparkUrl = downlinkInfo.thingpark_url;
    const devEui = downlinkInfo.dev_eui;

    if (!thingparkUrl || !devEui) {
      Log.error("ThingPark URL or device EUI not found in downlink_info");
      userEvents.push({
        category: 'downlink',
        severity: 'error',
        title: 'Downlink failed: missing configuration',
        device: uplink.deviceEui,
        details: {
          error: 'ThingPark URL or device EUI not found in device properties. Make sure the device has sent at least one uplink.',
          deviceId: uplink.deviceId,
          hasThingparkUrl: !!thingparkUrl,
          hasDevEui: !!devEui
        }
      });
      res.status(500).send({ message: "ThingPark URL or device EUI not found in device properties" });
      return;
    }

    const time = new Date().toISOString();

    const params = new URLSearchParams({
      DevEUI: devEui,
      FPort: port.toString(),
      Payload: data,  // Thinger.io sends hex, ThingPark expects hex — no conversion needed
      Confirmed: (confirmed ? 1 : 0).toString()
    });

    // Add token-based authentication if configured
    if (downlinkInfo.as_id) {
      params.set('AS_ID', downlinkInfo.as_id);
      params.set('Time', time);
      if (downlinkInfo.as_key) {
        const token = computeDownlinkToken(downlinkInfo.as_id, devEui, time, port, data, downlinkInfo.as_key);
        params.set('Token', token);
      }
    }

    const downlinkUrl = `${thingparkUrl}/thingpark/lrc/rest/v2/downlink?${params.toString()}`;
    Log.log("Sending downlink to ThingPark:", downlinkUrl);

    userEvents.push({
      category: 'downlink',
      severity: 'info',
      title: `Downlink initiated to ${uplink.deviceEui}`,
      device: uplink.deviceEui,
      details: {
        deviceId: uplink.deviceId,
        port: port,
        confirmed: confirmed || false,
        dataHex: data
      },
      metadata: {
        size: Buffer.from(data, 'hex').length
      }
    });

    const startTime = Date.now();
    const { statusCode, body: responseBody } = await request(downlinkUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    const duration = Date.now() - startTime;

    let responseText = '';
    for await (const chunk of responseBody) {
      responseText += chunk.toString();
    }
    let parsedBody: any;
    try {
      parsedBody = JSON.parse(responseText);
    } catch {
      parsedBody = responseText;
    }

    Log.debug(`Downlink response:`, statusCode, parsedBody);

    if (statusCode >= 200 && statusCode < 300) {
      userEvents.push({
        category: 'downlink',
        severity: 'success',
        title: `Downlink sent to ${uplink.deviceEui}`,
        device: uplink.deviceEui,
        details: {
          deviceId: uplink.deviceId,
          port: port,
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
        category: 'downlink',
        severity: 'error',
        title: `Downlink failed for ${uplink.deviceEui} (HTTP ${statusCode})`,
        device: uplink.deviceEui,
        details: {
          deviceId: uplink.deviceId,
          statusCode: statusCode,
          error: parsedBody,
          request: { port: port, dataHex: data }
        },
        metadata: { duration: duration }
      });
    }

    res.status(statusCode).send(parsedBody);

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

// Uplink endpoint — receives uplink callbacks from ThingPark and forwards to Thinger.io
app.post('/uplink', (req: Request, res: Response) => {

  Log.debug("Received uplink from ThingPark:\n", JSON.stringify(req.body, null, 2));
  Log.debug("Query params:", JSON.stringify(req.query, null, 2));

  let applicationId: string;
  let deviceEui: string;
  let application: thingparkApplication | undefined;

  try {
    // ThingPark identifies the routing profile via LrnInfos query parameter
    applicationId = req.query.LrnInfos as string;
    deviceEui = (req.query.LrnDevEui as string) || req.body.DevEUI;

    if (!applicationId) {
      throw new Error('Missing LrnInfos query parameter (routing profile name)');
    }
    if (!deviceEui) {
      throw new Error('Missing device EUI — expected LrnDevEui query param or DevEUI in body');
    }

    application = settings.applications.find(a => a.applicationId === applicationId);
  } catch (error: any) {
    Log.error("Error parsing uplink message:", error.message || error);
    userEvents.push({
      category: 'uplink',
      severity: 'error',
      title: 'Uplink rejected: invalid message format',
      details: {
        error: error.message || 'Unknown error parsing uplink',
        receivedBody: req.body,
        queryParams: req.query
      }
    });
    res.status(400).send({ message: "Invalid message format" });
    return;
  }

  if (!application) {
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
    res.status(404).send({ message: "Application not found" });
    return;
  }

  if (!application.enabled) {
    Log.log(`Application ${applicationId} is disabled, ignoring uplink`);
    userEvents.push({
      category: 'uplink',
      severity: 'warning',
      title: `Uplink ignored: application ${applicationId} is disabled`,
      device: deviceEui,
      application: applicationId,
      details: { deviceEui, applicationId }
    });
    res.status(200).send({ message: "Application is disabled, uplink ignored" });
    return;
  }

  const device = `${application.deviceIdPrefix}${deviceEui}`;
  const thingerMessage = thingparkToThinger(req.body, req.query, applicationId, device);

  Log.log("Forwarding uplink to Thinger device:", device);

  const hasPayload = !!thingerMessage.payload;
  userEvents.push({
    category: 'uplink',
    severity: 'info',
    title: hasPayload
      ? `Uplink from ${deviceEui}`
      : `Uplink from ${deviceEui} (no payload)`,
    device: deviceEui,
    application: applicationId,
    details: {
      deviceId: device,
      fPort: thingerMessage.fPort,
      fCnt: thingerMessage.fCnt,
      payload: thingerMessage.payload,
      metadata: thingerMessage.metadata
    },
    metadata: {
      size: thingerMessage.payload ? Buffer.from(thingerMessage.payload, 'hex').length : 0
    }
  });

  devicesApi.accessInputResources(_user, device, 'uplink', thingerMessage).then(() => {
    Log.log("Uplink forwarded to Thinger:", device);

    userEvents.push({
      category: 'uplink',
      severity: 'success',
      title: `Uplink forwarded to Thinger (${device})`,
      device: deviceEui,
      application: applicationId,
      details: {
        deviceId: device,
        action: 'forwarded_to_thinger',
        fPort: thingerMessage.fPort,
        fCnt: thingerMessage.fCnt
      }
    });

    // Store downlink configuration derived from the application settings.
    // This is read back when a downlink needs to be sent to this device.
    const downlinkInfo = {
      dev_eui: deviceEui,
      thingpark_url: application!.thingparkUrl || '',
      as_id: application!.asId || '',
      as_key: application!.asKey || ''
    };

    const prop = new PropertyCreate();
    prop.property = "downlink_info";
    prop.value = downlinkInfo;

    devicesApi.createProperty(_user, device, prop)
      .then(() => {
        Log.info("Downlink info saved for device", device);

        if (!downlinkInfo.thingpark_url) {
          userEvents.push({
            category: 'device',
            severity: 'warning',
            title: `Incomplete downlink config for ${deviceEui}`,
            device: deviceEui,
            application: applicationId,
            details: {
              deviceId: device,
              description: 'ThingPark URL is not configured in application settings. Downlink functionality is disabled.'
            }
          });
        } else {
          userEvents.push({
            category: 'device',
            severity: 'success',
            title: `Downlink config updated for ${deviceEui}`,
            device: deviceEui,
            application: applicationId,
            details: {
              deviceId: device,
              hasThingparkUrl: !!downlinkInfo.thingpark_url,
              hasAsId: !!downlinkInfo.as_id
            }
          });
        }
        res.status(200).send();
      })
      .catch((err: ApiException<any>) => {
        Log.error("Error saving downlink info", err);
        userEvents.push({
          category: 'uplink',
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
        httpErrorCode: error.code || 'N/A',
        error: error.message,
        description: 'Could not forward uplink to Thinger.io. Check the device ID prefix matches an existing product.',
        fPort: thingerMessage.fPort,
        fCnt: thingerMessage.fCnt
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
        uplinkReceived: req.body
      }
    });
    res.status(500).send();
  });
});

io.on('connection', (socket) => {
  Log.info('Client connected to events stream:', socket.id);

  socket.emit('initial-events', {
    events: userEvents.getRecent({ limit: 20 }),
    config: userEvents.getConfig(),
    stats: userEvents.getStats()
  });

  socket.on('get-events', (filters) => {
    try {
      const events = userEvents.getRecent(filters);
      socket.emit('events-response', { events, filters });
    } catch (error: any) {
      socket.emit('error', { message: 'Error fetching events', error: error.message });
    }
  });

  socket.on('clear-events', () => {
    try {
      userEvents.clear();
      socket.emit('events-cleared');
    } catch (error: any) {
      socket.emit('error', { message: 'Error clearing events', error: error.message });
    }
  });

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

userEvents.on('events-cleared', () => {
  io.emit('events-cleared');
});

app.get("/env", (req: Request, res: Response) => {
  const thingerEnv = Object.keys(process.env)
    .filter((key) => key.startsWith("THINGER"))
    .reduce((obj: { [key: string]: string }, key) => {
      obj[key] = process.env[key] as string;
      return obj;
    }, {});
  res.json(thingerEnv);
});

app.get("/settings", async (req: Request, res: Response) => {
  res.json(settings);
});

app.post("/settings", async (req: Request, res: Response) => {
  Log.log("Post settings", req.body);
  saveSettings(req.body).then((response: { value: { applications: thingparkApplication[] } }) => {
    settings = response.value;
    res.status(200).send(settings);
  }).catch((error: any) => {
    res.status(400).send(error);
  });
});

app.use(FrontEndRouter);

function saveSettings(value: object = {}) {
  const prop = new PropertyCreate();
  prop.property = "settings";
  prop.value = value;
  return pluginsApi.createProperty(_user, _plugin, prop);
}

async function readSettings() {
  pluginsApi.readProperty(_user, _plugin, "settings").then((response: { value: { applications: thingparkApplication[] } }) => {
    Log.debug("Retrieved settings:\n", JSON.stringify(response, null, 2));
    settings = response.value;
  }).catch((error: ApiException<any>) => {
    if (error.code === 404) {
      Log.log("Settings property not found, initializing...");
    }
    saveSettings({ "applications": [] }).then((response: { value: { applications: thingparkApplication[] } }) => {
      settings = response.value;
      Log.log(`Settings initialized: ${response}`);
    }).catch((error: any) => {
      Log.error(`Error initializing settings: ${error.message}`);
    });
  });
}

await readSettings();

httpServer.listen(3000, () => {
  Log.log("Server running on port 3000 with WebSocket support");
});
