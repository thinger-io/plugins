import type {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import {z} from 'zod';
import {ProductsApi, ProductCreateRequest, ApiException} from '@thinger-io/thinger-node';
import {Log} from '../lib/log.js';
import {
  autoprovisionItemSchema,
  apiResourceItemSchema,
  flowsItemSchema,
  bucketItemSchema,
  propertyItemSchema
} from '../schemas.js';
import {registerLoggedTool} from './register_logged_tools.js';
import {UserEvents} from "../lib/user-events.js";


export function registerProductTools(opts: {
  server: McpServer;
  productsApi: ProductsApi;
  userEvents: UserEvents;
}) {
  const {server, productsApi, userEvents} = opts;
  const thingerUser = process.env.THINGER_USER ?? 'unknown';


  registerLoggedTool<{ productId: string }>({
    server,
    userEvents,
    name: "Get-Thinger-Product-Profile-Tool",
    title: "Get Thinger.io Existent Product Profile",
    description: [
      "This tool fetches the FULL profile JSON of an EXISTENT Thinger.io Product.",
      "You MUST provide the 'productId' (ID of the product to fetch).",
      "The tool OUTPUT is the FULL product profile JSON that can be used as a template for new products.",
    ].join("\\n"),
    inputSchema: {
      productId: z.string().min(1).describe("ID of the Thinger.io Product to fetch"),
    },
    handler: async ({productId}) => {
      try {
        const product = await productsApi.exportData(process.env.THINGER_USER ?? "unknown", productId);
        Log.log(`Successfully fetched product profile for productId='${productId}'`);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(product, null, 2),
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
    name: "Create-or-Update-Thinger-Product-Property-Tool",

    title: "Create or Update Thinger.io Product Specific Property",
    description: [
      "Creates or updates a property in a Thinger.io Product.",
      "",
      "PREREQUISITES: Product must already exist.",
      "",
      "BEHAVIOR:",
      "- If 'property' exists → Updates it",
      "- If 'property' is new → Creates it",
      "",
      "CONFIG STRUCTURE:",
      "- enabled: boolean (default: true)",
      "- default: object (optional) - Initial value",
      "- data: object (required) - Data source config",
      "",
      "DATA SOURCE TYPES: event, topic, resource_stream, resource",
      "",
      "TEMPLATE VARIABLES: {{device}}, {{payload}}, payload_function",
      "",
      ">> For examples, use Get-Product-Configuration-Examples with category 'product-properties'",
    ].join("\n"),
    inputSchema: {
      product: z.string().min(1).describe("ID of the Product Property Tool"),
      property: z.string().min(1).describe("ID of the Property to create or update"),
      config: propertyItemSchema
    },
    handler: async (args: unknown) => {
      const {product, property, config} = args as {
        product: string;
        property: string;
        config: z.infer<typeof propertyItemSchema>;
      }
      try {
        const response = await productsApi.updateProductProfileResource(thingerUser, product, 'properties', property, config);
        Log.log(`Successfully created/updated property='${property}' in product='${product}'`);
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

  registerLoggedTool({
    server,
    userEvents,
    name: "Create-or-Update-Thinger-Product-Bucket-Tool",
    title: "Create or Update Thinger.io Product Bucket",
    description: [
      "Creates or updates a data bucket in a Thinger.io Product.",
      "Buckets define where and how device data is persisted.",
      "",
      "PREREQUISITES: Product must already exist.",
      "",
      "BEHAVIOR:",
      "- If 'bucket' exists → Updates it",
      "- If 'bucket' is new → Creates it",
      "",
      "CONFIG STRUCTURE:",
      "- enabled: boolean (default: true)",
      "- backend: 'mongodb' | 'influxdb'",
      "- retention: { period: number, unit: 'hours'|'days'|'weeks'|'months'|'years' }",
      "- tags: string[] (optional)",
      "- data: object (required) - Data source config",
      "",
      "DATA SOURCE TYPES: event, topic, resource_stream, resource",
      "",
      ">> For examples, use Get-Product-Configuration-Examples with category 'product-buckets'",
    ].join("\n"),
    inputSchema: {
      product: z.string().min(1).describe("ID of the existing Thinger.io Product"),
      bucket: z.string().min(1).describe("ID of the Bucket to create or update"),
      config: bucketItemSchema.describe(
        "Bucket configuration object"
      )
    },
    handler: async (args: unknown) => {
      const {product, bucket, config} = args as {
        product: string;
        bucket: string;
        config: z.infer<typeof bucketItemSchema>;
      }
      try {
        const response = await productsApi.updateProductProfileResource(
          thingerUser,
          product,
          'buckets',
          bucket,
          config
        );
        Log.log(`Successfully created/updated bucket='${bucket}' in product='${product}'`);
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

  registerLoggedTool({
    server,
    userEvents,
    name: "Create-or-Update-Thinger-Product-Flow-Tool",

    title: "Create or Update Thinger.io Product Flow",
    description: [
      "Creates or updates a flow pipeline in a Thinger.io Product.",
      "A flow connects a data source (trigger) to a sink (destination).",
      "",
      "PREREQUISITES: Product must already exist.",
      "",
      "BEHAVIOR:",
      "- If 'flow' exists → Updates it",
      "- If 'flow' is new → Creates it",
      "",
      "CONFIG STRUCTURE:",
      "- enabled: boolean (default: true)",
      "- split_data: boolean - Split arrays into individual events",
      "- data: object (required) - Source/trigger config",
      "- sink: object (required) - Destination config",
      "",
      "SOURCE TYPES: event, topic, resource_stream, resource",
      "SINK TYPES: endpoint_call, resource_stream, topic",
      "",
      ">> For examples, use Get-Product-Configuration-Examples with category 'product-flows'",
    ].join("\n"),
    inputSchema: {
      product: z.string().min(1).describe("ID of the existing Thinger.io Product"),
      flow: z.string().min(1).describe("ID of the Flow to create or update"),
      config: flowsItemSchema.describe(
        "Flow configuration object with data source and sink"
      )
    },
    handler: async (args: unknown) => {
      const {product, flow, config} = args as {
        product: string;
        flow: string;
        config: z.infer<typeof flowsItemSchema>;
      }
      try {
        const response = await productsApi.updateProductProfileResource(
          thingerUser,
          product,
          'flows',
          flow,
          config
        );
        Log.log(`Successfully created/updated flow='${flow}' in product='${product}'`);
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

  registerLoggedTool({
    server,
    userEvents,
    name: "Create-or-Update-Thinger-Product-API-Resource-Tool",

    title: "Create or Update Thinger.io Product API Resource",
    description: [
      "Creates or updates an HTTP API resource in a Thinger.io Product.",
      "API resources map incoming HTTP requests to actions (endpoints, streams, topics).",
      "",
      "PREREQUISITES: Product must already exist.",
      "",
      "BEHAVIOR:",
      "- If 'resource' exists → Updates it",
      "- If 'resource' is new → Creates it",
      "",
      "CONFIG STRUCTURE:",
      "- enabled: boolean (default: true)",
      "- handle_connectivity: boolean - Auto-manage device connection",
      "- device_id_resolver: string - Function to extract device ID",
      "- request: { data: target_config } - Request routing",
      "- response: { data: target_config } - Response formatting (optional)",
      "",
      "TARGET TYPES: endpoint_call, resource_stream, topic",
      "",
      "URL: https://api.thinger.io/v3/users/{user}/devices/{device}/resources/{resource_id}",
      "",
      ">> For examples, use Get-Product-Configuration-Examples with category 'product-api-resources'",
    ].join("\n"),
    inputSchema: {
      product: z.string().min(1).describe("ID of the existing Thinger.io Product"),
      resource: z.string().min(1).describe("ID of the API Resource to create or update"),
      config: apiResourceItemSchema.describe(
        "API Resource configuration with request and optional response handlers"
      )
    },
    handler: async (args: unknown) => {
      const {product, resource, config} = args as {
        product: string;
        resource: string;
        config: z.infer<typeof apiResourceItemSchema>;
      }
      try {
        const response = await productsApi.updateProductProfileResource(
          thingerUser,
          product,
          'api',
          resource,
          config
        );
        Log.log(`Successfully created/updated API resource='${resource}' in product='${product}'`);
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


  registerLoggedTool({
    server,
    userEvents,
    name: "Create-or-Update-Thinger-Product-Autoprovision-Tool",

    title: "Create or Update Thinger.io Product Autoprovisioning Rule",
    description: [
      "Creates or updates an autoprovisioning rule in a Thinger.io Product.",
      "Rules automatically assign devices to this product when device ID matches the pattern.",
      "",
      "PREREQUISITES: Product must already exist.",
      "",
      "BEHAVIOR:",
      "- If 'autoprovision' exists → Updates it",
      "- If 'autoprovision' is new → Creates it",
      "",
      "CONFIG STRUCTURE:",
      "- config: { mode: 'pattern', pattern: 'regex' }",
      "- enabled: boolean",
      "",
      "PATTERN: Full regex support (e.g., 'sensor-.*', 'lora-[0-9A-F]{16}')",
      "",
      ">> For examples, use Get-Product-Configuration-Examples with category 'product-autoprovision'",
    ].join("\n"),
    inputSchema: {
      product: z.string().min(1).describe("ID of the existing Thinger.io Product"),
      autoprovision: z.string().min(1).describe("ID of the Autoprovisioning Rule to create or update"),
      config: autoprovisionItemSchema.describe(
        "Autoprovisioning rule configuration with regex pattern matching and enabled flag"
      )
    },
    handler: async (args: unknown) => {
      const {product, autoprovision, config} = args as {
        product: string;
        autoprovision: string;
        config: z.infer<typeof autoprovisionItemSchema>;
      }
      try {
        const response = await productsApi.updateProductProfileResource(
          thingerUser,
          product,
          'autoprovisions',
          autoprovision,
          config
        );
        Log.log(`Successfully created/updated autoprovision rule='${autoprovision}' in product='${product}'`);
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

  registerLoggedTool({
    server,
    userEvents,
    name: "Create-Thinger-Product-Tool",

    title: "Create Thinger.io Product",
    description: [
      "Creates a new empty Thinger.io Product with a name, auto-generated ID, and description.",
      "This is the first step before adding any configuration (properties, buckets, flows, API resources, etc.).",
      "",
      "WHAT THIS TOOL DOES:",
      "- Creates a new product in the Thinger.io account",
      "- Automatically generates a product ID from the name (lowercase, underscores, max 32 chars)",
      "- Sets the product as enabled by default",
      "",
      "WHAT THIS TOOL DOES NOT DO:",
      "- Does NOT configure properties, buckets, flows, API resources, or autoprovisions",
      "- Does NOT add any code snippets",
      "- Does NOT set up any profile configuration",
      "",
      "WORKFLOW:",
      "1. Call this tool to create the base product",
      "2. Use the individual 'Create-or-Update-Thinger-Product-*' tools to add:",
      "   - Properties (Create-or-Update-Thinger-Product-Property-Tool)",
      "   - Buckets (Create-or-Update-Thinger-Product-Bucket-Tool)",
      "   - Flows (Create-or-Update-Thinger-Product-Flow-Tool)",
      "   - API Resources (Create-or-Update-Thinger-Product-API-Resource-Tool)",
      "   - Autoprovision Rules (Create-or-Update-Thinger-Product-Autoprovision-Tool)",
      "",
      "PARAMETERS:",
      "- name: Display name for the product (max 32 characters)",
      "  Examples: 'City Sensors', 'LoRaWAN Devices', 'Test Environment'",
      "",
      "- description: Optional description (max 255 characters)",
      "  Use this to document the purpose, scope, or characteristics of the product",
      "",
      "ID GENERATION:",
      "The product ID is automatically generated from the name:",
      "- Converted to lowercase",
      "- Spaces replaced with underscores",
      "- Hyphens replaced with underscores",
      "- Truncated to 32 characters",
      "",
      "Examples:",
      "- 'City Sensors' → 'city_sensors'",
      "- 'LoRaWAN-Devices' → 'lorawan_devices'",
      "- 'Madrid Temperature Monitoring System' → 'madrid_temperature_monitoring_s'",
      "",
      "EXAMPLE USAGE:",
      "{",
      "  \"name\": \"City Sensors\",",
      "  \"description\": \"IoT sensors deployed across the city for environmental monitoring\"",
      "}",
      "",
      "After creating the product, you can add configuration incrementally using the other tools.",
    ].join("\n"),
    inputSchema: {
      name: z.string().max(32).describe("Name of the new product (max 32 characters)"),
      description: z.string().max(255).optional().describe("Description of the product (max 255 characters)"),
    },
    handler: async (args: unknown) => {
      const {name, description} = args as {
        name: string;
        description?: string;
      }
      try {
        const productId = name
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/-/g, "_")
          .substring(0, 32);

        const request: ProductCreateRequest = {
          name,
          product: productId,
          description,
          enabled: true,
        };

        const response = await productsApi.create(thingerUser, request);

        Log.log(`Successfully created Thinger.io product '${name}' with ID '${productId}'`);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response, null, 2),
            }
          ],
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

  registerLoggedTool({
    server,
    userEvents,
    name: "Create-or-Update-Thinger-Product-Code-Tool",

    title: "Create or Update Thinger.io Product Code",
    description: [
      "Creates or updates JavaScript code for a Thinger.io Product.",
      "Code defines custom functions for data transformation, validation, and business logic.",
      "",
      "PREREQUISITES: Product must already exist.",
      "",
      "CONFIG STRUCTURE:",
      "- code: string - JavaScript functions (use \\n for newlines)",
      "- environment: 'javascript'",
      "- storage: string (optional)",
      "- version: string (optional)",
      "",
      "COMMON USE CASES:",
      "- device_id_resolver: Extract device ID from requests",
      "- payload_function: Transform data between components",
      "- Data validation, LoRaWAN decoding, data enrichment",
      "",
      "FUNCTION CONTEXT:",
      "- device_id_resolver receives: { device, headers, payload }",
      "- payload_function receives: { payload, device, properties, headers }",
      "",
      ">> For examples, use Get-Product-Configuration-Examples with category 'product-code'",
    ].join("\n"),
    inputSchema: {
      product: z.string().min(1).describe("ID of the existing Thinger.io Product"),
      config: z.object({
        code: z.string().describe("JavaScript code with function definitions"),
        environment: z.literal("javascript").default("javascript").describe("Execution environment"),
        storage: z.string().optional().default("").describe("Storage configuration"),
        version: z.string().optional().default("1.0").describe("Code version identifier"),
      }).describe("Code configuration object with JavaScript functions")
    },
    handler: async (args: unknown) => {
      const {product, config} = args as {
        product: string;
        config: {
          code: string;
          environment: "javascript";
          storage?: string;
          version?: string;
        };
      }
      try {
        const response = await productsApi.updateProfileCode(thingerUser, product, config);

        Log.log(`Successfully created/updated code in product='${product}'`);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response, null, 2),
            }
          ],
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
