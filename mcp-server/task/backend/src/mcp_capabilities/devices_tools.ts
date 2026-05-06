import type {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {DevicesApi, ApiException, DeviceUpdateRequest, DeviceUpdateCallbackRequest, PropertyCreate, PropertyUpdate} from '@thinger-io/thinger-node';
import {z} from 'zod';
import {Log} from '../lib/log.js';
import {registerLoggedTool} from './register_logged_tools.js';
import {UserEvents} from "../lib/user-events.js";


function buildErrorResult(err: unknown) {
  const errorMessage = err instanceof ApiException
    ? `Thinger.io API Error:\n${JSON.stringify(err.body, null, 2) ?? err.message}`
    : `Unexpected error: ${err instanceof Error ? err.message : String(err)}`;
  Log.error(errorMessage);
  return {
    isError: true as const,
    content: [{type: "text" as const, text: errorMessage}],
  };
}

export function registerDevicesTools(opts: {
  server: McpServer;
  devicesApi: DevicesApi;
  userEvents: UserEvents;
}) {
  const {server, devicesApi, userEvents} = opts;
  const thingerUser = process.env.THINGER_USER ?? 'unknown';

  registerLoggedTool<{}>({
    server, userEvents,
    name: "List-Thinger-Devices",
    title: "List all Thinger.io devices",
    description: [
      "Retrieves a comprehensive list of all devices (active and inactive) associated with the current Thinger.io account.",
      "",
      "## Returns",
      "Array of device objects with: `device` (unique ID), `name`, `description`, `connection` (online/offline), `created`.",
      "",
      "## When to use",
      "- Inventory discovery or status checks.",
      "- ID lookup when the user refers to a device by name.",
    ].join("\n"),
    inputSchema: {},
    handler: async () => {
      try {
        const response = await devicesApi.list(thingerUser);
        Log.log(`Fetched devices for user ${thingerUser}`);
        return {content: [{type: "text", text: JSON.stringify(response, null, 2)}]};
      } catch (err) {
        return buildErrorResult(err);
      }
    }
  });

  registerLoggedTool<{deviceId: string}>({
    server, userEvents,
    name: "Get-Thinger-Device",
    title: "Get Thinger.io device details and connection status",
    description: [
      "Retrieves full details for a single device, including its connection status, type, credentials info, and metadata.",
      "",
      "## Returns",
      "Device object with: `device` (ID), `type`, `name`, `description`, `enabled`, `connection` (online/offline + IP + timestamp), `product`, `asset_type`, `asset_group`.",
      "",
      "## When to use",
      "- Verify a device exists before other operations.",
      "- Check real-time connectivity status.",
      "- Inspect device type and product assignment.",
    ].join("\n"),
    inputSchema: {
      deviceId: z.string().min(1).describe("The Thinger.io device ID."),
    },
    handler: async ({deviceId}: {deviceId: string}) => {
      try {
        const response = await devicesApi.readStatus(thingerUser, deviceId);
        return {content: [{type: "text", text: JSON.stringify(response, null, 2)}]};
      } catch (err) {
        return buildErrorResult(err);
      }
    }
  });

  registerLoggedTool<{deviceId: string; type: string; name?: string; description?: string; credentials?: string}>({
    server, userEvents,
    name: "Create-Thinger-Device",
    title: "Create a new Thinger.io device",
    description: [
      "Creates a new device in the current Thinger.io account.",
      "",
      "## Device types",
      "- `generic`: Standard device with persistent TCP/TLS connection via the Thinger.io SDK. Requires credentials (password).",
      "- `http`: HTTP device with no persistent connection. Uses callback pattern for data ingestion.",
      "- `mqtt`: MQTT-based device. Connects via the platform MQTT broker.",
      "- `linux`: Linux device running the Thinger.io Linux client.",
      "",
      "## Inputs",
      "- `deviceId`: Unique alphanumeric ID for the device (e.g. `temp_sensor_01`). Cannot be changed later.",
      "- `type`: Device type (`generic`, `http`, `mqtt`, `linux`).",
      "- `name`: Optional display name.",
      "- `description`: Optional description.",
      "- `credentials`: Required for `generic` and `mqtt` types. Set a strong password.",
      "",
      "## After creation",
      "Use `Get-Thinger-Device` to verify, then configure resources or assign to a product.",
    ].join("\n"),
    inputSchema: {
      deviceId: z.string().min(1).describe("Unique device ID (alphanumeric, underscores allowed)."),
      type: z.enum(["generic", "http", "mqtt", "linux"]).describe("Device connection type."),
      name: z.string().optional().describe("Human-readable display name."),
      description: z.string().optional().describe("Optional device description."),
      credentials: z.string().optional().describe("Password/credentials for generic and mqtt devices."),
    },
    handler: async ({deviceId, type, name, description, credentials}: {deviceId: string; type: string; name?: string; description?: string; credentials?: string}) => {
      try {
        // The thinger-node library reuses PropertyCreate for device creation but maps `property`
        // instead of `device`. We bypass the serializer by casting to any.
        const body: any = {device: deviceId, type};
        if (name) body.name = name;
        if (description) body.description = description;
        if (credentials) body.credentials = credentials;

        const thingerHost = process.env.THINGER_HOST;
        const token = process.env.THINGER_TOKEN_MCP_SERVER_PLUGIN;
        const res = await fetch(`https://${thingerHost}/v1/users/${thingerUser}/devices`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const errBody = await res.text();
          return {isError: true, content: [{type: "text" as const, text: `API error ${res.status}: ${errBody}`}]};
        }
        const data = res.status === 204 ? {ok: true, device: deviceId} : await res.json().catch(() => ({ok: true, device: deviceId}));
        Log.log(`Created device ${deviceId} (type: ${type})`);
        return {content: [{type: "text", text: JSON.stringify(data, null, 2)}]};
      } catch (err) {
        return buildErrorResult(err);
      }
    }
  });

  registerLoggedTool<{deviceId: string; name?: string; description?: string; enabled?: boolean; credentials?: string}>({
    server, userEvents,
    name: "Update-Thinger-Device",
    title: "Update a Thinger.io device (name, description, enabled state, credentials)",
    description: [
      "Updates mutable fields of an existing device. Only provided fields are changed.",
      "",
      "## Updatable fields",
      "- `name`: Display name.",
      "- `description`: Free-text description.",
      "- `enabled`: Enable or disable the device (disabling blocks new connections).",
      "- `credentials`: New password for the device (generic/mqtt types).",
      "",
      "## Note",
      "Device ID and type cannot be changed after creation.",
    ].join("\n"),
    inputSchema: {
      deviceId: z.string().min(1).describe("Target device ID."),
      name: z.string().optional().describe("New display name."),
      description: z.string().optional().describe("New description."),
      enabled: z.boolean().optional().describe("Enable (true) or disable (false) the device."),
      credentials: z.string().optional().describe("New credentials/password."),
    },
    handler: async ({deviceId, name, description, enabled, credentials}: {deviceId: string; name?: string; description?: string; enabled?: boolean; credentials?: string}) => {
      try {
        const req = new DeviceUpdateRequest();
        if (name !== undefined) req.name = name;
        if (description !== undefined) req.description = description;
        if (enabled !== undefined) req.enabled = enabled;
        if (credentials !== undefined) req.credentials = credentials;
        const response = await devicesApi.update(thingerUser, deviceId, req);
        Log.log(`Updated device ${deviceId}`);
        return {content: [{type: "text", text: JSON.stringify(response ?? {ok: true}, null, 2)}]};
      } catch (err) {
        return buildErrorResult(err);
      }
    }
  });

  registerLoggedTool<{deviceId: string}>({
    server, userEvents,
    name: "Delete-Thinger-Device",
    title: "Delete a Thinger.io device permanently",
    description: [
      "Permanently deletes a device from the platform. This action is irreversible.",
      "",
      "## Warning",
      "Deleting a device does NOT automatically delete associated data buckets or properties.",
      "Confirm with the user before executing this tool.",
      "",
      "## What is deleted",
      "- The device registration and credentials.",
      "- Device tokens.",
      "- Active connections are terminated.",
    ].join("\n"),
    inputSchema: {
      deviceId: z.string().min(1).describe("Device ID to delete."),
    },
    handler: async ({deviceId}: {deviceId: string}) => {
      try {
        await devicesApi.remove(thingerUser, deviceId);
        Log.log(`Deleted device ${deviceId}`);
        return {content: [{type: "text", text: JSON.stringify({ok: true, deleted: deviceId}, null, 2)}]};
      } catch (err) {
        return buildErrorResult(err);
      }
    }
  });

  registerLoggedTool<{}>({
    server, userEvents,
    name: "Get-Thinger-Devices-Overview",
    title: "Get global device statistics for the account",
    description: [
      "Returns account-level device statistics: total devices, online/offline counts, and type breakdown.",
      "",
      "## When to use",
      "Dashboard overviews, fleet health checks, or when the user asks 'how many devices are online?'",
    ].join("\n"),
    inputSchema: {},
    handler: async () => {
      try {
        const response = await devicesApi.readDevicesStatistics(thingerUser);
        return {content: [{type: "text", text: JSON.stringify(response, null, 2)}]};
      } catch (err) {
        return buildErrorResult(err);
      }
    }
  });

  registerLoggedTool<{deviceId: string}>({
    server, userEvents,
    name: "Get-Thinger-Device-Statistics",
    title: "Get detailed statistics for a specific device",
    description: [
      "Returns per-device statistics including: uptime, connection time, transmitted/received bytes, number of API calls, and other resource metrics.",
      "",
      "## When to use",
      "Debugging connectivity issues, monitoring data throughput, or building per-device health reports.",
    ].join("\n"),
    inputSchema: {
      deviceId: z.string().min(1).describe("Target device ID."),
    },
    handler: async ({deviceId}: {deviceId: string}) => {
      try {
        const response = await devicesApi.readStatistics(thingerUser, deviceId);
        return {content: [{type: "text", text: JSON.stringify(response, null, 2)}]};
      } catch (err) {
        return buildErrorResult(err);
      }
    }
  });


  registerLoggedTool<{deviceId: string}>({
    server, userEvents,
    name: "List-Thinger-Device-Resources",
    title: "List all API resources exposed by a Thinger.io device",
    description: [
      "Retrieves all API resources (input/output endpoints) currently advertised by a connected device.",
      "",
      "## What are device resources?",
      "Resources are the API endpoints defined in device firmware using the Thinger.io SDK.",
      "Each resource has a name and can be an output (sensor reading), input (actuator), or both.",
      "",
      "## Returns",
      "Object where each key is a resource name, with metadata describing input/output types.",
      "",
      "## Requirement",
      "The device must be online. Offline devices do not expose their resource list.",
    ].join("\n"),
    inputSchema: {
      deviceId: z.string().min(1).describe("Target device ID."),
    },
    handler: async ({deviceId}: {deviceId: string}) => {
      try {
        const response = await devicesApi.accessResources(thingerUser, deviceId);
        return {content: [{type: "text", text: JSON.stringify(response, null, 2)}]};
      } catch (err) {
        return buildErrorResult(err);
      }
    }
  });

  registerLoggedTool<{deviceId: string; resource: string}>({
    server, userEvents,
    name: "Read-Thinger-Device-Resource",
    title: "Read the current output value of a device resource",
    description: [
      "Reads the current value of a device output resource (e.g., a sensor reading).",
      "",
      "## When to use",
      "- Read a sensor value in real-time (temperature, humidity, GPS coordinates, etc.).",
      "- Verify what a device is currently outputting.",
      "",
      "## Returns",
      "The current value of the resource, which can be a number, string, boolean, or JSON object depending on firmware.",
      "",
      "## Requirement",
      "Device must be online. Use `Get-Thinger-Device` to verify connectivity first.",
    ].join("\n"),
    inputSchema: {
      deviceId: z.string().min(1).describe("Target device ID."),
      resource: z.string().min(1).describe("Resource name (as defined in device firmware)."),
    },
    handler: async ({deviceId, resource}: {deviceId: string; resource: string}) => {
      try {
        const response = await devicesApi.accessOutputResources(thingerUser, deviceId, resource);
        return {content: [{type: "text", text: JSON.stringify(response, null, 2)}]};
      } catch (err) {
        return buildErrorResult(err);
      }
    }
  });

  registerLoggedTool<{deviceId: string; resource: string; body?: Record<string, unknown>}>({
    server, userEvents,
    name: "Call-Thinger-Device-Resource",
    title: "Call a device input resource (send data or trigger an action)",
    description: [
      "Sends data to a device input resource or calls a void resource to trigger an action.",
      "",
      "## Use cases",
      "- Turn on/off an actuator: `{\"state\": true}`",
      "- Set a threshold value: `{\"threshold\": 25.5}`",
      "- Trigger a restart (void resource): no body needed.",
      "- Send configuration to the device.",
      "",
      "## Inputs",
      "- `resource`: The name of the input resource as defined in device firmware.",
      "- `body`: JSON payload to send. Omit for void/trigger resources.",
      "",
      "## Requirement",
      "Device must be online.",
    ].join("\n"),
    inputSchema: {
      deviceId: z.string().min(1).describe("Target device ID."),
      resource: z.string().min(1).describe("Resource name to call."),
      body: z.record(z.unknown()).optional().describe("JSON payload to send to the resource."),
    },
    handler: async ({deviceId, resource, body}: {deviceId: string; resource: string; body?: Record<string, unknown>}) => {
      try {
        const response = await devicesApi.accessInputResources(thingerUser, deviceId, resource, body ?? {});
        return {content: [{type: "text", text: JSON.stringify(response ?? {ok: true}, null, 2)}]};
      } catch (err) {
        return buildErrorResult(err);
      }
    }
  });

  registerLoggedTool<{deviceId: string}>({
    server, userEvents,
    name: "List-Thinger-Device-Tokens",
    title: "List all access tokens for a device",
    description: [
      "Returns all access tokens associated with a device. Tokens allow third-party services to interact with a device without user credentials.",
      "",
      "## Returns",
      "Array of token objects with: `token` (ID), `name`, `expiration`, `permissions`.",
    ].join("\n"),
    inputSchema: {
      deviceId: z.string().min(1).describe("Target device ID."),
    },
    handler: async ({deviceId}: {deviceId: string}) => {
      try {
        const response = await devicesApi.listTokens(thingerUser, deviceId);
        return {content: [{type: "text", text: JSON.stringify(response, null, 2)}]};
      } catch (err) {
        return buildErrorResult(err);
      }
    }
  });

  registerLoggedTool<{deviceId: string; tokenName: string; permissions?: string[]; expiration?: string}>({
    server, userEvents,
    name: "Create-Thinger-Device-Token",
    title: "Create an access token for a Thinger.io device",
    description: [
      "Creates an access token scoped to a specific device, for use by external services or scripts.",
      "",
      "## Inputs",
      "- `tokenName`: A human-readable name to identify the token.",
      "- `permissions`: Array of allowed operations (e.g., `['ReadDeviceResources', 'AccessDeviceResources']`). Omit for full access.",
      "- `expiration`: ISO 8601 expiration date/time. Omit for non-expiring tokens.",
      "",
      "## Returns",
      "The created token object including the token string. Store it securely — it won't be shown again.",
    ].join("\n"),
    inputSchema: {
      deviceId: z.string().min(1).describe("Target device ID."),
      tokenName: z.string().min(1).describe("Human-readable name for the token."),
      permissions: z.array(z.string()).optional().describe("List of permission strings. Omit for full access."),
      expiration: z.string().optional().describe("ISO 8601 expiration date (e.g. '2026-12-31T23:59:59Z'). Omit for no expiry."),
    },
    handler: async ({deviceId, tokenName, permissions, expiration}: {deviceId: string; tokenName: string; permissions?: string[]; expiration?: string}) => {
      try {
        const body: any = {token: tokenName};
        if (permissions) body.permissions = permissions;
        if (expiration) body.expiration = expiration;
        const response = await devicesApi.createToken(thingerUser, deviceId, body);
        Log.log(`Created token '${tokenName}' for device ${deviceId}`);
        return {content: [{type: "text", text: JSON.stringify(response, null, 2)}]};
      } catch (err) {
        return buildErrorResult(err);
      }
    }
  });

  registerLoggedTool<{deviceId: string; tokenId: string}>({
    server, userEvents,
    name: "Delete-Thinger-Device-Token",
    title: "Delete an access token from a Thinger.io device",
    description: [
      "Permanently revokes and deletes an access token. Any integrations using this token will lose access immediately.",
    ].join("\n"),
    inputSchema: {
      deviceId: z.string().min(1).describe("Target device ID."),
      tokenId: z.string().min(1).describe("Token ID to delete (the token name/key)."),
    },
    handler: async ({deviceId, tokenId}: {deviceId: string; tokenId: string}) => {
      try {
        await devicesApi.deleteToken(thingerUser, deviceId, tokenId);
        Log.log(`Deleted token ${tokenId} from device ${deviceId}`);
        return {content: [{type: "text", text: JSON.stringify({ok: true, deleted: tokenId}, null, 2)}]};
      } catch (err) {
        return buildErrorResult(err);
      }
    }
  });

  registerLoggedTool<{deviceId: string}>({
    server, userEvents,
    name: "List-Thinger-Device-Properties",
    title: "List all properties of a Thinger.io device",
    description: [
      "Returns all cloud properties associated with a device. Properties are persistent key-value pairs stored on the platform that devices can read/write.",
      "",
      "## Common uses",
      "- Store device configuration (thresholds, intervals, calibration).",
      "- Share state across device reboots.",
      "- Allow remote configuration without reflashing firmware.",
    ].join("\n"),
    inputSchema: {
      deviceId: z.string().min(1).describe("Target device ID."),
    },
    handler: async ({deviceId}: {deviceId: string}) => {
      try {
        const response = await devicesApi.listProperties(thingerUser, deviceId);
        return {content: [{type: "text", text: JSON.stringify(response, null, 2)}]};
      } catch (err) {
        return buildErrorResult(err);
      }
    }
  });

  registerLoggedTool<{deviceId: string; property: string}>({
    server, userEvents,
    name: "Get-Thinger-Device-Property",
    title: "Get the value of a specific device property",
    description: [
      "Reads the current value of a named device property.",
    ].join("\n"),
    inputSchema: {
      deviceId: z.string().min(1).describe("Target device ID."),
      property: z.string().min(1).describe("Property name/key."),
    },
    handler: async ({deviceId, property}: {deviceId: string; property: string}) => {
      try {
        const response = await devicesApi.readProperty(thingerUser, deviceId, property);
        return {content: [{type: "text", text: JSON.stringify(response, null, 2)}]};
      } catch (err) {
        return buildErrorResult(err);
      }
    }
  });

  registerLoggedTool<{deviceId: string; property: string; value: unknown; name?: string; description?: string}>({
    server, userEvents,
    name: "Create-Thinger-Device-Property",
    title: "Create a new property on a Thinger.io device",
    description: [
      "Creates a new cloud property for a device with an initial value.",
      "",
      "## Inputs",
      "- `property`: Unique key name for the property (e.g., `config`, `threshold`, `calibration`).",
      "- `value`: Initial value — can be a number, string, boolean, or nested JSON object.",
      "- `name`: Optional human-readable display name.",
      "- `description`: Optional description.",
      "",
      "## Note",
      "Properties are stored in the cloud, not on the device. The device firmware must read them via `thing.getProperty()`.",
    ].join("\n"),
    inputSchema: {
      deviceId: z.string().min(1).describe("Target device ID."),
      property: z.string().min(1).describe("Property key name."),
      value: z.unknown().describe("Property value (number, string, boolean, or JSON object)."),
      name: z.string().optional().describe("Optional display name."),
      description: z.string().optional().describe("Optional description."),
    },
    handler: async ({deviceId, property, value, name, description}: {deviceId: string; property: string; value: unknown; name?: string; description?: string}) => {
      try {
        const req = new PropertyCreate();
        req.property = property;
        req.value = value;
        if (name) req.name = name;
        if (description) req.description = description;
        const response = await devicesApi.createProperty(thingerUser, deviceId, req);
        Log.log(`Created property '${property}' on device ${deviceId}`);
        return {content: [{type: "text", text: JSON.stringify(response ?? {ok: true}, null, 2)}]};
      } catch (err) {
        return buildErrorResult(err);
      }
    }
  });

  registerLoggedTool<{deviceId: string; property: string; value: unknown; name?: string; description?: string}>({
    server, userEvents,
    name: "Update-Thinger-Device-Property",
    title: "Update the value of a Thinger.io device property",
    description: [
      "Updates the value and/or metadata of an existing device property.",
      "",
      "## Common use cases",
      "- Remotely update device configuration (e.g., change a sampling interval).",
      "- Trigger a config push to a device.",
    ].join("\n"),
    inputSchema: {
      deviceId: z.string().min(1).describe("Target device ID."),
      property: z.string().min(1).describe("Property key name to update."),
      value: z.unknown().describe("New property value."),
      name: z.string().optional().describe("Optional new display name."),
      description: z.string().optional().describe("Optional new description."),
    },
    handler: async ({deviceId, property, value, name, description}: {deviceId: string; property: string; value: unknown; name?: string; description?: string}) => {
      try {
        const req = new PropertyUpdate();
        req.value = value;
        if (name) req.name = name;
        if (description) req.description = description;
        const response = await devicesApi.updateProperty(thingerUser, deviceId, property, req);
        Log.log(`Updated property '${property}' on device ${deviceId}`);
        return {content: [{type: "text", text: JSON.stringify(response ?? {ok: true}, null, 2)}]};
      } catch (err) {
        return buildErrorResult(err);
      }
    }
  });

  registerLoggedTool<{deviceId: string; property: string}>({
    server, userEvents,
    name: "Delete-Thinger-Device-Property",
    title: "Delete a property from a Thinger.io device",
    description: [
      "Permanently deletes a device property. This cannot be undone.",
    ].join("\n"),
    inputSchema: {
      deviceId: z.string().min(1).describe("Target device ID."),
      property: z.string().min(1).describe("Property key name to delete."),
    },
    handler: async ({deviceId, property}: {deviceId: string; property: string}) => {
      try {
        await devicesApi.deleteProperty(thingerUser, deviceId, property);
        Log.log(`Deleted property '${property}' from device ${deviceId}`);
        return {content: [{type: "text", text: JSON.stringify({ok: true, deleted: property}, null, 2)}]};
      } catch (err) {
        return buildErrorResult(err);
      }
    }
  });

  registerLoggedTool<{deviceId: string}>({
    server, userEvents,
    name: "Get-Thinger-Device-Callback",
    title: "Get the callback configuration for an HTTP device",
    description: [
      "Retrieves the callback configuration for an HTTP device.",
      "",
      "## What is a callback?",
      "HTTP devices push data to Thinger.io via HTTP callbacks instead of maintaining a persistent connection.",
      "The callback config defines what actions to take when data arrives: write to a bucket, set a property, call an endpoint, etc.",
      "",
      "## When to use",
      "Inspect or debug the callback pipeline for HTTP/webhook-based devices.",
    ].join("\n"),
    inputSchema: {
      deviceId: z.string().min(1).describe("Target HTTP device ID."),
    },
    handler: async ({deviceId}: {deviceId: string}) => {
      try {
        const response = await devicesApi.readCallbackConfig(thingerUser, deviceId);
        return {content: [{type: "text", text: JSON.stringify(response, null, 2)}]};
      } catch (err) {
        return buildErrorResult(err);
      }
    }
  });

  registerLoggedTool<{
    deviceId: string;
    writeBucket?: string;
    callEndpoint?: string;
    setProperty?: string;
    sendProperty?: string;
    timeout?: number;
  }>({
    server, userEvents,
    name: "Update-Thinger-Device-Callback",
    title: "Update the callback configuration for an HTTP device",
    description: [
      "Updates what actions are triggered when an HTTP device sends data via its callback URL.",
      "",
      "## Action fields (all optional, set only the ones you want)",
      "- `writeBucket`: Bucket ID to write incoming data to.",
      "- `callEndpoint`: Endpoint ID to call when data arrives.",
      "- `setProperty`: Property ID to update with incoming data.",
      "- `sendProperty`: Property ID to read and send back as response.",
      "- `timeout`: Response timeout in milliseconds.",
      "",
      "## Note",
      "Only applies to devices with type `http`.",
    ].join("\n"),
    inputSchema: {
      deviceId: z.string().min(1).describe("Target HTTP device ID."),
      writeBucket: z.string().optional().describe("Bucket ID to write data to on callback."),
      callEndpoint: z.string().optional().describe("Endpoint ID to call on callback."),
      setProperty: z.string().optional().describe("Property ID to set with incoming data."),
      sendProperty: z.string().optional().describe("Property ID to read and return as callback response."),
      timeout: z.number().optional().describe("Response timeout in milliseconds."),
    },
    handler: async ({deviceId, writeBucket, callEndpoint, setProperty, sendProperty, timeout}: {deviceId: string; writeBucket?: string; callEndpoint?: string; setProperty?: string; sendProperty?: string; timeout?: number}) => {
      try {
        const req = new DeviceUpdateCallbackRequest();
        req.actions = {} as any;
        req.properties = {} as any;
        if (writeBucket) (req.actions as any).writeBucket = writeBucket;
        if (callEndpoint) (req.actions as any).callEndpoint = callEndpoint;
        if (setProperty) (req.actions as any).setProperty = setProperty;
        if (sendProperty) (req.actions as any).sendProperty = sendProperty;
        if (timeout !== undefined) (req.properties as any).timeout = timeout;
        const response = await devicesApi.updateCallback(thingerUser, deviceId, req);
        Log.log(`Updated callback for device ${deviceId}`);
        return {content: [{type: "text", text: JSON.stringify(response ?? {ok: true}, null, 2)}]};
      } catch (err) {
        return buildErrorResult(err);
      }
    }
  });

  registerLoggedTool<{deviceId: string}>({
    server, userEvents,
    name: "List-Thinger-Data-Buckets",
    title: "List all data buckets associated with a Thinger.io device",
    description: [
      "Retrieves all data buckets linked to a specific device.",
      "",
      "## What is a Data Bucket?",
      "A time-series storage resource in Thinger.io used to record historical device data.",
      "",
      "## Workflow",
      "1. Use `List-Thinger-Devices` to find the device ID.",
      "2. Call this tool to discover available buckets.",
      "3. Use `Get-Data-Bucket-Data` to fetch actual stored data.",
      "",
      "## Returns",
      "Array of bucket metadata objects (not the actual data).",
    ].join("\n"),
    inputSchema: {
      deviceId: z.string().min(1).describe("Device ID to list data buckets for."),
    },
    handler: async ({deviceId}: {deviceId: string}) => {
      try {
        const response = await devicesApi.listBuckets(thingerUser, deviceId);
        return {content: [{type: "text", text: JSON.stringify(response, null, 2)}]};
      } catch (err) {
        return buildErrorResult(err);
      }
    }
  });

  registerLoggedTool<{deviceId: string; bucketId: string}>({
    server, userEvents,
    name: "Get-Data-Bucket-Data",
    title: "Read historical data from a Thinger.io data bucket",
    description: [
      "Fetches the stored time-series data from a device data bucket.",
      "",
      "## Returns",
      "Array of entries, each with:",
      "- `ts`: Timestamp in milliseconds since epoch.",
      "- `val`: Stored payload (single value or JSON object).",
      "",
      "## Analysis tip",
      "Summarize for the user unless raw data is explicitly requested (e.g., 'average temperature over last 10 entries').",
      "",
      "## Workflow",
      "Use `List-Thinger-Data-Buckets` first to get a valid `bucketId`.",
    ].join("\n"),
    inputSchema: {
      deviceId: z.string().min(1).describe("Device ID associated with the bucket."),
      bucketId: z.string().min(1).describe("Bucket ID to fetch data from."),
    },
    handler: async ({deviceId, bucketId}: {deviceId: string; bucketId: string}) => {
      try {
        const response = await devicesApi.readBucketData('v2', thingerUser, deviceId, bucketId);
        return {content: [{type: "text", text: JSON.stringify(response, null, 2)}]};
      } catch (err) {
        return buildErrorResult(err);
      }
    }
  });

  registerLoggedTool<{deviceId: string; bucketId: string}>({
    server, userEvents,
    name: "List-Thinger-Bucket-Tags",
    title: "List all tags stored in a Thinger.io data bucket",
    description: [
      "Returns the list of tag names (field keys) present in a data bucket.",
      "",
      "## What are tags?",
      "Tags are the individual field names within bucket records (e.g., `temperature`, `humidity`, `pressure`).",
      "Useful for understanding the data schema before querying specific fields.",
    ].join("\n"),
    inputSchema: {
      deviceId: z.string().min(1).describe("Device ID associated with the bucket."),
      bucketId: z.string().min(1).describe("Bucket ID to inspect."),
    },
    handler: async ({deviceId, bucketId}: {deviceId: string; bucketId: string}) => {
      try {
        const response = await devicesApi.listBucketTags(thingerUser, deviceId, bucketId);
        return {content: [{type: "text", text: JSON.stringify(response, null, 2)}]};
      } catch (err) {
        return buildErrorResult(err);
      }
    }
  });

  registerLoggedTool<{deviceId: string; bucketId: string; tag: string}>({
    server, userEvents,
    name: "Get-Thinger-Bucket-Tag-Data",
    title: "Read data for a specific tag/field from a Thinger.io data bucket",
    description: [
      "Fetches time-series data for a specific field (tag) within a data bucket.",
      "",
      "## When to use",
      "When you only need one specific measurement from a multi-field bucket (e.g., only `temperature` from a bucket that also stores `humidity` and `pressure`).",
      "",
      "## Inputs",
      "- `tag`: The field name to query (use `List-Thinger-Bucket-Tags` to discover available tags).",
    ].join("\n"),
    inputSchema: {
      deviceId: z.string().min(1).describe("Device ID associated with the bucket."),
      bucketId: z.string().min(1).describe("Bucket ID to read from."),
      tag: z.string().min(1).describe("Tag/field name to query (e.g., 'temperature')."),
    },
    handler: async ({deviceId, bucketId, tag}: {deviceId: string; bucketId: string; tag: string}) => {
      try {
        const response = await devicesApi.readBucketTag(thingerUser, deviceId, bucketId, tag);
        return {content: [{type: "text", text: JSON.stringify(response, null, 2)}]};
      } catch (err) {
        return buildErrorResult(err);
      }
    }
  });
}
