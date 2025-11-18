import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { DevicesApi } from '@thinger-io/thinger-node';
import { Log } from '../lib/log.js';


export function registerDevicesTools(opts: {
  server: McpServer;
  devicesApi: DevicesApi;
}) {
  const {server, devicesApi} = opts;
  const thingerUser = process.env.THINGER_USER ?? 'unknown';
}
