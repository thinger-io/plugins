import express, { Express, Request, Response } from 'express';
import { FrontEndRouter } from './frontend/routes.js';
import process from "node:process";
import { PluginsApi, ApiException, PropertyCreate } from "@thinger-io/thinger-node";
import { thingerApiConfig } from "./lib/api.js";
import { Log } from "./lib/log.js";
import { EasyM2MClient, EasyM2MApiError, UpdateSimCardPayload, AlarmPayload } from "./lib/easym2m.js";

const _user: string = process.env.THINGER_USER || "";
const _plugin = process.env.THINGER_PLUGIN || "";

const pluginsApi = new PluginsApi(thingerApiConfig);

export type EasyM2MSettings = {
  apiClientId: string;
  apiPassword: string;
  apiKey: string;
}

let settings: EasyM2MSettings = { apiClientId: '', apiPassword: '', apiKey: '' };

const app: Express = express();
app.enable('trust proxy');
app.use(express.json({ strict: false, limit: '8mb' }));

/** Returns THINGER_* environment variables to the frontend. */
app.get("/env", (req: Request, res: Response) => {
  const thingerEnv = Object.keys(process.env)
    .filter((key) => key.startsWith("THINGER"))
    .reduce((obj: { [key: string]: string }, key) => {
      obj[key] = process.env[key] as string;
      return obj;
    }, {});
  res.json(thingerEnv);
});

/** Returns the current plugin settings (EasyM2M credentials). */
app.get("/settings", async (req: Request, res: Response) => {
  res.json(settings);
});

/** Persists the plugin settings to Thinger.io and updates the in-memory state. */
app.post("/settings", async (req: Request, res: Response) => {
  Log.log("Saving settings");
  saveSettings(req.body)
    .then((response: any) => {
      settings = response.value;
      Log.info("Settings saved successfully");
      res.status(200).send(settings);
    })
    .catch((error: ApiException<any>) => {
      const isAuthError = error.code === 401 || error.code === 403;
      Log.error("Error saving settings to Thinger.io:", error.code, error.message);
      res.status(502).json({
        message: "Failed to save settings to Thinger.io platform",
        error: error.message || String(error),
        cause: isAuthError
          ? "The plugin token may have expired or have insufficient permissions."
          : "Cannot reach the Thinger.io platform. Check connectivity and token configuration.",
        code: isAuthError ? "THINGER_AUTH_ERROR" : "THINGER_SAVE_ERROR"
      });
    });
});

/** Proxies the SIM card list request to the EasyM2M API. */
app.get("/simcards", async (req: Request, res: Response) => {
  const size = Math.min(parseInt(req.query.size as string) || 20, 100);
  const index = parseInt(req.query.index as string) || 1;
  const status = req.query.status as string | undefined;

  Log.log(`Fetching SIM cards — size: ${size}, index: ${index}, status: ${status || 'ALL'}`);

  if (!settings.apiClientId || !settings.apiPassword || !settings.apiKey) {
    Log.warn("SIM card list requested but credentials are not configured");
    res.status(400).json({
      message: "EasyM2M credentials are not configured",
      cause: "Go to the Settings tab and enter your API Client ID, Password, and API Key.",
      code: "CREDENTIALS_MISSING"
    });
    return;
  }

  try {
    const result = await EasyM2MClient.listSimCards(settings, size, index, status);
    Log.info(`SIM cards fetched — ${result?.info?.resultSetSize ?? '?'} total, page ${index}`);
    res.json(result);
  } catch (error: any) {
    const apiError = error instanceof EasyM2MApiError ? error : null;
    Log.error("Error fetching SIM cards:", error.message, "| Code:", apiError?.code ?? 'UNKNOWN');
    res.status(502).json({
      message: "Error communicating with EasyM2M API",
      error: error.message,
      cause: apiError?.cause ?? "Unexpected error. Check the backend logs for details.",
      code: apiError?.code ?? "UNKNOWN_ERROR"
    });
  }
});

