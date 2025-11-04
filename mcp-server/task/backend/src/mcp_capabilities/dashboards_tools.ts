import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { ProductsApi , ApiException, PropertyCreate } from '@thinger-io/thinger-node';
import { Log } from '../lib/log.js';
import {apexChartWidgetSchema} from '../schemas.js';

export function registerDashboardsTools(opts: {
  server: McpServer;
  productsApi: ProductsApi;
}) {
  const { server, productsApi } = opts;
  const thingerUser = process.env.THINGER_USER ?? 'unknown';

  server.registerTool(
    "Add-Thinger-Product-Dashboard-ApexChart-Widget",
    {
      title: "Create or Update Thinger.io Product Specific Property",
      description: [
      ].join("\n"),
      inputSchema: {
        product: z.string().min(1).describe("ID of the Product Property Tool"),
        widget: apexChartWidgetSchema
      }
    },
    async ({ product, widget } ) => {
      try {
        const dashboard = {
          "tabs": [
            {
              "icon": "fas fa-tachometer-alt",
              "widgets": [
                widget
              ]
            }
          ]
        }

        const property = new PropertyCreate();
        property.property = "dashboard";
        property.name = "dashboard";
        property.value = dashboard;
        const response = await productsApi.createProperty(thingerUser, product, property);
        Log.log(`Successfully created dashboard widget in product='${product}'`);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response, null, 2),
            }
          ],
        }
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
