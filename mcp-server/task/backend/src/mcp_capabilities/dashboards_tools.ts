import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { ProductsApi , ApiException, PropertyCreate, PropertyUpdate } from '@thinger-io/thinger-node';
import { Log } from '../lib/log.js';
import {apexChartWidgetSchema} from '../schemas.js';
import { registerLoggedTool } from './register_logged_tools.js';
import type { UserEvents } from '../lib/user-events.js';
import { loadExample } from './resources/index.js';

// Dashboard example categories
const DASHBOARD_CATEGORIES = ['temperature_and_humidity_dashboard'] as const;
type DashboardCategory = typeof DASHBOARD_CATEGORIES[number];

// Map old category names to new example categories
const CATEGORY_MAP: Record<DashboardCategory, 'dashboard-full-temperature-humidity'> = {
  'temperature_and_humidity_dashboard': 'dashboard-full-temperature-humidity'
};

interface DashboardWidget {
  type: string;
  layout: { col: number; row: number; sizeX: number; sizeY: number };
  panel: any;
  properties: any;
  sources: any[];
}

interface DashboardTab {
  name: string;
  widgets: DashboardWidget[];
}

interface DashboardExample {
  tabs: DashboardTab[];
}

type CompleteDashboard = DashboardExample;

function getAvailableCategories(): string[] {
  return [...DASHBOARD_CATEGORIES];
}

async function loadDashboardExample(category: DashboardCategory): Promise<DashboardExample> {
  const newCategory = CATEGORY_MAP[category];
  return loadExample<DashboardExample>(newCategory);
}

