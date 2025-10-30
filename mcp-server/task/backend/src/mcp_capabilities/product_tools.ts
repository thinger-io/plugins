import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { ProductsApi, ProductCreateRequest, ApiException } from '@thinger-io/thinger-node';
import { Log } from '../lib/log.js';
import {
  autoprovisionItemSchema,
  apiResourceItemSchema,
  flowsItemSchema,
  bucketItemSchema,
  propertyItemSchema
} from '../schemas.js';


export function registerProductTools(opts: {
  server: McpServer;
  productsApi: ProductsApi;
}) {
  const { server, productsApi} = opts;
  const thingerUser = process.env.THINGER_USER ?? 'unknown';


  server.registerTool(
    "Get-Thinger-Product-Profile-Tool",
    {
      title: "Get Thinger.io Existent Product Profile",
      description: [
        "This tool fetches the FULL profile JSON of an EXISTENT Thinger.io Product.",
        "You MUST provide the 'productId' (ID of the product to fetch).",
        "The tool OUTPUT is the FULL product profile JSON that can be used as a template for new products.",
      ].join("\\n"),
      inputSchema: {
        productId: z.string().min(1).describe("ID of the Thinger.io Product to fetch"),
      }
    },
      async ({ productId }) => {
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

  server.registerTool(
    "Create-or-Update-Thinger-Product-Property-Tool",
    {
      title: "Create or Update Thinger.io Product Specific Property",
      description: [
        "Creates a new property or updates an existing property in a Thinger.io Product by directly calling the Thinger.io API.",
        "This tool allows incremental construction of product configurations, enabling real-time visibility of changes.",
        "",
        "PREREQUISITES:",
        "- The product MUST already exist in the Thinger.io account",
        "- The 'product' parameter MUST match the exact ID of an existing product",
        "",
        "BEHAVIOR:",
        "- If 'property' matches an existing property ID → Updates that property",
        "- If 'property' is a new ID → Creates a new property in the product",
        "",
        "CONFIG STRUCTURE:",
        "The 'config' parameter must be an object containing:",
        "- enabled: boolean (default: true) - Enable/disable the property",
        "- default: object (optional) - Initial value for the property",
        "- data: object (required) - Data source configuration",
        "",
        "DATA SOURCE TYPES:",
        "",
        "1. EVENT SOURCE - Listen to device events:",
        "{",
        "  \"enabled\": true,",
        "  \"default\": { \"value\": \"initial_value\" },",
        "  \"data\": {",
        "    \"source\": \"event\",",
        "    \"event\": \"device_property_update\",",
        "    \"payload\": \"{{payload}}\",",
        "    \"payload_function\": \"\",",
        "    \"payload_type\": \"source_payload\"",
        "  }",
        "}",
        "Available events: device_callback_call, device_property_create, device_property_update,",
        "                 device_resource_request_failed, device_state_change, device_stats_data,",
        "                 device_topic_subscribe, device_topic_unsubscribe",
        "",
        "2. TOPIC SOURCE - Listen to MQTT topics:",
        "{",
        "  \"enabled\": true,",
        "  \"data\": {",
        "    \"source\": \"topic\",",
        "    \"topic\": \"devices/{{device}}/data/temperature\",",
        "    \"payload\": \"{{payload}}\",",
        "    \"payload_function\": \"\",",
        "    \"payload_type\": \"source_payload\"",
        "  }",
        "}",
        "",
        "3. RESOURCE_STREAM TARGET - Send data to a resource stream:",
        "{",
        "  \"enabled\": true,",
        "  \"data\": {",
        "    \"target\": \"resource_stream\",",
        "    \"resource_stream\": \"telemetry\",",
        "    \"payload\": \"{{payload}}\",",
        "    \"payload_function\": \"\"",
        "  }",
        "}",
        "",
        "4. RESOURCE SOURCE - Listen to device resource changes:",
        "{",
        "  \"enabled\": true,",
        "  \"default\": { \"source\": \"value\" },",
        "  \"data\": {",
        "    \"source\": \"resource\",",
        "    \"resource\": \"uplink\",",
        "    \"update\": \"events\",",
        "    \"payload\": \"{{payload}}\",",
        "    \"payload_function\": \"\",",
        "    \"payload_type\": \"source_payload\"",
        "  }",
        "}",
        "",
        "TEMPLATE VARIABLES:",
        "- {{device}}: Device identifier",
        "- {{payload}}: Incoming payload data",
        "- payload_function: Optional JavaScript function to transform the payload",
        ""
      ].join("\n"),
      inputSchema: {
        product: z.string().min(1).describe("ID of the Product Property Tool"),
        property: z.string().min(1).describe("ID of the Property to create or update"),
        config: propertyItemSchema
      }
    },
    async ({ product, property, config } ) => {
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

  server.registerTool(
    "Create-or-Update-Thinger-Product-Bucket-Tool",
    {
      title: "Create or Update Thinger.io Product Bucket",
      description: [
        "Creates a new bucket or updates an existing bucket in a Thinger.io Product by directly calling the Thinger.io API.",
        "A bucket defines where and how device data is persisted (backend, retention policy, tags) and what source feeds it.",
        "This tool allows incremental construction of product configurations, enabling real-time visibility of changes.",
        "",
        "PREREQUISITES:",
        "- The product MUST already exist in the Thinger.io account",
        "- The 'product' parameter MUST match the exact ID of an existing product",
        "",
        "BEHAVIOR:",
        "- If 'bucket' matches an existing bucket ID → Updates that bucket",
        "- If 'bucket' is a new ID → Creates a new bucket in the product",
        "",
        "CONFIG STRUCTURE:",
        "The 'config' parameter must be an object (WITHOUT the 'id' field) containing:",
        "- enabled: boolean (default: true) - Enable/disable the bucket",
        "- backend: 'mongodb' | 'influxdb' (default: 'mongodb') - Storage backend",
        "- retention: object (required) - Data retention policy",
        "  - period: number - How long to keep data",
        "  - unit: 'hours' | 'days' | 'weeks' | 'months' | 'years'",
        "- tags: string[] (optional) - Tags for organizing/filtering buckets",
        "- data: object (required) - Data source configuration",
        "",
        "DATA SOURCE TYPES:",
        "",
        "1. EVENT SOURCE - Store data from device events:",
        "{",
        "  \"enabled\": true,",
        "  \"backend\": \"mongodb\",",
        "  \"retention\": { \"period\": 30, \"unit\": \"days\" },",
        "  \"tags\": [\"uplink\", \"debug\"],",
        "  \"data\": {",
        "    \"source\": \"event\",",
        "    \"event\": \"device_property_update\",",
        "    \"payload\": \"{{payload}}\",",
        "    \"payload_function\": \"\",",
        "    \"payload_type\": \"source_payload\"",
        "  }",
        "}",
        "Available events: device_callback_call, device_property_create, device_property_update,",
        "                 device_resource_request_failed, device_state_change, device_stats_data,",
        "                 device_topic_subscribe, device_topic_unsubscribe",
        "",
        "2. TOPIC SOURCE - Store data from MQTT topics:",
        "{",
        "  \"enabled\": true,",
        "  \"backend\": \"influxdb\",",
        "  \"retention\": { \"period\": 12, \"unit\": \"months\" },",
        "  \"tags\": [\"telemetry\"],",
        "  \"data\": {",
        "    \"source\": \"topic\",",
        "    \"topic\": \"devices/{{device}}/uplink\",",
        "    \"payload\": \"{{payload}}\",",
        "    \"payload_function\": \"\",",
        "    \"payload_type\": \"source_payload\"",
        "  }",
        "}",
        "",
        "3. RESOURCE_STREAM TARGET - Store data sent to a resource stream:",
        "{",
        "  \"enabled\": true,",
        "  \"backend\": \"mongodb\",",
        "  \"retention\": { \"period\": 90, \"unit\": \"days\" },",
        "  \"tags\": [\"sensor_data\"],",
        "  \"data\": {",
        "    \"target\": \"resource_stream\",",
        "    \"resource_stream\": \"telemetry\",",
        "    \"payload\": \"{{payload}}\",",
        "    \"payload_function\": \"\"",
        "  }",
        "}",
        "",
        "4. RESOURCE SOURCE - Store data from device resource changes:",
        "{",
        "  \"enabled\": true,",
        "  \"backend\": \"influxdb\",",
        "  \"retention\": { \"period\": 6, \"unit\": \"months\" },",
        "  \"tags\": [\"measurements\"],",
        "  \"data\": {",
        "    \"source\": \"resource\",",
        "    \"resource\": \"uplink\",",
        "    \"update\": \"events\",",
        "    \"payload\": \"{{payload}}\",",
        "    \"payload_function\": \"\",",
        "    \"payload_type\": \"source_payload\"",
        "  }",
        "}",
        "",
        "BACKEND SELECTION:",
        "- mongodb: Good for general-purpose storage, flexible schema",
        "- influxdb: Optimized for time-series data, better for high-frequency telemetry",
        "",
        "RETENTION EXAMPLES:",
        "- Short-term debugging: { \"period\": 7, \"unit\": \"days\" }",
        "- Medium-term analytics: { \"period\": 3, \"unit\": \"months\" }",
        "- Long-term archival: { \"period\": 5, \"unit\": \"years\" }",
        "",
        "TEMPLATE VARIABLES:",
        "- {{device}}: Device identifier",
        "- {{payload}}: Incoming payload data",
        "- payload_function: Optional JavaScript function to transform the payload",
        ""
      ].join("\n"),
      inputSchema: {
        product: z.string().min(1).describe("ID of the existing Thinger.io Product"),
        bucket: z.string().min(1).describe("ID of the Bucket to create or update"),
        config: bucketItemSchema.describe(
          "Bucket configuration object"
        )
      }
    },
    async ({ product, bucket, config }) => {
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

  server.registerTool(
    "Create-or-Update-Thinger-Product-Flow-Tool",
    {
      title: "Create or Update Thinger.io Product Flow",
      description: [
        "Creates a new flow or updates an existing flow in a Thinger.io Product by directly calling the Thinger.io API.",
        "A flow is a pipeline with a data source (trigger) and a sink (destination) that enables data routing between components.",
        "Each flow will be inherited for every device that matches the product template.",
        "",
        "PREREQUISITES:",
        "- The product MUST already exist in the Thinger.io account",
        "- The 'product' parameter MUST match the exact ID of an existing product",
        "",
        "BEHAVIOR:",
        "- If 'flow' matches an existing flow ID → Updates that flow",
        "- If 'flow' is a new ID → Creates a new flow in the product",
        "",
        "CONFIG STRUCTURE:",
        "The 'config' parameter must be an object containing:",
        "- enabled: boolean (default: true) - Enable/disable the flow",
        "- split_data: boolean (default: false) - Split array data into individual events",
        "- data: object (required) - Data source/trigger configuration",
        "- sink: object (required) - Data destination configuration",
        "",
        "DATA SOURCE TYPES (trigger):",
        "",
        "1. EVENT SOURCE - Triggered by device events:",
        "\"data\": {",
        "  \"source\": \"event\",",
        "  \"event\": \"device_property_update\",",
        "  \"filter\": { \"property\": \"uplink\" },",
        "  \"payload\": \"{{payload}}\",",
        "  \"payload_function\": \"\",",
        "  \"payload_type\": \"source_payload\"",
        "}",
        "Available events: device_callback_call, device_property_create, device_property_update,",
        "                 device_resource_request_failed, device_state_change, device_stats_data,",
        "                 device_topic_subscribe, device_topic_unsubscribe",
        "",
        "2. TOPIC SOURCE - Triggered by MQTT topics:",
        "\"data\": {",
        "  \"source\": \"topic\",",
        "  \"topic\": \"devices/{{device}}/data\",",
        "  \"payload\": \"{{payload}}\",",
        "  \"payload_function\": \"\",",
        "  \"payload_type\": \"source_payload\"",
        "}",
        "",
        "3. RESOURCE_STREAM TARGET - Triggered when data sent to resource stream:",
        "\"data\": {",
        "  \"target\": \"resource_stream\",",
        "  \"resource_stream\": \"telemetry\",",
        "  \"payload\": \"{{payload}}\",",
        "  \"payload_function\": \"\"",
        "}",
        "",
        "4. RESOURCE SOURCE - Triggered by device resource changes:",
        "\"data\": {",
        "  \"source\": \"resource\",",
        "  \"resource\": \"uplink\",",
        "  \"update\": \"events\",",
        "  \"payload\": \"{{payload}}\",",
        "  \"payload_function\": \"\",",
        "  \"payload_type\": \"source_payload\"",
        "}",
        "",
        "SINK/DESTINATION TYPES:",
        "",
        "1. ENDPOINT_CALL - Send data to an HTTP endpoint:",
        "\"sink\": {",
        "  \"target\": \"endpoint_call\",",
        "  \"endpoint\": \"my_webhook\",",
        "  \"payload\": \"{{payload}}\",",
        "  \"payload_function\": \"\",",
        "  \"payload_type\": \"source_payload\"",
        "}",
        "",
        "2. RESOURCE_STREAM - Send data to a resource stream:",
        "\"sink\": {",
        "  \"target\": \"resource_stream\",",
        "  \"resource_stream\": \"processed_data\",",
        "  \"payload\": \"{{payload}}\",",
        "  \"payload_function\": \"\"",
        "}",
        "",
        "3. TOPIC - Publish data to an MQTT topic:",
        "\"sink\": {",
        "  \"target\": \"topic\",",
        "  \"topic\": \"alerts/{{device}}\",",
        "  \"payload\": \"{{payload}}\",",
        "  \"payload_function\": \"\"",
        "}",
        "",
        "COMPLETE FLOW EXAMPLES:",
        "",
        "Example 1 - Event to Resource flow (downlink routing):",
        "{",
        "  \"enabled\": true,",
        "  \"split_data\": false,",
        "  \"data\": {",
        "    \"source\": \"event\",",
        "    \"event\": \"device_property_update\",",
        "    \"filter\": { \"property\": \"downlink_command\" },",
        "    \"payload\": \"{{payload}}\",",
        "    \"payload_function\": \"\",",
        "    \"payload_type\": \"source_payload\"",
        "  },",
        "  \"sink\": {",
        "    \"target\": \"resource_stream\",",
        "    \"resource_stream\": \"downlink\",",
        "    \"payload\": \"{{payload}}\",",
        "    \"payload_function\": \"\"",
        "  }",
        "}",
        "",
        "Example 2 - Topic to Endpoint flow (webhook integration):",
        "{",
        "  \"enabled\": true,",
        "  \"split_data\": false,",
        "  \"data\": {",
        "    \"source\": \"topic\",",
        "    \"topic\": \"sensors/{{device}}/alert\",",
        "    \"payload\": \"{{payload}}\",",
        "    \"payload_type\": \"source_payload\"",
        "  },",
        "  \"sink\": {",
        "    \"target\": \"endpoint_call\",",
        "    \"endpoint\": \"alert_webhook\",",
        "    \"payload\": \"{{payload}}\",",
        "    \"payload_type\": \"source_payload\"",
        "  }",
        "}",
        "",
        "SPLIT_DATA OPTION:",
        "When split_data is true, if the source returns an array, each element will trigger",
        "the sink independently. Useful for batch processing scenarios.",
        "",
        "TEMPLATE VARIABLES:",
        "- {{device}}: Device identifier",
        "- {{payload}}: Data payload from the source",
        "- payload_function: Optional JavaScript function to transform data between source and sink",
      ].join("\n"),
      inputSchema: {
        product: z.string().min(1).describe("ID of the existing Thinger.io Product"),
        flow: z.string().min(1).describe("ID of the Flow to create or update"),
        config: flowsItemSchema.describe(
          "Flow configuration object with data source and sink"
        )
      }
    },
    async ({ product, flow, config }) => {
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

  server.registerTool(
    "Create-or-Update-Thinger-Product-API-Resource-Tool",
    {
      title: "Create or Update Thinger.io Product API Resource",
      description: [
        "Creates a new API resource or updates an existing API resource in a Thinger.io Product by directly calling the Thinger.io API.",
        "An API resource is an HTTP endpoint that maps incoming requests to actions (endpoint calls, resource streams, topics).",
        "This API endpoint is automatically opened in each device that matches the product template.",
        "",
        "PREREQUISITES:",
        "- The product MUST already exist in the Thinger.io account",
        "- The 'product' parameter MUST match the exact ID of an existing product",
        "",
        "BEHAVIOR:",
        "- If 'resource' matches an existing API resource ID → Updates that resource",
        "- If 'resource' is a new ID → Creates a new API resource in the product",
        "",
        "CONFIG STRUCTURE:",
        "The 'config' parameter must be an object containing:",
        "- enabled: boolean (default: true) - Enable/disable the API resource",
        "- handle_connectivity: boolean (optional) - Automatically handle device connectivity",
        "- device_id_resolver: string (optional) - Function name to resolve device ID from request",
        "- request: object (required) - Request handler configuration",
        "  - data: object - Target configuration (where to route the request)",
        "- response: object (optional) - Response handler configuration",
        "  - data: object - How to format the response",
        "",
        "REQUEST TARGET TYPES:",
        "",
        "1. ENDPOINT_CALL - Route to a Thinger.io HTTP endpoint:",
        "\"request\": {",
        "  \"data\": {",
        "    \"target\": \"endpoint_call\",",
        "    \"endpoint\": \"webhook_processor\",",
        "    \"payload\": \"{{payload}}\",",
        "    \"payload_function\": \"\",",
        "    \"payload_type\": \"source_payload\"",
        "  }",
        "}",
        "",
        "2. RESOURCE_STREAM - Send to a device resource stream:",
        "\"request\": {",
        "  \"data\": {",
        "    \"target\": \"resource_stream\",",
        "    \"resource_stream\": \"uplink\",",
        "    \"payload\": \"{{payload}}\",",
        "    \"payload_function\": \"\",",
        "    \"payload_type\": \"source_payload\"",
        "  }",
        "}",
        "",
        "3. TOPIC - Publish to an MQTT topic:",
        "\"request\": {",
        "  \"data\": {",
        "    \"target\": \"topic\",",
        "    \"topic\": \"devices/{{device}}/commands\",",
        "    \"payload\": \"{{payload}}\",",
        "    \"payload_function\": \"\"",
        "  }",
        "}",
        "",
        "RESPONSE CONFIGURATION:",
        "Define how to format the HTTP response back to the caller.",
        "",
        "\"response\": {",
        "  \"data\": {",
        "    \"target\": \"endpoint_call\",",
        "    \"endpoint\": \"response_formatter\",",
        "    \"payload\": \"{{payload}}\",",
        "    \"payload_type\": \"source_payload\"",
        "  }",
        "}",
        "",
        "COMPLETE API RESOURCE EXAMPLES:",
        "",
        "Example 1 - Uplink receiver (external system → device resource stream):",
        "{",
        "  \"enabled\": true,",
        "  \"handle_connectivity\": true,",
        "  \"device_id_resolver\": \"extract_device_id\",",
        "  \"request\": {",
        "    \"data\": {",
        "      \"target\": \"resource_stream\",",
        "      \"resource_stream\": \"uplink\",",
        "      \"payload\": \"{{payload}}\",",
        "      \"payload_function\": \"\",",
        "      \"payload_type\": \"source_payload\"",
        "    }",
        "  },",
        "  \"response\": {",
        "    \"data\": {",
        "      \"target\": \"topic\",",
        "      \"topic\": \"ack/{{device}}\",",
        "      \"payload\": \"{\\\"status\\\": \\\"received\\\"}\",",
        "      \"payload_type\": \"source_payload\"",
        "    }",
        "  }",
        "}",
        "",
        "Example 2 - Downlink sender (external system → endpoint → response):",
        "{",
        "  \"enabled\": true,",
        "  \"handle_connectivity\": false,",
        "  \"request\": {",
        "    \"data\": {",
        "      \"target\": \"endpoint_call\",",
        "      \"endpoint\": \"downlink_processor\",",
        "      \"payload\": \"{\\n  \\\"data\\\": \\\"{{payload.data}}\\\",\\n  \\\"port\\\": {{payload.port=85}},\\n  \\\"confirmed\\\": {{payload.confirmed=false}}\\n}\",",
        "      \"payload_function\": \"\",",
        "      \"payload_type\": \"source_payload\"",
        "    }",
        "  },",
        "  \"response\": {",
        "    \"data\": {",
        "      \"target\": \"resource_stream\",",
        "      \"resource_stream\": \"downlink_response\",",
        "      \"payload\": \"{{payload}}\",",
        "      \"payload_type\": \"source_payload\"",
        "    }",
        "  }",
        "}",
        "",
        "Example 3 - Simple webhook receiver (external → topic):",
        "{",
        "  \"enabled\": true,",
        "  \"request\": {",
        "    \"data\": {",
        "      \"target\": \"topic\",",
        "      \"topic\": \"webhooks/{{device}}/data\",",
        "      \"payload\": \"{{payload}}\",",
        "      \"payload_function\": \"\"",
        "    }",
        "  }",
        "}",
        "",
        "SPECIAL FIELDS:",
        "",
        "- handle_connectivity: When true, the resource automatically manages device connection state",
        "- device_id_resolver: Function to extract device ID from incoming request payload",
        "  Example: If the function 'get_device_id' returns the device identifier from the request",
        "",
        "TEMPLATE VARIABLES:",
        "- {{device}}: Device identifier",
        "- {{payload}}: Incoming request payload",
        "- {{payload.field}}: Access specific fields from payload with defaults",
        "  Example: {{payload.port=85}} uses 85 if port is not in payload",
        "- {{property.name}}: Access device properties",
        "- payload_function: Optional JavaScript function to transform the payload",
        "",
        "URL STRUCTURE:",
        "Once created, the API resource will be available at:",
        "https://api.thinger.io/v3/users/{user}/devices/{device}/resources/{resource_id}",
      ].join("\n"),
      inputSchema: {
        product: z.string().min(1).describe("ID of the existing Thinger.io Product"),
        resource: z.string().min(1).describe("ID of the API Resource to create or update"),
        config: apiResourceItemSchema.describe(
          "API Resource configuration with request and optional response handlers"
        )
      }
    },
    async ({ product, resource, config }) => {
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


  server.registerTool(
    "Create-or-Update-Thinger-Product-Autoprovision-Tool",
    {
      title: "Create or Update Thinger.io Product Autoprovisioning Rule",
      description: [
        "Creates a new autoprovisioning rule or updates an existing rule in a Thinger.io Product by directly calling the Thinger.io API.",
        "Autoprovisioning rules automatically assign devices to this product when their device ID matches the specified pattern.",
        "This enables seamless device onboarding without manual configuration.",
        "",
        "PREREQUISITES:",
        "- The product MUST already exist in the Thinger.io account",
        "- The 'product' parameter MUST match the exact ID of an existing product",
        "",
        "BEHAVIOR:",
        "- If 'autoprovision' matches an existing rule ID → Updates that rule",
        "- If 'autoprovision' is a new ID → Creates a new autoprovisioning rule",
        "",
        "CONFIG STRUCTURE:",
        "The 'config' parameter must be an object containing:",
        "- config: object (required) - Matching configuration",
        "  - mode: 'pattern' (only 'pattern' mode is currently supported)",
        "  - pattern: string - Regular expression to match against device IDs",
        "- enabled: boolean (required) - Enable/disable this autoprovisioning rule",
        "",
        "PATTERN MATCHING (REGEX):",
        "The pattern field accepts full regular expressions for flexible device matching.",
        "",
        "Common regex patterns:",
        "- 'sensor-.*': Matches 'sensor-001', 'sensor-temp', 'sensor-madrid'",
        "- 'test-.*': Matches any device starting with 'test-'",
        "- 'device-[0-9]{2}': Matches 'device-01', 'device-99' (exactly 2 digits)",
        "- 'madrid-(temp|hum)-sensor': Matches 'madrid-temp-sensor' OR 'madrid-hum-sensor'",
        "- 'lora-[0-9A-F]{16}': Matches LoRaWAN DevEUI (16 hex characters)",
        "- '^dev-[A-Z]{3}-[0-9]{4}$': Matches exactly 'dev-XXX-1234' format",
        "- 'gateway-[0-9a-f]{6}': Matches 'gateway-' followed by 6 hex digits (lowercase)",
        "",
        "Regex special characters:",
        "- . (dot): Matches any single character",
        "- .* (dot star): Matches any sequence of characters (zero or more)",
        "- .+ (dot plus): Matches any sequence of characters (one or more)",
        "- [0-9]: Matches any digit",
        "- [A-F]: Matches uppercase letters A through F",
        "- [a-z]: Matches lowercase letters",
        "- {n}: Matches exactly n repetitions",
        "- {n,m}: Matches between n and m repetitions",
        "- ^: Start of string anchor",
        "- $: End of string anchor",
        "- |: OR operator",
        "- (): Grouping",
        "",
        "COMPLETE AUTOPROVISION EXAMPLES:",
        "",
        "Example 1 - Production sensors in Madrid:",
        "{",
        "  \"config\": {",
        "    \"mode\": \"pattern\",",
        "    \"pattern\": \"madrid-sensor-.*\"",
        "  },",
        "  \"enabled\": true",
        "}",
        "",
        "Example 2 - LoRaWAN devices by DevEUI pattern (16 hex chars):",
        "{",
        "  \"config\": {",
        "    \"mode\": \"pattern\",",
        "    \"pattern\": \"lora-[0-9A-F]{16}\"",
        "  },",
        "  \"enabled\": true",
        "}",
        "",
        "Example 3 - Test devices with specific numbering (disabled):",
        "{",
        "  \"config\": {",
        "    \"mode\": \"pattern\",",
        "    \"pattern\": \"test-device-[0-9]{3}\"",
        "  },",
        "  \"enabled\": false",
        "}",
        "",
        "Example 4 - Devices with MAC address suffix:",
        "{",
        "  \"config\": {",
        "    \"mode\": \"pattern\",",
        "    \"pattern\": \"sensor-[0-9A-F]{6}$\"",
        "  },",
        "  \"enabled\": true",
        "}",
        "",
        "Example 5 - Multiple device types with OR operator:",
        "{",
        "  \"config\": {",
        "    \"mode\": \"pattern\",",
        "    \"pattern\": \"(sensor|gateway|actuator)-.*\"",
        "  },",
        "  \"enabled\": true",
        "}",
        "",
        "USE CASES:",
        "- Automatic assignment of new devices to a product based on naming conventions",
        "- Separate test and production devices using different patterns",
        "- Geographic device organization (e.g., 'madrid-.*', 'barcelona-.*')",
        "- Device type categorization with strict format validation",
        "- LoRaWAN/IoT devices with EUI or MAC-based identifiers",
        "",
        "BEST PRACTICES:",
        "- Use anchors (^ and $) to ensure exact matching when needed",
        "- Test your regex patterns before deploying to production",
        "- Use specific patterns to avoid unintended matches",
        "- Avoid overlapping patterns between different products",
        "- Use 'enabled: false' to temporarily disable rules during testing",
        "- Document your naming convention for team consistency",
        "",
        "ID NAMING:",
        "The 'autoprovision' parameter (rule ID) should be descriptive and unique:",
        "- Good: 'madrid_production_sensors', 'lorawan_devices', 'test_gateways'",
        "- Avoid: 'rule1', 'temp', 'x'",
      ].join("\n"),
      inputSchema: {
        product: z.string().min(1).describe("ID of the existing Thinger.io Product"),
        autoprovision: z.string().min(1).describe("ID of the Autoprovisioning Rule to create or update"),
        config: autoprovisionItemSchema.describe(
          "Autoprovisioning rule configuration with regex pattern matching and enabled flag"
        )
      }
    },
    async ({ product, autoprovision, config }) => {
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

  server.registerTool(
    "Create-Thinger-Product-Tool",
    {
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
    },
    async ({ name, description }) => {
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

  server.registerTool(
    "Create-or-Update-Thinger-Product-Code-Tool",
    {
      title: "Create or Update Thinger.io Product Code",
      description: [
        "Creates or updates the JavaScript code block for a Thinger.io Product by directly calling the Thinger.io API.",
        "The code block allows defining custom functions that can be referenced throughout the product configuration",
        "(properties, buckets, flows, API resources) for data transformation, validation, and business logic.",
        "",
        "PREREQUISITES:",
        "- The product MUST already exist in the Thinger.io account",
        "- The 'product' parameter MUST match the exact ID of an existing product",
        "",
        "CONFIG STRUCTURE:",
        "The 'config' parameter must be an object containing:",
        "- code: string (required) - JavaScript code with function definitions",
        "- environment: 'javascript' (required) - Execution environment",
        "- storage: string (optional) - Storage configuration",
        "- version: string (optional) - Code version identifier",
        "",
        "COMMON USE CASES:",
        "",
        "1. DEVICE ID RESOLVER - Extract device ID from requests:",
        "Used in API resources with 'device_id_resolver' field",
        "",
        "function get_device_id({ device, headers, payload }) {",
        "  // Try multiple sources for device identification",
        "  if (device?.id) return device.id;",
        "  if (headers?.['x-device-id']) return headers['x-device-id'];",
        "  if (payload?.deviceId) return payload.deviceId;",
        "  if (payload?.dev_eui) return payload.dev_eui;",
        "  return 'unknown_device';",
        "}",
        "",
        "2. PAYLOAD TRANSFORMATION - Transform data between components:",
        "Used in properties, buckets, flows, API resources with 'payload_function'",
        "",
        "function normalize_payload(input) {",
        "  try {",
        "    const obj = typeof input === 'string' ? JSON.parse(input) : input;",
        "    return JSON.stringify({",
        "      timestamp: Date.now(),",
        "      data: obj?.data ?? obj,",
        "      source: 'normalized'",
        "    });",
        "  } catch (error) {",
        "    return JSON.stringify({",
        "      timestamp: Date.now(),",
        "      data: input,",
        "      error: 'parse_failed'",
        "    });",
        "  }",
        "}",
        "",
        "3. DATA VALIDATION - Validate and filter incoming data:",
        "",
        "function validate_sensor_data(payload) {",
        "  const data = typeof payload === 'string' ? JSON.parse(payload) : payload;",
        "  ",
        "  // Validate required fields",
        "  if (!data.temperature || !data.humidity) {",
        "    throw new Error('Missing required sensor fields');",
        "  }",
        "  ",
        "  // Validate ranges",
        "  if (data.temperature < -40 || data.temperature > 85) {",
        "    throw new Error('Temperature out of range');",
        "  }",
        "  ",
        "  return JSON.stringify(data);",
        "}",
        "",
        "4. LORAWAN DECODER - Decode LoRaWAN payloads:",
        "",
        "function decode_lorawan(payload) {",
        "  const bytes = Buffer.from(payload, 'hex');",
        "  ",
        "  // Example: decode temperature and humidity from 4-byte payload",
        "  const temperature = (bytes[0] << 8 | bytes[1]) / 100;",
        "  const humidity = (bytes[2] << 8 | bytes[3]) / 100;",
        "  ",
        "  return JSON.stringify({ temperature, humidity });",
        "}",
        "",
        "5. PRIORITY SELECTOR - Calculate dynamic priorities:",
        "",
        "function calculate_priority({ payload }) {",
        "  const data = typeof payload === 'string' ? JSON.parse(payload) : payload;",
        "  ",
        "  // High priority for alerts",
        "  if (data.alert || data.alarm) return 5;",
        "  ",
        "  // Medium priority for warnings",
        "  if (data.warning) return 3;",
        "  ",
        "  // Low priority for normal data",
        "  return 1;",
        "}",
        "",
        "6. DATA ENRICHMENT - Add metadata to payloads:",
        "",
        "function enrich_payload({ payload, device, properties }) {",
        "  const data = typeof payload === 'string' ? JSON.parse(payload) : payload;",
        "  ",
        "  return JSON.stringify({",
        "    ...data,",
        "    device_id: device?.id,",
        "    location: properties?.location,",
        "    firmware: properties?.firmware_version,",
        "    enriched_at: Date.now()",
        "  });",
        "}",
        "",
        "COMPLETE EXAMPLE CONFIG:",
        "",
        "{",
        "  \"code\": \"function get_device_id({ device, headers, payload }) {\\n  return device?.id || headers?.['x-device-id'] || 'unknown';\\n}\\n\\nfunction normalize_payload(input) {\\n  try {\\n    const obj = typeof input === 'string' ? JSON.parse(input) : input;\\n    return JSON.stringify({ timestamp: Date.now(), data: obj?.data ?? obj });\\n  } catch (e) {\\n    return JSON.stringify({ timestamp: Date.now(), data: input, error: 'parse_failed' });\\n  }\\n}\",",
        "  \"environment\": \"javascript\",",
        "  \"storage\": \"\",",
        "  \"version\": \"1.0\"",
        "}",
        "",
        "FUNCTION CONTEXT:",
        "Functions receive different context objects depending on where they're used:",
        "- device_id_resolver: { device, headers, payload }",
        "- payload_function: { payload, device, properties, headers }",
        "",
        "BEST PRACTICES:",
        "- Always handle errors gracefully with try-catch blocks",
        "- Validate input types before processing",
        "- Return JSON strings when expected by the configuration",
        "- Document complex logic with comments",
        "- Use descriptive function names that indicate their purpose",
        "- Test functions with sample data before deploying",
        "",
        "TIPS:",
        "- Use \\n for newlines in the code string",
        "- Escape quotes inside strings with \\\"",
        "- Keep functions focused on a single responsibility",
        "- Consider performance for functions called frequently",
      ].join("\n"),
      inputSchema: {
        product: z.string().min(1).describe("ID of the existing Thinger.io Product"),
        config: z.object({
          code: z.string().describe("JavaScript code with function definitions"),
          environment: z.literal("javascript").default("javascript").describe("Execution environment"),
          storage: z.string().optional().default("").describe("Storage configuration"),
          version: z.string().optional().default("1.0").describe("Code version identifier"),
        }).describe("Code configuration object with JavaScript functions")
      }
    },
    async ({ product, config }) => {
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