/** Proxies a single SIM card detail request to the EasyM2M API. */
app.get("/simcard/:iccid", async (req: Request, res: Response) => {
  const { iccid } = req.params;

  Log.log(`Fetching SIM card details — ICCID: ${iccid}`);

  if (!settings.apiClientId || !settings.apiPassword || !settings.apiKey) {
    Log.warn("SIM card detail requested but credentials are not configured");
    res.status(400).json({
      message: "EasyM2M credentials are not configured",
      cause: "Go to the Settings tab and enter your API Client ID, Password, and API Key.",
      code: "CREDENTIALS_MISSING"
    });
    return;
  }

  try {
    const result = await EasyM2MClient.getSimCard(settings, iccid);
    Log.info(`SIM card details fetched for ICCID: ${iccid}`);
    res.json(result);
  } catch (error: any) {
    const apiError = error instanceof EasyM2MApiError ? error : null;
    Log.error(`Error fetching SIM card ${iccid}:`, error.message, "| Code:", apiError?.code ?? 'UNKNOWN');
    res.status(502).json({
      message: `Error fetching SIM card ${iccid}`,
      error: error.message,
      cause: apiError?.cause ?? "Unexpected error. Check the backend logs for details.",
      code: apiError?.code ?? "UNKNOWN_ERROR"
    });
  }
});

/** Updates a SIM card's editable properties (alias, status, alarm, thresholds). */
app.put("/simcard/:iccid", async (req: Request, res: Response) => {
  const { iccid } = req.params;
  const payload: UpdateSimCardPayload = req.body;

  Log.log(`Updating SIM card — ICCID: ${iccid}, payload: ${JSON.stringify(payload)}`);

  if (!settings.apiClientId || !settings.apiPassword || !settings.apiKey) {
    res.status(400).json({ message: "EasyM2M credentials are not configured", cause: "Go to the Settings tab and enter your API credentials.", code: "CREDENTIALS_MISSING" });
    return;
  }

  try {
    await EasyM2MClient.updateSimCard(settings, iccid, payload);
    Log.info(`SIM card updated — ICCID: ${iccid}`);
    res.status(200).json({ message: "SIM card updated successfully" });
  } catch (error: any) {
    const apiError = error instanceof EasyM2MApiError ? error : null;
    Log.error(`Error updating SIM card ${iccid}:`, error.message, "| Code:", apiError?.code ?? 'UNKNOWN');
    res.status(502).json({ message: `Error updating SIM card ${iccid}`, error: error.message, cause: apiError?.cause ?? "Unexpected error.", code: apiError?.code ?? "UNKNOWN_ERROR" });
  }
});

/** Returns a paginated list of alarm profiles for this account. */
app.get("/alarms", async (req: Request, res: Response) => {
  const size = Math.min(parseInt(req.query.size as string) || 100, 100);
  const index = parseInt(req.query.index as string) || 1;

  if (!settings.apiClientId || !settings.apiPassword || !settings.apiKey) {
    res.status(400).json({ message: "EasyM2M credentials are not configured", cause: "Go to the Settings tab and enter your API credentials.", code: "CREDENTIALS_MISSING" });
    return;
  }

  try {
    const result = await EasyM2MClient.listAlarms(settings, size, index);
    res.json(result);
  } catch (error: any) {
    const apiError = error instanceof EasyM2MApiError ? error : null;
    Log.error("Error fetching alarms:", error.message, "| Code:", apiError?.code ?? 'UNKNOWN');
    res.status(502).json({ message: "Error fetching alarms", error: error.message, cause: apiError?.cause ?? "Unexpected error.", code: apiError?.code ?? "UNKNOWN_ERROR" });
  }
});

/** Returns the detail of a single alarm by ID. */
app.get("/alarm/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!settings.apiClientId || !settings.apiPassword || !settings.apiKey) {
    res.status(400).json({ message: "EasyM2M credentials are not configured", cause: "Go to the Settings tab and enter your API credentials.", code: "CREDENTIALS_MISSING" });
    return;
  }

  try {
    const result = await EasyM2MClient.getAlarm(settings, id);
    res.json(result);
  } catch (error: any) {
    const apiError = error instanceof EasyM2MApiError ? error : null;
    res.status(502).json({ message: `Error fetching alarm ${id}`, error: error.message, cause: apiError?.cause ?? "Unexpected error.", code: apiError?.code ?? "UNKNOWN_ERROR" });
  }
});