export function registerDashboardsTools(opts: {
  server: McpServer;
  productsApi: ProductsApi;
  userEvents: UserEvents;
}) {
  const { server, productsApi, userEvents } = opts;
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

  async function createDashBoardProperty(product: string): Promise<void> {
    const dashboardBase = {
      tabs: [
        {
          name: "Main",
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
      title: "Add ApexChart Widget to Product Dashboard",
      description: [
        "Adds an ApexChart widget to a Thinger.io product dashboard.",
        "Auto-creates the dashboard if it doesn't exist.",
        "",
        "PARAMETERS:",
        "- product: Product ID",
        "- tab: Tab index (0-based)",
        "- widget: ApexChart widget configuration",
        "",
        "WIDGET STRUCTURE:",
        "- layout: { col, row, sizeX, sizeY } - Grid position (12 columns max)",
        "- panel: { color, title, subtitle, showFullscreen, showOffline }",
        "- properties: { options } - ApexCharts JS config as string",
        "- sources: Array of data sources (bucket, device_bucket, device, device_property)",
        "- type: 'apex_charts'",
        "",
        "SOURCE TYPES: bucket, device_bucket, device, device_property",
        "",
        ">> For examples, use Get-Dashboard-Configuration-Examples with category 'dashboard-apex-widgets'",
      ].join("\n"),
      inputSchema: {
        product: z.string().min(1).describe("ID of the Product"),
        tab: z.number().min(0).describe("Index of the dashboard tab to add the widget to"),
        widget: apexChartWidgetSchema
      }
    },
    async ({ product, tab, widget } ) => {
      try {
        if (! await isDashBoardPropertyCreated(product)) {
          await createDashBoardProperty(product);
        }

        Log.log(`Adding ApexChart widget to dashboard of product='${product}'`);
        const dashboardProperty = await productsApi.readProperty(thingerUser, product, "dashboard");
        const dashboard = dashboardProperty.value;
        dashboard.tabs[tab].widgets.push(widget);

        // Update the dashboard property with the new widget
        const propertyUpdate = new PropertyUpdate();
        propertyUpdate.name = "dashboard";
        propertyUpdate.property = "dashboard";
        propertyUpdate.value = dashboard;
        const response = await productsApi.updateProperty(thingerUser, product, "dashboard", propertyUpdate);
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

  // Register tool to get dashboard examples by category
  registerLoggedTool({
    server,
    userEvents,
    name: "Get-Dashboard-Example-By-Category",
    title: "Get Dashboard Example by Category",
    description: [
      "Returns a complete dashboard example for a specific IoT use case.",
      "",
      "AVAILABLE CATEGORIES:",
      "- temperature_and_humidity_dashboard: Temp/humidity monitoring with multiple widgets",
      "",
      "CUSTOMIZATION: Update bucket.id, bucket.mapping, bucket.user, panel.title",
      "",
      "Use with Create-Or-Update-Product-Dashboard to apply the customized example.",
    ].join("\n"),
    inputSchema: {
      category: z.enum([
        'temperature_and_humidity_dashboard'
      ]).describe("Dashboard category to retrieve")
    },
    handler: async ({ category }) => {
      try {
        Log.log(`Loading dashboard example for category='${category}'`);
        const example = await loadDashboardExample(category as DashboardCategory);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(example, null, 2)
            }
          ]
        };
      } catch (err: unknown) {
        const errorMessage = err instanceof Error
          ? `Error loading dashboard example: ${err.message}`
          : `Unexpected error: ${String(err)}`;
        Log.error(errorMessage);

        return {
          isError: true,
          content: [
            {
              type: "text",
              text: errorMessage
            }
          ]
        };
      }
    }
  });

  // Register tool to create/update complete dashboard for a product
  registerLoggedTool({
    server,
    userEvents,
    name: "Create-Or-Update-Product-Dashboard",
    title: "Create or Update Complete Product Dashboard",
    description: [
      "Creates or replaces a complete dashboard for a Thinger.io product.",
      "",
      "BEHAVIOR:",
      "- If dashboard doesn't exist → Creates it",
      "- If dashboard exists → Replaces it completely",
      "",
      "DASHBOARD STRUCTURE:",
      "- tabs: Array of { name, widgets[] }",
      "",
      "WIDGET TYPES: chart, donutchart, html_time, apex_charts, text, map, etc.",
      "",
      "WORKFLOW:",
      "1. Use Get-Dashboard-Example-By-Category to get a template",
      "2. Customize bucket.id, bucket.mapping, bucket.user, panel.title",
      "3. Apply with this tool",
      "",
      "NOTE: Not every device needs a dashboard. Skip if it doesn't add value.",
      "",
      ">> For examples, use Get-Dashboard-Configuration-Examples with category 'dashboard-full-temperature-humidity'",
    ].join("\n"),
    inputSchema: {
      product: z.string().min(1).describe("ID of the Product"),
      dashboard: z.object({
        tabs: z.array(z.object({
          name: z.string().describe("Tab name"),
          widgets: z.array(z.any()).describe("Array of widgets")
        })).min(1).describe("Dashboard tabs")
      }).describe("Complete dashboard configuration")
    },
    handler: async ({ product, dashboard }: { product: string; dashboard: CompleteDashboard }) => {
      try {
        // Check if dashboard property exists, if not create it first
        const dashboardExists = await isDashBoardPropertyCreated(product);

        if (!dashboardExists) {
          Log.log(`Dashboard property does not exist for product='${product}', creating it now`);
          // We'll create the property with the full dashboard directly
          const property = new PropertyCreate();
          property.property = "dashboard";
          property.name = "dashboard";
          property.value = dashboard;

          await productsApi.createProperty(thingerUser, product, property);
          Log.log(`Successfully created complete dashboard for user='${thingerUser}' product='${product}'`);

          const summaryText = [
            `# Dashboard Created Successfully`,
            "",
            `Created a new dashboard for product '${product}'.`,
            "",
            "The dashboard is now active and ready to visualize data from your devices."
          ].join("\n");

          return {
            content: [
              {
                type: "text",
                text: summaryText
              }
            ]
          };
        } else {
          // Dashboard exists, update it completely
          Log.log(`Updating complete dashboard for product='${product}'`);

          const propertyUpdate = new PropertyUpdate();
          propertyUpdate.name = "dashboard";
          propertyUpdate.property = "dashboard";
          propertyUpdate.value = dashboard;

          await productsApi.updateProperty(thingerUser, product, "dashboard", propertyUpdate);
          Log.log(`Successfully updated complete dashboard for product='${product}'`);

          const summaryText = [
            `# Dashboard Updated Successfully`,
            "",
            `Updated the dashboard for product '${product}'.`,
            "",
            "The previous dashboard configuration has been completely replaced with the new one."
          ].join("\n");

          return {
            content: [
              {
                type: "text",
                text: summaryText
              }
            ]
          };
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
              text: errorMessage
            }
          ]
        };
      }
    }
  });
}
