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

  async function isDashBoardPropertyCreated(product: string): Promise<boolean> {
    try {
      await productsApi.readProperty(thingerUser, product, "dashboard");
      Log.log(`Dashboard property exists for user='${thingerUser}' and product='${product}'`);
      return true;
    } catch (err: unknown) {
      Log.log("Dashboard property does NOT exist for user='" + thingerUser + "' and product='" + product);
      return false;
    }
  }

  async function createDashBoardProperty(product: string = "default"): Promise<void> {
    const dashboardBase = {
      tabs: [
        {
          icon: "fas fa-tachometer-alt",
          widgets: []
        }
      ]
    };

    Log.log(`Creating base dashboard property for user='${thingerUser}' and product='${product}'`);
    const property = new PropertyCreate();
    property.property = "dashboard";
    property.name = "dashboard";
    property.value = dashboardBase;

    try {
      const response = await productsApi.createProperty(thingerUser, product, property);
      Log.log(`Successfully created base dashboard property for user='${thingerUser}' product='${product}' response=${JSON.stringify(response)}`);
    } catch (err: unknown) {
      const errorMessage = err instanceof ApiException
        ? `Thinger.io API Error: ${JSON.stringify(err.body, null, 2)?? err.message}`
        : `Unexpected error: ${err instanceof Error ? err.message : String(err)}`;
      Log.error(errorMessage);
      throw err;
    }
  }

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
        if (! await isDashBoardPropertyCreated(product)) {
          await createDashBoardProperty();
          Log.info("tralari tralera");
        }
        Log.log(`Adding ApexChart widget to dashboard of product='${product}'`);
        const dashboardProperty = await productsApi.readProperty(thingerUser, product, "dashboard");
        const dashboard = dashboardProperty.value;
        dashboard.tabs[0].widgets.push(widget);

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
