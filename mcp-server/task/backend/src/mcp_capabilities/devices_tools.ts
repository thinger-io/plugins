import type {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {DevicesApi, ApiException} from '@thinger-io/thinger-node';
import {z} from 'zod';
import {Log} from '../lib/log.js';
import {registerLoggedTool} from './register_logged_tools.js';
import {UserEvents} from "../lib/user-events.js";


export function registerDevicesTools(opts: {
  server: McpServer;
  devicesApi: DevicesApi;
  userEvents: UserEvents;
}) {
  const {server, devicesApi, userEvents} = opts;
  const thingerUser = process.env.THINGER_USER ?? 'unknown';

  registerLoggedTool<{ productId: string }>({
    server,
    userEvents,
    name: "List-Thinger-Devices",
    title: "Get a list of all Thinger.io Devices (active or inactive)",
    description: [
      "Retrieves a comprehensive list of all devices (active and inactive) associated with the current Thinger.io account.",
      "",
      "## Purpose",
      "Use this tool to discover available devices and their current status before performing specific operations.",
      "",
      "## What information is returned?",
      "Returns an array of device objects containing:",
      "- `device`: The unique Device ID (critical for other tool calls).",
      "- `name`: The user-friendly name of the device.",
      "- `description`: User-defined description.",
      "- `connection`: Current connection status (online/offline).",
      "- `created`: Creation timestamp.",
      "",
      "## When to use this tool:",
      "1. **Inventory Discovery**: When you need to know what devices are available.",
      "2. **ID Lookup**: When the user refers to a device by name (e.g., 'the bedroom sensor') and you need to find the corresponding `device` ID.",
      "3. **Status Check**: To quickly verify if devices are online or offline.",
    ].join("\n"),
    inputSchema: {},
    handler: async () => {
      try {
        const response = await devicesApi.list(thingerUser);
        Log.log(`Fetched devices from Thinger.io for user ${thingerUser}`);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response, null, 2),
            },
          ],
          _meta: {lastModified: new Date().toISOString()},
        };
      } catch (err: unknown) {
        const errorMessage = err instanceof ApiException
          ? `Thinger.io API Error:\n${JSON.stringify(err.body, null, 2) ?? err.message}`
          : `Unexpected error: ${err instanceof Error ? err.message : String(err)}`;
        Log.error(errorMessage);
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: errorMessage,
            },
          ],
        };
      }
    }
  });

  registerLoggedTool<{ productId: string }>({
    server,
    userEvents,
    name: "List-Thinger-Data-Buckets",
    title: "Get a list of all Thinger.io Data Buckets associated to specific Thinger device.",
    description: [
      "Retrieves a list of Thinger.io Data Buckets that are specifically linked to a provided Device ID.",
      "",
      "## What is a Data Bucket?",
      "A Data Bucket is a time-series storage utility in Thinger.io used to record historical data sent by devices.",
      "",
      "## How this tool works:",
      "1. Queries the API using a specific `deviceId`.",
      "2. Returns a list of bucket configurations associated with that device.",
      "",
      "## Usage Workflow:",
      "1. First, identify the target device (use `List-Thinger-Devices` if necessary).",
      "2. Call this tool with the `deviceId` to find where its data is being stored.",
      "3. Use the returned `bucket` ID to fetch actual data using `Get-Data-Bucket-Data`.",
      "",
      "## Important Note:",
      "This tool lists the *bucket definitions/metadata*, not the actual data inside them.",
    ].join("\n"),
    inputSchema: {
      deviceId: z.string().min(1).describe("The Thinger.io device ID to list data buckets for."),
    },
    handler: async (args: unknown) => {
      const {deviceId} = args as {deviceId: string};
      try {
        const response = await devicesApi.listBuckets(thingerUser, deviceId);
        Log.log(`Fetched data buckets from Thinger.io for device ${deviceId} and user ${thingerUser}`);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response, null, 2),
            },
          ],
          _meta: {lastModified: new Date().toISOString()},
        };
      } catch (err: unknown) {
        const errorMessage = err instanceof ApiException
          ? `Thinger.io API Error:\n${JSON.stringify(err.body, null, 2) ?? err.message}`
          : `Unexpected error: ${err instanceof Error ? err.message : String(err)}`;
        Log.error(errorMessage);
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: errorMessage,
            },
          ],
        };
      }
    }
  });

  registerLoggedTool<{ productId: string }>({
    server,
    userEvents,
    name: "Get-Data-Bucket-Data",
    title: "Retrieve data from a specific Thinger.io Data Bucket associated to a Thinger device.",
    description: [
      "Fetches the actual historical data entries stored within a specific Thinger.io Data Bucket.",
      "",
      "## Usage Scenario",
      "Use this tool when you need to analyze historical trends, review past device behavior, or debug issues based on logged data.",
      "",
      "## Required Inputs:",
      "- `deviceId`: The identifier of the device associated with the bucket.",
      "- `bucketId`: The identifier of the bucket to read from (obtainable via `List-Thinger-Data-Buckets`).",
      "",
      "## Data Format:",
      "The response contains a list of data entries. Each entry typically includes:",
      "- `ts`: The timestamp of the record (in milliseconds).",
      "- `val`: The payload or value stored (can be a single value or a JSON object).",
      "",
      "## Analysis Tips:",
      "When presenting this data to the user, consider summarizing it (e.g., 'Average temperature over the last 10 entries') unless raw data is explicitly requested.",
    ].join("\n"),
    inputSchema: {
      deviceId: z.string().min(1).describe("The Thinger.io device ID to list data buckets for."),
      bucketId: z.string().min(1).describe("The Thinger.io data bucket ID to fetch data from."),
    },
    handler: async (args: unknown) => {
      const {deviceId, bucketId} = args as {deviceId: string, bucketId: string};
      try {
        const response = await devicesApi.readBucketData('v1', thingerUser, deviceId, bucketId);
        Log.log(`Fetched data buckets from Thinger.io for device ${deviceId} and user ${thingerUser}`);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response, null, 2),
            },
          ],
          _meta: {lastModified: new Date().toISOString()},
        };
      } catch (err: unknown) {
        const errorMessage = err instanceof ApiException
          ? `Thinger.io API Error:\n${JSON.stringify(err.body, null, 2) ?? err.message}`
          : `Unexpected error: ${err instanceof Error ? err.message : String(err)}`;
        Log.error(errorMessage);
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: errorMessage,
            },
          ],
        };
      }
    }
  });
}
