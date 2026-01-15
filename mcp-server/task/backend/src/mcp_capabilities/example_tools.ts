import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { Log } from '../lib/log.js';
import { registerLoggedTool } from './register_logged_tools.js';
import { UserEvents } from '../lib/user-events.js';
import {
  loadExample,
  getAvailableExampleCategories,
  type ExampleCategory,
} from './resources/index.js';

/**
 * Valid example categories for product tools
 */
const PRODUCT_EXAMPLE_CATEGORIES = [
  'product-properties',
  'product-buckets',
  'product-flows',
  'product-api-resources',
  'product-autoprovision',
  'product-code',
] as const;

/**
 * Valid example categories for dashboard tools
 */
const DASHBOARD_EXAMPLE_CATEGORIES = [
  'dashboard-full-temperature-humidity',
  'dashboard-apex-widgets',
] as const;

type ProductExampleCategory = typeof PRODUCT_EXAMPLE_CATEGORIES[number];
type DashboardExampleCategory = typeof DASHBOARD_EXAMPLE_CATEGORIES[number];

/**
 * Register example tools for MCP server
 */
export function registerExampleTools(opts: {
  server: McpServer;
  userEvents: UserEvents;
}) {
  const { server, userEvents } = opts;

  // ============================================================================
  // PRODUCT EXAMPLES TOOL
  // ============================================================================
  registerLoggedTool({
    server,
    userEvents,
    name: 'Get-Product-Configuration-Examples',
    title: 'Get Product Configuration Examples',
    description: [
      'Returns JSON examples for configuring Thinger.io Product components.',
      'Use this tool BEFORE calling any Create-or-Update-Thinger-Product-* tool to understand the expected config structure.',
      '',
      'AVAILABLE CATEGORIES:',
      '- product-properties: Property data source configurations (event, topic, resource_stream, resource)',
      '- product-buckets: Data bucket configurations with retention policies and backends',
      '- product-flows: Data pipeline configurations with sources and sinks',
      '- product-api-resources: HTTP API endpoint configurations with request/response handling',
      '- product-autoprovision: Auto-provisioning rules with regex patterns',
      '- product-code: JavaScript code examples for transformations and validators',
      '',
      'Each example includes:',
      '- name: Descriptive name of the example',
      '- description: What the example demonstrates',
      '- config: The actual configuration object to use as template',
      '',
      'WORKFLOW:',
      '1. Call this tool with the relevant category',
      '2. Review the examples to understand the structure',
      '3. Adapt an example for your specific use case',
      '4. Call the corresponding Create-or-Update tool with your adapted config',
    ].join('\n'),
    inputSchema: {
      category: z.enum(PRODUCT_EXAMPLE_CATEGORIES).describe(
        'Example category to retrieve'
      ),
    },
    handler: async (args: unknown) => {
      const { category } = args as { category: ProductExampleCategory };

      try {
        const examples = await loadExample(category as ExampleCategory);

        Log.log(`Successfully loaded product examples for category='${category}'`);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(examples, null, 2),
            },
          ],
        };
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        Log.error(`Failed to load examples: ${errorMessage}`);
        return {
          isError: true,
          content: [
            {
              type: 'text',
              text: `Failed to load examples for category '${category}': ${errorMessage}`,
            },
          ],
        };
      }
    },
  });

  // ============================================================================
  // DASHBOARD EXAMPLES TOOL
  // ============================================================================
  registerLoggedTool({
    server,
    userEvents,
    name: 'Get-Dashboard-Configuration-Examples',
    title: 'Get Dashboard Configuration Examples',
    description: [
      'Returns JSON examples for configuring Thinger.io Dashboards.',
      'Use this tool BEFORE creating or updating dashboards to understand widget structures.',
      '',
      'AVAILABLE CATEGORIES:',
      '- dashboard-full-temperature-humidity: Complete dashboard with multiple widgets for temp/humidity monitoring',
      '- dashboard-apex-widgets: Individual ApexChart widget examples with different chart types',
      '',
      'Each example includes ready-to-use JSON configurations that can be adapted for your use case.',
    ].join('\n'),
    inputSchema: {
      category: z.enum(DASHBOARD_EXAMPLE_CATEGORIES).describe(
        'Dashboard example category to retrieve'
      ),
    },
    handler: async (args: unknown) => {
      const { category } = args as { category: DashboardExampleCategory };

      try {
        const examples = await loadExample(category as ExampleCategory);

        Log.log(`Successfully loaded dashboard examples for category='${category}'`);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(examples, null, 2),
            },
          ],
        };
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        Log.error(`Failed to load examples: ${errorMessage}`);
        return {
          isError: true,
          content: [
            {
              type: 'text',
              text: `Failed to load dashboard examples for category '${category}': ${errorMessage}`,
            },
          ],
        };
      }
    },
  });
}
