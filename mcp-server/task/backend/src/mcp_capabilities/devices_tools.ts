import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { DevicesApi , ApiException } from '@thinger-io/thinger-node';
import { Log } from '../lib/log.js';


export function registerDevicesTools(opts: {
  server: McpServer;
  devicesApi: DevicesApi;
}) {
  const { server, devicesApi } = opts;
  const thingerUser = process.env.THINGER_USER ?? 'unknown';

  server.registerTool(
    "List-Thinger-Devices",
    {
      title: "Get a list of all Thinger.io Devices (active or inactive)",
      description: [
        "This tool fetches and returns a list of all devices associated with the configured Thinger.io account.",
        "It uses the Thinger.io API to retrieve device information, which can be useful for inventory management or monitoring purposes.",
        "This tool can also be used to get the user nomenclature for devices when creating new products or devices.",
      ].join("\\n"),
      inputSchema: {}
    },
    async () => {
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
          ? `Thinger.io API Error: ${err.body ?? err.message}`
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
  );
}
