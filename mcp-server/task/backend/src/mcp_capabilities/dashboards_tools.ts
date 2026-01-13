import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { ProductsApi , ApiException, PropertyCreate, PropertyUpdate } from '@thinger-io/thinger-node';
import { Log } from '../lib/log.js';
import {apexChartWidgetSchema} from '../schemas.js';
import { registerLoggedTool } from './register_logged_tools.js';
import type { UserEvents } from '../lib/user-events.js';
import {
  loadDashboardExample,
  getAvailableCategories,
  type DashboardCategory,
  type DashboardExample
} from './dashboard_examples/index.js';

// Interface for complete dashboard structure
type CompleteDashboard = DashboardExample;

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
      title: "Create or Update Thinger.io Product Specific Property",
      description: [
        "This MCP tool allows you to add ApexChart visualization widgets to Thinger.io product dashboards.",
        "A dashboard is a visual interface that enables real-time and historical monitoring of IoT device data.",
        "Each product can (and should) have its own dashboard to:",
        "- Visualize data from all devices associated with the product",
        "- Monitor aggregated product metrics",
        "- Facilitate trend and pattern analysis",
        "- Provide a consolidated view of product behavior",
        "",
        "## Automatic Dashboard Creation",
        "**IMPORTANT**: This tool automatically checks if the dashboard exists for the specified product.",
        "If it doesn't exist, it creates it automatically before adding the widget. Therefore, you can use this tool",
        "immediately after creating a product without worrying about manually configuring the dashboard.",
        "",
        "## Tool Parameters",
        "",
        "### 1. product (string, required)",
        "Unique identifier of the product in Thinger.io where the widget will be added.",
        "Example: 'temperature_sensors' or 'smart_meters'",
        "",
        "### 2. tab (number, required)",
        "Index (starting from 0) of the dashboard tab where the widget will be added.",
        "- tab: 0 = first tab",
        "- tab: 1 = second tab",
        "- etc.",
        "",
        "### 3. widget (complex object, required)",
        "Object that fully defines the ApexChart widget. Must contain:",
        "",
        "#### 3.1 api (object)",
        "Empty object for API configuration (can be kept as empty object: {})",
        "",
        "#### 3.2 layout (object)",
        "Defines the position and size of the widget in the dashboard grid:",
        "- col (number): Column where the widget starts (e.g., 0, 1, 2...)",
        "- row (number): Row where the widget starts (e.g., 0, 1, 2...)",
        "- sizeX (number): Widget width in grid units (e.g., 6 = half width, 12 = full width)",
        "- sizeY (number): Widget height in grid units (e.g., 4, 6, 8, 15...)",
        "",
        "#### 3.3 panel (object)",
        "Visual configuration of the widget panel:",
        "- color (string): Panel primary color (e.g., '#162756', '#ffffff')",
        "- currentColor (string): Current panel color (typically same as color)",
        "- showFullscreen (boolean): Whether to show fullscreen button (recommended: true)",
        "- showOffline (object): Configuration for showing offline devices",
        "  - type (string): Display type - 'none', 'last_sample', or other values",
        "- subtitle (string): Subtitle text (can be empty: '')",
        "- title (string): Title to display in the widget",
        "- updateTs (number): Update timestamp in milliseconds (use Date.now() or current timestamp)",
        "",
        "#### 3.4 properties (object)",
        "ApexChart-specific properties:",
        "- options (string): JavaScript code string defining ApexCharts configuration",
        "  This is a complete JavaScript code block that defines the chart options.",
        "  IMPORTANT: This must be valid JavaScript code as a string, not a JSON object.",
        "  The code should define a variable 'options' with all ApexCharts settings.",
        "",
        "#### 3.5 sources (array of objects)",
        "Array of data sources for the chart. Each source must include:",
        "",
        "**COMMON FIELDS FOR ALL SOURCE TYPES:**",
        "- source (string): Source type - 'bucket', 'device_bucket', 'device', or 'device_property'",
        "- name (string): Name of the series to display",
        "- color (string): Hex color for the series (e.g., '#2E93fA', '#66DA26', '#ff8800')",
        "- timespan (object): Time range configuration",
        "  - magnitude (string): Time unit - 'minute', 'hour', 'day', 'week', 'month'",
        "  - mode (string): Mode type - 'relative', 'latest', 'configurable', or 'range'",
        "  - period (string): Period type - 'latest' or 'custom'",
        "  - value (number): Number of time units (e.g., 24 for 24 hours)",
        "- $timespan (object): Alternative timespan configuration (with $ prefix)",
        "  Same fields as timespan object",
        "",
        "**TYPE 1: Bucket Source**",
        "For historical data from a data bucket:",
        "```json",
        "{",
        "  \"$timespan\": {",
        "    \"magnitude\": \"day\",",
        "    \"mode\": \"configurable\",",
        "    \"period\": \"latest\",",
        "    \"value\": 1",
        "  },",
        "  \"bucket\": {",
        "    \"backend\": \"mongodb\",  // or 'influxdb', 'dynamodb'",
        "    \"id\": \"em2101_data_bucket\",  // Bucket ID",
        "    \"mapping\": \"voltageL1N\",  // Field to visualize",
        "    \"tags\": {",
        "      \"device\": [],  // Filter by specific devices (empty = all)",
        "      \"group\": []   // Filter by specific groups",
        "    },",
        "    \"user\": \"username\"  // Username who owns the bucket",
        "  },",
        "  \"color\": \"#2E93fA\",",
        "  \"name\": \"Ph1-N\",",
        "  \"source\": \"bucket\",",
        "  \"timespan\": {",
        "    \"magnitude\": \"hour\",",
        "    \"mode\": \"relative\",",
        "    \"period\": \"latest\",",
        "    \"value\": 24",
        "  }",
        "}",
        "```",
        "",
        "**IMPORTANT - Backend-Specific Tags:**",
        "- MongoDB backend: Use 'device' and 'group' tags",
        "- InfluxDB backend: May have custom tags like 'Day', 'Hour', 'Slave', 'tag1', 'tag2'",
        "  Example for InfluxDB:",
        "  ```json",
        "  \"tags\": {",
        "    \"Day\": [],",
        "    \"Hour\": [],",
        "    \"Slave\": [\"GWMD01HFCB4673B517C_1\"],",
        "    \"tag1\": [],",
        "    \"tag2\": []",
        "  }",
        "  ```",
        "",
        "**TYPE 2: Device Bucket Source**",
        "```json",
        "{",
        "  \"aggregation\": {},",
        "  \"color\": \"#4CAF50\",",
        "  \"device_bucket\": {",
        "    \"backend\": \"mongodb\",",
        "    \"device\": \"device_001\",",
        "    \"id\": \"sensor_data\",",
        "    \"mapping\": \"humidity\",",
        "    \"tags\": { \"device\": [], \"group\": [] },",
        "    \"user\": \"username\"",
        "  },",
        "  \"name\": \"Humidity Sensor\",",
        "  \"source\": \"device_bucket\",",
        "  \"timespan\": {",
        "    \"magnitude\": \"hour\",",
        "    \"mode\": \"relative\",",
        "    \"period\": \"latest\",",
        "    \"value\": 12",
        "  }",
        "}",
        "```",
        "",
        "**TYPE 3: Device Resource**",
        "```json",
        "{",
        "  \"color\": \"#2196F3\",",
        "  \"device\": {",
        "    \"id\": \"device_001\",",
        "    \"mapping\": \"value\",",
        "    \"resource\": \"temperature\"",
        "  },",
        "  \"name\": \"Current Temperature\",",
        "  \"source\": \"device\",",
        "  \"timespan\": {",
        "    \"magnitude\": \"minute\",",
        "    \"mode\": \"relative\",",
        "    \"period\": \"latest\",",
        "    \"value\": 60",
        "  }",
        "}",
        "```",
        "",
        "## Complete Usage Examples",
        "",
        "### Example 1: Three-Phase Voltage Monitor (Based on Real Dashboard)",
        "```json",
        "{",
        "  \"product\": \"power_monitors\",",
        "  \"tab\": 0,",
        "  \"widget\": {",
        "    \"api\": {},",
        "    \"layout\": {",
        "      \"col\": 0,",
        "      \"row\": 4,",
        "      \"sizeX\": 9,",
        "      \"sizeY\": 15",
        "    },",
        "    \"panel\": {",
        "      \"color\": \"#162756\",",
        "      \"currentColor\": \"#162756\",",
        "      \"showFullscreen\": true,",
        "      \"showOffline\": {",
        "        \"type\": \"none\"",
        "      },",
        "      \"subtitle\": \"\",",
        "      \"title\": \"VOLTAGE\",",
        "      \"updateTs\": 1730000000000",
        "    },",
        "    \"properties\": {",
        "      \"options\": \"var options = {\\n    series: series,\\nchart: {\\n   background:'#162756',\\n    toolbar: {\\n      show: true,\\n      tools: {\\n        download: true,\\n        selection: true,\\n        zoom: true,\\n        zoomin: true,\\n        zoomout: true,\\n        pan: true,\\n        reset: true\\n      },\\n      autoSelected: 'zoom' \\n    },\\n zoom: {\\n          enabled: true,\\n          type: 'x',  \\n          autoScaleYaxis: true\\n      }\\n},\\n    stroke: {\\n        curve: 'smooth',\\n        width: 1.7\\n    },\\n    grid: {\\n        row: {\\n            colors: ['#233e87', 'transparent'],\\n            opacity: 0.3\\n        }\\n    },\\n    xaxis: {\\n        type: 'datetime',\\n        labels: {\\n            datetimeUTC: false\\n        }\\n    },\\n    yaxis: {\\n        labels: {\\n            formatter: function (val) {\\n                return val.toFixed(2);\\n            }\\n        }\\n    },\\n    tooltip: {\\n        x: {\\n            format: 'dd/MM/yyyy HH:mm:ss'\\n        },\\n        shared: true\\n    },\\n    legend: {\\n        position: 'bottom',\\n        labels: {\\n          colors: '#FFFFFF'\\n        }\\n    }\\n};\"",
        "    },",
        "    \"sources\": [",
        "      {",
        "        \"$timespan\": {",
        "          \"magnitude\": \"day\",",
        "          \"mode\": \"configurable\",",
        "          \"period\": \"latest\",",
        "          \"value\": 1",
        "        },",
        "        \"bucket\": {",
        "          \"backend\": \"mongodb\",",
        "          \"id\": \"em2101_data_bucket\",",
        "          \"mapping\": \"voltageL1N\",",
        "          \"tags\": {",
        "            \"device\": [],",
        "            \"group\": []",
        "          },",
        "          \"user\": \"myusername\"",
        "        },",
        "        \"color\": \"#2E93fA\",",
        "        \"name\": \"Ph1-N\",",
        "        \"source\": \"bucket\",",
        "        \"timespan\": {",
        "          \"magnitude\": \"hour\",",
        "          \"mode\": \"relative\",",
        "          \"period\": \"latest\",",
        "          \"value\": 24",
        "        }",
        "      },",
        "      {",
        "        \"$timespan\": {",
        "          \"magnitude\": \"day\",",
        "          \"mode\": \"configurable\",",
        "          \"period\": \"latest\",",
        "          \"value\": 1",
        "        },",
        "        \"bucket\": {",
        "          \"backend\": \"influxdb\",",
        "          \"id\": \"Dispro_PSP\",",
        "          \"mapping\": \"V2\",",
        "          \"tags\": {",
        "            \"Day\": [],",
        "            \"Hour\": [],",
        "            \"Slave\": [\"GWMD01HFCB4673B517C_1\"],",
        "            \"tag1\": [],",
        "            \"tag2\": []",
        "          },",
        "          \"user\": \"myusername\"",
        "        },",
        "        \"color\": \"#66DA26\",",
        "        \"name\": \"Ph2-N\",",
        "        \"source\": \"bucket\",",
        "        \"timespan\": {",
        "          \"magnitude\": \"hour\",",
        "          \"mode\": \"relative\",",
        "          \"period\": \"latest\",",
        "          \"value\": 24",
        "        }",
        "      },",
        "      {",
        "        \"$timespan\": {",
        "          \"magnitude\": \"day\",",
        "          \"mode\": \"configurable\",",
        "          \"period\": \"latest\",",
        "          \"value\": 1",
        "        },",
        "        \"bucket\": {",
        "          \"backend\": \"influxdb\",",
        "          \"id\": \"Dispro_PSP\",",
        "          \"mapping\": \"V3\",",
        "          \"tags\": {",
        "            \"Day\": [],",
        "            \"Hour\": [],",
        "            \"Slave\": [\"GWMD01HFCB4673B517C_1\"],",
        "            \"tag1\": [],",
        "            \"tag2\": []",
        "          },",
        "          \"user\": \"myusername\"",
        "        },",
        "        \"color\": \"#ff8800\",",
        "        \"name\": \"Ph3-N\",",
        "        \"source\": \"bucket\",",
        "        \"timespan\": {",
        "          \"magnitude\": \"hour\",",
        "          \"mode\": \"relative\",",
        "          \"period\": \"latest\",",
        "          \"value\": 24",
        "        }",
        "      }",
        "    ],",
        "    \"type\": \"apex_charts\"",
        "  }",
        "}",
        "```",
        "",
        "### Example 2: Simple Temperature Chart",
        "```json",
        "{",
        "  \"product\": \"temperature_sensors\",",
        "  \"tab\": 0,",
        "  \"widget\": {",
        "    \"api\": {},",
        "    \"layout\": {",
        "      \"col\": 0,",
        "      \"row\": 0,",
        "      \"sizeX\": 12,",
        "      \"sizeY\": 8",
        "    },",
        "    \"panel\": {",
        "      \"color\": \"#1976D2\",",
        "      \"currentColor\": \"#1976D2\",",
        "      \"showFullscreen\": true,",
        "      \"showOffline\": {",
        "        \"type\": \"last_sample\"",
        "      },",
        "      \"subtitle\": \"Last 24 Hours\",",
        "      \"title\": \"Temperature Monitoring\",",
        "      \"updateTs\": 1730000000000",
        "    },",
        "    \"properties\": {",
        "      \"options\": \"var options = {\\n    series: series,\\n    chart: {\\n        background: '#1976D2',\\n        toolbar: { show: true, autoSelected: 'zoom' },\\n        zoom: { enabled: true, type: 'x', autoScaleYaxis: true }\\n    },\\n    stroke: { curve: 'smooth', width: 2 },\\n    xaxis: { type: 'datetime', labels: { datetimeUTC: false } },\\n    yaxis: {\\n        labels: { formatter: function(val) { return val.toFixed(1) + '°C'; } }\\n    },\\n    tooltip: {\\n        x: { format: 'dd/MM/yyyy HH:mm' },\\n        shared: true\\n    },\\n    legend: { position: 'bottom', labels: { colors: '#FFFFFF' } }\\n};\"",
        "    },",
        "    \"sources\": [",
        "      {",
        "        \"$timespan\": {",
        "          \"magnitude\": \"day\",",
        "          \"mode\": \"configurable\",",
        "          \"period\": \"latest\",",
        "          \"value\": 1",
        "        },",
        "        \"bucket\": {",
        "          \"backend\": \"mongodb\",",
        "          \"id\": \"temperature_bucket\",",
        "          \"mapping\": \"temp\",",
        "          \"tags\": {",
        "            \"device\": [],",
        "            \"group\": []",
        "          },",
        "          \"user\": \"myusername\"",
        "        },",
        "        \"color\": \"#FF5722\",",
        "        \"name\": \"Temperature\",",
        "        \"source\": \"bucket\",",
        "        \"timespan\": {",
        "          \"magnitude\": \"hour\",",
        "          \"mode\": \"relative\",",
        "          \"period\": \"latest\",",
        "          \"value\": 24",
        "        }",
        "      }",
        "    ],",
        "    \"type\": \"apex_charts\"",
        "  }",
        "}",
        "```",
        "",
        "### Example 3: Real-Time Device Resource",
        "```json",
        "{",
        "  \"product\": \"smart_meters\",",
        "  \"tab\": 0,",
        "  \"widget\": {",
        "    \"api\": {},",
        "    \"layout\": {",
        "      \"col\": 0,",
        "      \"row\": 0,",
        "      \"sizeX\": 6,",
        "      \"sizeY\": 6",
        "    },",
        "    \"panel\": {",
        "      \"color\": \"#424242\",",
        "      \"currentColor\": \"#424242\",",
        "      \"showFullscreen\": true,",
        "      \"showOffline\": {",
        "        \"type\": \"none\"",
        "      },",
        "      \"subtitle\": \"Real-time monitoring\",",
        "      \"title\": \"Power Consumption\",",
        "      \"updateTs\": 1730000000000",
        "    },",
        "    \"properties\": {",
        "      \"options\": \"var options = {\\n    series: series,\\n    chart: {\\n        type: 'area',\\n        background: '#424242',\\n        toolbar: { show: true }\\n    },\\n    stroke: { curve: 'smooth', width: 2 },\\n    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 } },\\n    xaxis: { type: 'datetime' },\\n    yaxis: { labels: { formatter: function(val) { return val.toFixed(2) + ' kW'; } } },\\n    tooltip: { x: { format: 'HH:mm:ss' } },\\n    legend: { position: 'top', labels: { colors: '#FFFFFF' } }\\n};\"",
        "    },",
        "    \"sources\": [",
        "      {",
        "        \"color\": \"#FFC107\",",
        "        \"device\": {",
        "          \"id\": \"meter_001\",",
        "          \"mapping\": \"power\",",
        "          \"resource\": \"power_consumption\"",
        "        },",
        "        \"name\": \"Power (kW)\",",
        "        \"source\": \"device\",",
        "        \"timespan\": {",
        "          \"magnitude\": \"minute\",",
        "          \"mode\": \"relative\",",
        "          \"period\": \"latest\",",
        "          \"value\": 30",
        "        }",
        "      }",
        "    ],",
        "    \"type\": \"apex_charts\"",
        "  }",
        "}",
        "```",
        "",
        "## Important Notes",
        "",
        "1. **Colors**: Use hexadecimal color codes (#RRGGBB)",
        "2. **Options**: The 'options' field must be a JavaScript code string, not a JSON object",
        "   - Escape newlines as \\n",
        "   - Escape quotes as \\'",
        "   - Must define a variable named 'options'",
        "   - Can reference 'series' variable which is automatically provided",
        "3. **Timestamps**: Use current timestamp in milliseconds for updateTs (Date.now())",
        "4. **Backend Types**: 'mongodb', 'influxdb', or 'dynamodb'",
        "5. **Tags**: Structure varies by backend - check your bucket configuration",
        "6. **Timespan**: Include both 'timespan' and '$timespan' objects",
        "7. **Layout**: Grid system typically has 12 columns width",
        "8. **User Field**: Include the username who owns the bucket/device",
        "9. **Automatic Dashboard**: The tool creates the dashboard if it doesn't exist",
        "",
        "## Best Practices",
        "",
        "- Create a dashboard immediately after creating a product",
        "- Use distinct colors for each data series",
        "- Adjust widget size based on data importance",
        "- Set showFullscreen to true for better user experience",
        "- Use descriptive titles that clearly indicate the data being displayed",
        "- Match timespan configurations between $timespan and timespan objects",
        "- Consider the background color when choosing text/series colors for readability",
        "- Use appropriate chart types in options (line, area, bar, etc.) based on data nature"
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
      "This MCP tool provides pre-configured dashboard widget examples based on different IoT use cases.",
      "These examples serve as templates that LLM clients can use to understand dashboard structures",
      "and generate appropriate dashboard configurations for different scenarios.",
      "",
      "## Purpose",
      "This tool helps LLM clients by providing real-world dashboard examples that demonstrate:",
      "- Proper widget structure and configuration",
      "- ApexCharts options formatting",
      "- Data source configurations",
      "- Layout and styling best practices",
      "- Multi-series visualization setups",
      "",
      "## Available Categories",
      "",
      "### 1. temperature_and_humidity_dashboard",
      "Real-world example for monitoring temperature and humidity sensors.",
      "Features:",
      "- Multiple widget types: donutchart, chart, html_time",
      "- 7 different widgets showing current and historical data",
      "- Custom HTML table with time-series data",
      "- MongoDB bucket sources",
      "- 24-hour time range for historical charts",
      "",
      "## Usage",
      "Provide the category name to receive a complete, ready-to-use dashboard example.",
      "The returned JSON includes the full dashboard structure with all tabs and widgets.",
      "You should customize the bucket IDs ('id' field in bucket sources), user names ('user' field),",
      "and data mappings ('mapping' field) to match your actual Thinger.io setup, then use",
      "'Create-Or-Update-Product-Dashboard' to apply it to a product.",
      "",
      "## Input Parameters",
      "- **category** (string, required): One of the available dashboard categories listed above",
      "",
      "## Output",
      "Returns a complete dashboard configuration in JSON format following the Thinger.io structure:",
      "```json",
      "{",
      "  \"tabs\": [",
      "    {",
      "      \"name\": \"Main\",",
      "      \"widgets\": [...]",
      "    }",
      "  ]",
      "}",
      "```",
      "This structure can be used directly with 'Create-Or-Update-Product-Dashboard' after",
      "customizing bucket IDs, user names, and data mappings.",
      "",
      "## Example Usage",
      "```json",
      "{",
      "  \"category\": \"temperature_and_humidity_dashboard\"",
      "}",
      "```",
      "",
      "This will return a complete dashboard example that can be adapted to specific use cases.",
      "",
      "## Important Customization Notes",
      "When using the examples, you MUST update these fields:",
      "1. **bucket.id**: Change to your actual bucket identifier (e.g., 'lht65n_data' → 'your_bucket_id')",
      "2. **bucket.mapping**: Update field names to match your device data structure",
      "3. **panel.title**: Customize widget titles to match your use case",
      "4. **properties**: Adjust min/max values, units, colors as needed",
      "",
      "**CRITICAL**: DO NOT modify the widget structure itself (layout, type, overall schema).",
      "Only change data references and visual customizations. The examples show the exact",
      "structure that Thinger.io expects - deviation from this structure may cause errors."
    ].join("\n"),
    inputSchema: {
      category: z.enum([
        'temperature_and_humidity_dashboard'
      ]).describe("The category of dashboard example to retrieve. Available categories: " + getAvailableCategories().join(', '))
    },
    handler: async ({ category }) => {
      try {
        Log.log(`Loading dashboard example for category='${category}'`);
        const example = await loadDashboardExample(category as DashboardCategory);

        const responseText = [
          `# Dashboard Example: ${category}`,
          "",
          "Below is a complete dashboard configuration example with all tabs and widgets.",
          "This structure follows the exact format required by Thinger.io.",
          "",
          "## How to Use This Example:",
          "",
          "1. Copy the JSON structure below",
          "2. Customize the data references:",
          "   - **bucket.id**: Change 'lht65n_data' to your actual bucket identifier",
          "   - **bucket.mapping**: Update field names (e.g., 'TempC_SHT', 'Hum_SHT') to match your data",
          "   - **panel.title**: Adjust widget titles to your preference",
          "   - **properties**: Modify min/max values, units, colors as needed",
          "3. Use 'Create-Or-Update-Product-Dashboard' tool with:",
          "   - product: your product ID",
          "   - dashboard: the customized JSON below",
          "",
          "**CRITICAL**: DO NOT change the widget structure, types, or schema.",
          "Only modify data references and visual properties.",
          "",
          "```json",
          JSON.stringify(example, null, 2),
          "```"
        ].join("\n");

        return {
          content: [
            {
              type: "text",
              text: responseText
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
      "This MCP tool allows you to create or update a complete dashboard configuration for a Thinger.io product.",
      "Unlike the widget-by-widget approach, this tool sets the entire dashboard structure at once,",
      "making it ideal for AI-generated dashboards based on device characteristics.",
      "",
      "## When to Use This Tool",
      "",
      "Use this tool when you want to:",
      "- Create a complete dashboard from scratch based on device data structure",
      "- Replace an existing dashboard with a new AI-generated configuration",
      "- Set up a dashboard with multiple tabs and widgets in a single operation",
      "",
      "## Dashboard Examples Available",
      "",
      "**IMPORTANT**: Before generating a custom dashboard, you should check if there are pre-configured",
      "examples that match the device type you're working with. Use the 'Get-Dashboard-Example-By-Category'",
      "tool to retrieve ready-to-use dashboard templates for common IoT device types:",
      "",
      "### Available Dashboard Categories:",
      "- **temperature_and_humidity_dashboard**: For environmental sensors monitoring temperature and humidity",
      "  (includes donutchart, chart, and html_time widgets)",
      "",
      "### Decision Guide for Dashboard Creation:",
      "",
      "1. **Device matches a category**: Use 'Get-Dashboard-Example-By-Category' to retrieve the example,",
      "   customize it with actual product/bucket/user values, then use this tool to apply it.",
      "",
      "2. **Device is similar to a category**: Retrieve the closest example, adapt the widget configuration",
      "   (change mappings, colors, titles, etc.), then use this tool to apply the modified dashboard.",
      "",
      "3. **Device doesn't match any category**: You have two options:",
      "   - **Option A (Recommended)**: Skip dashboard creation. It's perfectly valid and acceptable to NOT create",
      "     a dashboard if the device type doesn't warrant visualization or doesn't fit standard patterns.",
      "   - **Option B**: Generate a custom generic dashboard based on the device's data structure, ensuring",
      "     proper ApexCharts configuration and data source setup.",
      "",
      "**NOTE**: Not every device needs a dashboard. Simple devices, actuators, configuration-only devices,",
      "or devices with non-visual data may not benefit from dashboard visualization.",
      "",
      "## Dashboard Structure",
      "",
      "The dashboard object must contain:",
      "",
      "### tabs (array, required)",
      "Array of tab objects. Each tab represents a separate view in the dashboard.",
      "Each tab object must have:",
      "- **name** (string): Display name of the tab (e.g., 'Main', 'Details', 'History')",
      "- **widgets** (array): Array of widget objects to display in this tab",
      "",
      "### Widget Structure",
      "Each widget in the widgets array can be of ANY widget type supported by Thinger.io.",
      "The structure and required fields vary depending on the widget type.",
      "",
      "**Common Widget Types:**",
      "- **chart**: Basic line/area chart for time-series data",
      "- **donutchart**: Circular gauge showing current value with min/max",
      "- **html_time**: Custom HTML template with time-series data",
      "- **apex_charts**: Advanced ApexCharts visualizations",
      "- **text**: Simple text display",
      "- **map**: Geographical map visualization",
      "- and many more...",
      "",
      "**Common Widget Fields:**",
      "- **type** (string): Widget type identifier (e.g., 'chart', 'donutchart', 'html_time')",
      "- **layout** (object): Position and size in grid",
      "  - col (number): Starting column (0-based)",
      "  - row (number): Starting row (0-based)",
      "  - sizeX (number): Width in grid units (max 12)",
      "  - sizeY (number): Height in grid units",
      "- **panel** (object): Visual configuration",
      "  - color (string): Background color (hex)",
      "  - currentColor (string): Current color",
      "  - showOffline (object): Offline device handling",
      "  - title (string): Widget title",
      "- **properties** (object): Widget-specific configuration (varies by type)",
      "- **sources** (array): Data sources for the widget",
      "  - Each source defines where data comes from (bucket, device, etc.)",
      "",
      "**IMPORTANT**: The exact structure depends on the widget type. Always refer to the dashboard",
      "examples to see the correct structure for each widget type. DO NOT invent or modify the",
      "structure - copy it from the examples and only change data references (bucket IDs, mappings, etc.).",
      "",
      "## Input Parameters",
      "",
      "### 1. product (string, required)",
      "Unique identifier of the Thinger.io product where the dashboard will be created/updated.",
      "Example: 'temperature_sensors', 'smart_meters', 'water_quality_monitors'",
      "",
      "### 2. dashboard (object, required)",
      "Complete dashboard configuration object containing tabs and widgets.",
      "This will completely replace any existing dashboard for the product.",
      "",
      "## Behavior",
      "",
      "1. If the dashboard property doesn't exist for the product, it will be created automatically",
      "2. If a dashboard already exists, it will be completely replaced with the new configuration",
      "3. All tabs and widgets from the provided dashboard object will be set",
      "",
      "## Example Usage",
      "",
      "### Example 1: Simple Single-Tab Dashboard",
      "```json",
      "{",
      "  \"product\": \"my_temperature_sensors\",",
      "  \"dashboard\": {",
      "    \"tabs\": [",
      "      {",
      "        \"name\": \"Main\",",
      "        \"widgets\": [",
      "          {",
      "            \"api\": {},",
      "            \"layout\": {",
      "              \"col\": 0,",
      "              \"row\": 0,",
      "              \"sizeX\": 12,",
      "              \"sizeY\": 8",
      "            },",
      "            \"panel\": {",
      "              \"color\": \"#1976D2\",",
      "              \"currentColor\": \"#1976D2\",",
      "              \"showFullscreen\": true,",
      "              \"showOffline\": { \"type\": \"last_sample\" },",
      "              \"subtitle\": \"Last 24 Hours\",",
      "              \"title\": \"Temperature Monitoring\",",
      "              \"updateTs\": 1736784000000",
      "            },",
      "            \"properties\": {",
      "              \"options\": \"var options = {\\n  series: series,\\n  chart: { background: '#1976D2', toolbar: { show: true } },\\n  xaxis: { type: 'datetime' }\\n};\"",
      "            },",
      "            \"sources\": [",
      "              {",
      "                \"bucket\": {",
      "                  \"backend\": \"mongodb\",",
      "                  \"id\": \"temp_data\",",
      "                  \"mapping\": \"temperature\",",
      "                  \"tags\": { \"device\": [], \"group\": [] },",
      "                  \"user\": \"myuser\"",
      "                },",
      "                \"color\": \"#FF5722\",",
      "                \"name\": \"Temperature\",",
      "                \"source\": \"bucket\",",
      "                \"timespan\": {",
      "                  \"magnitude\": \"hour\",",
      "                  \"mode\": \"relative\",",
      "                  \"period\": \"latest\",",
      "                  \"value\": 24",
      "                }",
      "              }",
      "            ],",
      "            \"type\": \"apex_charts\"",
      "          }",
      "        ]",
      "      }",
      "    ]",
      "  }",
      "}",
      "```",
      "",
      "### Example 2: Multi-Tab Dashboard",
      "```json",
      "{",
      "  \"product\": \"my_smart_sensors\",",
      "  \"dashboard\": {",
      "    \"tabs\": [",
      "      {",
      "        \"name\": \"Overview\",",
      "        \"widgets\": [",
      "          // ... widget configuration ...",
      "        ]",
      "      },",
      "      {",
      "        \"name\": \"Detailed Metrics\",",
      "        \"widgets\": [",
      "          // ... widget configuration ...",
      "        ]",
      "      },",
      "      {",
      "        \"name\": \"Historical Analysis\",",
      "        \"widgets\": [",
      "          // ... widget configuration ...",
      "        ]",
      "      }",
      "    ]",
      "  }",
      "}",
      "```",
      "",
      "## Workflow Recommendation",
      "",
      "### For Devices Matching Example Categories:",
      "1. Use 'Get-Dashboard-Example-By-Category' to retrieve the template",
      "2. Customize the returned JSON:",
      "   - Update 'product' field",
      "   - Update 'user' fields in all sources",
      "   - Update bucket IDs to match actual buckets",
      "   - Update field mappings to match device data structure",
      "   - Update colors, titles, and labels as needed",
      "3. Use this tool ('Create-Or-Update-Product-Dashboard') to apply the dashboard",
      "",
      "### For Custom/Generic Devices:",
      "1. Analyze the device data structure",
      "2. Decide if a dashboard is necessary",
      "3. If yes, generate appropriate dashboard configuration",
      "4. Use this tool to apply the dashboard",
      "",
      "## Important Notes",
      "",
      "- This tool completely replaces any existing dashboard - use with caution",
      "- Ensure all widget configurations are valid before applying",
      "- The 'options' field in properties must be valid JavaScript code as a string",
      "- All timestamps should be in milliseconds (use current timestamp)",
      "- Grid layout has 12 columns maximum width",
      "- Ensure bucket IDs, user names, and mappings match your actual Thinger.io setup",
      "- **Remember**: It's perfectly acceptable to NOT create a dashboard if it doesn't add value",
      "",
      "## Best Practices",
      "",
      "1. **Reuse examples when possible**: Don't reinvent the wheel - adapt existing examples",
      "2. **Validate data structure**: Ensure mappings match actual device data fields",
      "3. **Use appropriate timespans**: Match time ranges to data update frequency",
      "4. **Choose readable colors**: Ensure good contrast and distinct series colors",
      "5. **Keep it simple**: Don't over-complicate dashboards - focus on key metrics",
      "6. **Consider user experience**: Organize widgets logically, use clear titles",
      "7. **Test incrementally**: When in doubt, start with a simple single-widget dashboard"
    ].join("\n"),
    inputSchema: {
      product: z.string().min(1).describe("ID of the Product where the dashboard will be created/updated"),
      dashboard: z.object({
        tabs: z.array(z.object({
          name: z.string().describe("Name of the tab (e.g., 'Main', 'Overview', 'History')"),
          widgets: z.array(z.any()).describe("Array of widgets in this tab - can be any widget type (donutchart, chart, html_time, apex_charts, etc.)")
        })).min(1).describe("Array of dashboard tabs")
      }).describe("Complete dashboard configuration with tabs and widgets. Structure must match Thinger.io dashboard format exactly as shown in the examples.")
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