/** Creates a new alarm profile. */
app.post("/alarm", async (req: Request, res: Response) => {
  const payload: AlarmPayload = req.body;

  if (!settings.apiClientId || !settings.apiPassword || !settings.apiKey) {
    res.status(400).json({ message: "EasyM2M credentials are not configured", cause: "Go to the Settings tab and enter your API credentials.", code: "CREDENTIALS_MISSING" });
    return;
  }

  try {
    const result = await EasyM2MClient.createAlarm(settings, payload);
    Log.info("Alarm created:", JSON.stringify(result));
    res.status(201).json(result);
  } catch (error: any) {
    const apiError = error instanceof EasyM2MApiError ? error : null;
    Log.error("Error creating alarm:", error.message);
    res.status(502).json({ message: "Error creating alarm", error: error.message, cause: apiError?.cause ?? "Unexpected error.", code: apiError?.code ?? "UNKNOWN_ERROR" });
  }
});

/** Updates an existing alarm profile. */
app.put("/alarm/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  if (!settings.apiClientId || !settings.apiPassword || !settings.apiKey) {
    res.status(400).json({ message: "EasyM2M credentials are not configured", cause: "Go to the Settings tab and enter your API credentials.", code: "CREDENTIALS_MISSING" });
    return;
  }

  try {
    await EasyM2MClient.updateAlarm(settings, id, payload);
    res.status(200).json({ message: "Alarm updated successfully" });
  } catch (error: any) {
    const apiError = error instanceof EasyM2MApiError ? error : null;
    res.status(502).json({ message: `Error updating alarm ${id}`, error: error.message, cause: apiError?.cause ?? "Unexpected error.", code: apiError?.code ?? "UNKNOWN_ERROR" });
  }
});

/** Deletes an alarm profile. */
app.delete("/alarm/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!settings.apiClientId || !settings.apiPassword || !settings.apiKey) {
    res.status(400).json({ message: "EasyM2M credentials are not configured", cause: "Go to the Settings tab and enter your API credentials.", code: "CREDENTIALS_MISSING" });
    return;
  }

  try {
    await EasyM2MClient.deleteAlarm(settings, id);
    Log.info(`Alarm deleted — ID: ${id}`);
    res.status(200).json({ message: "Alarm deleted successfully" });
  } catch (error: any) {
    const apiError = error instanceof EasyM2MApiError ? error : null;
    res.status(502).json({ message: `Error deleting alarm ${id}`, error: error.message, cause: apiError?.cause ?? "Unexpected error.", code: apiError?.code ?? "UNKNOWN_ERROR" });
  }
});

/** Returns paginated consumption records for a SIM card. */
app.get("/simcard/:iccid/consumption", async (req: Request, res: Response) => {
  const { iccid } = req.params;
  const year = req.query.year as string;
  const month = req.query.month as string;
  const service = (req.query.service as string) || 'data';
  const size = Math.min(parseInt(req.query.size as string) || 20, 100);
  const index = parseInt(req.query.index as string) || 1;

  if (!year || !month) {
    res.status(400).json({ message: "year and month query parameters are required", code: "MISSING_PARAMS" });
    return;
  }

  if (!settings.apiClientId || !settings.apiPassword || !settings.apiKey) {
    res.status(400).json({ message: "EasyM2M credentials are not configured", cause: "Go to the Settings tab and enter your API credentials.", code: "CREDENTIALS_MISSING" });
    return;
  }

  try {
    const result = await EasyM2MClient.getSimConsumption(settings, year, month, iccid, service, size, index);
    res.json(result);
  } catch (error: any) {
    const apiError = error instanceof EasyM2MApiError ? error : null;
    Log.error(`Error fetching consumption for ${iccid}:`, error.message);
    res.status(502).json({ message: `Error fetching consumption for ${iccid}`, error: error.message, cause: apiError?.cause ?? "Unexpected error.", code: apiError?.code ?? "UNKNOWN_ERROR" });
  }
});

/** Returns the current credit balance for a SIM card. */
app.get("/simcard/:iccid/balance", async (req: Request, res: Response) => {
  const { iccid } = req.params;

  if (!settings.apiClientId || !settings.apiPassword || !settings.apiKey) {
    res.status(400).json({ message: "EasyM2M credentials are not configured", cause: "Go to the Settings tab and enter your API credentials.", code: "CREDENTIALS_MISSING" });
    return;
  }

  try {
    const result = await EasyM2MClient.getSimBalance(settings, iccid);
    res.json(result);
  } catch (error: any) {
    const apiError = error instanceof EasyM2MApiError ? error : null;
    res.status(502).json({ message: `Error fetching balance for ${iccid}`, error: error.message, cause: apiError?.cause ?? "Unexpected error.", code: apiError?.code ?? "UNKNOWN_ERROR" });
  }
});

/** Adds credit to a SIM card (top-up). */
app.post("/simcard/:iccid/balance/topup", async (req: Request, res: Response) => {
  const { iccid } = req.params;
  const amount = parseFloat(req.body?.amount);

  if (isNaN(amount) || amount <= 0) {
    res.status(400).json({ message: "A positive numeric 'amount' is required in the request body.", code: "INVALID_AMOUNT" });
    return;
  }

  if (!settings.apiClientId || !settings.apiPassword || !settings.apiKey) {
    res.status(400).json({ message: "EasyM2M credentials are not configured", cause: "Go to the Settings tab and enter your API credentials.", code: "CREDENTIALS_MISSING" });
    return;
  }

  try {
    await EasyM2MClient.topupBalance(settings, iccid, amount);
    Log.info(`Balance top-up successful — ICCID: ${iccid}, amount: €${amount}`);
    res.status(200).json({ message: `€${amount} added to SIM ${iccid}` });
  } catch (error: any) {
    const apiError = error instanceof EasyM2MApiError ? error : null;
    Log.error(`Error topping up balance for ${iccid}:`, error.message);
    res.status(502).json({ message: `Error topping up balance for ${iccid}`, error: error.message, cause: apiError?.cause ?? "Unexpected error.", code: apiError?.code ?? "UNKNOWN_ERROR" });
  }
});

/** Runs a GSM or GPRS diagnostic test on a SIM card. */
app.get("/simcard/:iccid/diagnostics/:type", async (req: Request, res: Response) => {
  const { iccid, type } = req.params;

  if (type !== 'gsm' && type !== 'gprs') {
    res.status(400).json({ message: "Diagnostic type must be 'gsm' or 'gprs'.", code: "INVALID_TYPE" });
    return;
  }

  if (!settings.apiClientId || !settings.apiPassword || !settings.apiKey) {
    res.status(400).json({ message: "EasyM2M credentials are not configured", cause: "Go to the Settings tab and enter your API credentials.", code: "CREDENTIALS_MISSING" });
    return;
  }

  Log.log(`Running ${type.toUpperCase()} diagnostic — ICCID: ${iccid}`);

  try {
    const result = await EasyM2MClient.runDiagnostics(settings, type as 'gsm' | 'gprs', iccid);
    Log.info(`Diagnostic complete — ICCID: ${iccid}, result: ${result?.output}`);
    res.json(result);
  } catch (error: any) {
    const apiError = error instanceof EasyM2MApiError ? error : null;
    Log.error(`Error running diagnostics for ${iccid}:`, error.message);
    res.status(502).json({ message: `Error running diagnostics for ${iccid}`, error: error.message, cause: apiError?.cause ?? "Unexpected error.", code: apiError?.code ?? "UNKNOWN_ERROR" });
  }
});

// Serve the Angular SPA after all API routes
app.use(FrontEndRouter);

function saveSettings(value: object = {}) {
  const prop = new PropertyCreate();
  prop.property = "settings";
  prop.value = value;
  return pluginsApi.createProperty(_user, _plugin, prop);
}

async function readSettings() {
  Log.log("Reading settings from Thinger.io...");
  pluginsApi.readProperty(_user, _plugin, "settings")
    .then((response: any) => {
      Log.info("Settings loaded from Thinger.io");
      Log.debug("Settings:", JSON.stringify(response.value));
      settings = response.value;
    })
    .catch((error: ApiException<any>) => {
      if (error.code === 404) {
        Log.log("Settings property not found — initializing with defaults");
      } else {
        Log.error(`Error reading settings from Thinger.io (code ${error.code}):`, error.message);
      }
      saveSettings({ apiClientId: '', apiPassword: '', apiKey: '' })
        .then((response: any) => {
          settings = response.value;
          Log.info("Default settings initialized");
        })
        .catch((initError: any) => {
          Log.error("Fatal: could not initialize settings on Thinger.io:", initError.message);
          Log.error("The plugin will run without persistent settings. Check the THINGER_TOKEN_EASYM2M_PLUGIN environment variable.");
        });
    });
}

await readSettings();

app.listen(3000, () => {
  Log.log("Server running on port 3000");
});
