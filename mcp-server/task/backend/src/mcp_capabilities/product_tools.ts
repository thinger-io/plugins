import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { ProductsApi, ProductCreateRequest, ApiException } from '@thinger-io/thinger-node';
import { Log } from '../lib/log.js';
import {
  autoProvisionSchema,
  apiResourceItemSchema,
  flowsItemSchema,
  bucketItemSchema,
  propertyItemSchema,
  profileSchema
} from '../schemas.js';


export function registerProductTools(opts: {
  server: McpServer;
  productsApi: ProductsApi;
}) {
  const { server, productsApi} = opts;


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
    "Build-Product-Properties-Tool",
    {
      title: "Build Product Properties (for Thinger.io profile.properties)",
      description: [
        "This tool builds ONLY the JSON fragment for 'profile.properties' in a Thinger.io Product resource.",
        "Product properties are key-value resources that can be pre-populated (default) and/or fed from a data source.",
        "Each property will be created/inherited for every device that matches the product template.",
        "The result MUST be pasted under 'profile.properties'.",
        "",
        "WHAT TO SEND (INPUT ARGUMENT):",
        "- Provide `properties` as an ARRAY of items. Each item MUST include:",
        "  {",
        "    \"id\": string,                       // unique property id (becomes the object key)",
        "    \"enabled\"?: boolean,                // default true",
        "    \"default\"?: object,                 // optional initial value (free-form JSON)",
        "    \"data\": one of:",
        "      - { \"source\": \"event\",  \"event\": <enum>,  \"payload_type\": \"source_payload\", \"payload\"?: string, \"payload_function\"?: string }",
        "      - { \"source\": \"topic\",  \"topic\": string,  \"payload_type\": \"source_payload\", \"payload\"?: string, \"payload_function\"?: string }",
        "      - { \"target\": \"resource_stream\", \"resource_stream\": string, \"payload\"?: string, \"payload_function\"?: string, \"payload_type\"?: string }",
        "      - { \"source\": \"resource\", \"resource\": string, \"update\"?: \"events\", \"payload\"?: string, \"payload_function\"?: string, \"payload_type\"?: string }",
        "  }",
        "",
        "STRICT RULES:",
        "- Input MUST be an array: { \"properties\": [ {id, ...}, ... ] }.",
        "- Each 'id' MUST be unique in the array.",
        "- The tool OUTPUT is a SINGLE OBJECT indexed by each 'id'.",
        "- Escape JSON strings properly (e.g., newlines as \\n, quotes as \\\" ).",
        "",
        "EXAMPLE INPUT (send to this tool):",
        "{",
        "  \"properties\": [",
        "    {",
        "      \"id\": \"model\",",
        "      \"default\": { \"value\": \"dragino-lgt92\" },",
        "      \"enabled\": true,",
        "      \"data\": {",
        "        \"source\": \"topic\",",
        "        \"topic\": \"devices/{{device}}/props/model\",",
        "        \"payload\": \"{{payload}}\",",
        "        \"payload_function\": \"\",",
        "        \"payload_type\": \"source_payload\"",
        "      }",
        "    },",
        "    {",
        "      \"id\": \"last_uplink\",",
        "      \"enabled\": true,",
        "      \"data\": {",
        "        \"source\": \"event\",",
        "        \"event\": \"device_property_update\",",
        "        \"payload\": \"{{payload}}\",",
        "        \"payload_function\": \"\",",
        "        \"payload_type\": \"source_payload\"",
        "      }",
        "    },",
        "    {",
        "      \"id\": \"streamed_value\",",
        "      \"enabled\": true,",
        "      \"data\": {",
        "        \"target\": \"resource_stream\",",
        "        \"resource_stream\": \"telemetry\",",
        "        \"payload\": \"{{payload}}\"",
        "      }",
        "    },",
        "    {",
        "      \"id\": \"resource_events\",",
        "      \"enabled\": true,",
        "      \"data\": {",
        "        \"source\": \"resource\",",
        "        \"resource\": \"downlink\",",
        "        \"update\": \"events\",",
        "        \"payload\": \"{{payload}}\"",
        "      }",
        "    }",
        "  ]",
        "}",
        "",
        "EXAMPLE OUTPUT (paste under profile.properties):",
        "{",
        "  \"model\": {",
        "    \"enabled\": true,",
        "    \"default\": { \"value\": \"dragino-lgt92\" },",
        "    \"data\": {",
        "      \"source\": \"topic\",",
        "      \"topic\": \"devices/{{device}}/props/model\",",
        "      \"payload\": \"{{payload}}\",",
        "      \"payload_function\": \"\",",
        "      \"payload_type\": \"source_payload\"",
        "    }",
        "  },",
        "  \"last_uplink\": {",
        "    \"enabled\": true,",
        "    \"data\": {",
        "      \"source\": \"event\",",
        "      \"event\": \"device_property_update\",",
        "      \"payload\": \"{{payload}}\",",
        "      \"payload_function\": \"\",",
        "      \"payload_type\": \"source_payload\"",
        "    }",
        "  },",
        "  \"streamed_value\": {",
        "    \"enabled\": true,",
        "    \"data\": {",
        "      \"target\": \"resource_stream\",",
        "      \"resource_stream\": \"telemetry\",",
        "      \"payload\": \"{{payload}}\"",
        "    }",
        "  },",
        "  \"resource_events\": {",
        "    \"enabled\": true,",
        "    \"data\": {",
        "      \"source\": \"resource\",",
        "      \"resource\": \"downlink\",",
        "      \"update\": \"events\",",
        "      \"payload\": \"{{payload}}\"",
        "    }",
        "  }",
        "}",
        "",
        "HOW TO USE:",
        "- First call this tool to build the 'profile.properties' JSON fragment.",
        "- Then paste the returned object under 'profile.properties' in your 'Create Product' call.",
      ].join("\\n"),
      inputSchema: {
        properties: z
          .array(propertyItemSchema)
          .min(1, "Provide at least one property item")
          .describe(
            "Array of PROPERTY ITEMS. Each item has { id, ...fields }. The tool returns an OBJECT keyed by id."
          ),
      },
    },
    async ({ properties }) => {
      try {
        // Validate each item
        for (const p of properties) {
          propertyItemSchema.parse(p);
        }

        // Build the output object keyed by id
        const out: Record<string, Omit<z.infer<typeof propertyItemSchema>, "id">> = {};
        for (const { id, ...rest } of properties) {
          if (out[id]) {
            throw new Error(`Duplicated property id '${id}'. Each 'id' must be unique.`);
          }
          out[id] = rest;
        }

        // Return the fragment to paste under profile.properties
        Log.log('Successfully built profile.properties fragment');
        return {
          content: [{ type: "text", text: JSON.stringify(out, null, 2) }],
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
    "Build-Product-Buckets-Tool",
    {
      title: "Build Product Buckets (for Thinger.io profile.buckets)",
      description: [
        "This tool builds ONLY the JSON fragment for 'profile.buckets' in a Thinger.io Product resource.",
        "A bucket defines where and how device data is persisted (backend, retention policy, tags) and what source feeds it.",
        "Each bucket will be created/inherited for every device that matches the product template.",
        "The result MUST be pasted under 'profile.buckets'.",
        "",
        "WHAT TO SEND (INPUT ARGUMENT):",
        "- Provide `buckets` as an ARRAY of items. Each item MUST include:",
        "  {",
        "    \"id\": string,                 // unique bucket id (becomes the object key)",
        "    \"enabled\"?: boolean,         // default true",
        "    \"backend\"?: \"mongodb\" | \"influxdb\" // default \"mongodb\"",
        "    \"retention\": { \"period\": number, \"unit\": \"hours\"|\"days\"|\"weeks\"|\"months\"|\"years\" },",
        "    \"tags\"?: string[],",
        "    \"data\": one of:",
        "      - { \"source\": \"event\", \"event\": <enum>, \"payload_type\": \"source_payload\", \"payload\"?: string, \"payload_function\"?: string }",
        "      - { \"source\": \"topic\", \"topic\": string, \"payload_type\": \"source_payload\", \"payload\"?: string, \"payload_function\"?: string }",
        "  }",
        "",
        "STRICT RULES:",
        "- Input MUST be an array: { \"buckets\": [ {id, ...}, ... ] }.",
        "- Each 'id' MUST be unique in the array.",
        "- The tool OUTPUT is a SINGLE OBJECT indexed by each 'id'.",
        "- Escape JSON strings properly (e.g., newlines as \\n, quotes as \\\" ).",
        "",
        "EXAMPLE INPUT (send to this tool):",
        "{",
        "  \"buckets\": [",
        "    {",
        "      \"id\": \"uplink_events\",",
        "      \"enabled\": true,",
        "      \"backend\": \"mongodb\",",
        "      \"retention\": { \"period\": 30, \"unit\": \"days\" },",
        "      \"tags\": [\"uplink\", \"debug\"],",
        "      \"data\": {",
        "        \"source\": \"event\",",
        "        \"event\": \"device_property_update\",",
        "        \"payload\": \"{{payload}}\",",
        "        \"payload_function\": \"\",",
        "        \"payload_type\": \"source_payload\"",
        "      }",
        "    },",
        "    {",
        "      \"id\": \"lora_topic\",",
        "      \"enabled\": true,",
        "      \"backend\": \"influxdb\",",
        "      \"retention\": { \"period\": 12, \"unit\": \"months\" },",
        "      \"data\": {",
        "        \"source\": \"topic\",",
        "        \"topic\": \"devices/{{device}}/uplink\",",
        "        \"payload\": \"{{payload}}\",",
        "        \"payload_function\": \"\",",
        "        \"payload_type\": \"source_payload\"",
        "      }",
        "    }",
        "  ]",
        "}",
        "",
        "EXAMPLE OUTPUT (paste under profile.buckets):",
        "{",
        "  \"uplink_events\": {",
        "    \"enabled\": true,",
        "    \"backend\": \"mongodb\",",
        "    \"retention\": { \"period\": 30, \"unit\": \"days\" },",
        "    \"tags\": [\"uplink\", \"debug\"],",
        "    \"data\": {",
        "      \"source\": \"event\",",
        "      \"event\": \"device_property_update\",",
        "      \"payload\": \"{{payload}}\",",
        "      \"payload_function\": \"\",",
        "      \"payload_type\": \"source_payload\"",
        "    }",
        "  },",
        "  \"lora_topic\": {",
        "    \"enabled\": true,",
        "    \"backend\": \"influxdb\",",
        "    \"retention\": { \"period\": 12, \"unit\": \"months\" },",
        "    \"data\": {",
        "      \"source\": \"topic\",",
        "      \"topic\": \"devices/{{device}}/uplink\",",
        "      \"payload\": \"{{payload}}\",",
        "      \"payload_function\": \"\",",
        "      \"payload_type\": \"source_payload\"",
        "    }",
        "  }",
        "}",
        "",
        "HOW TO USE:",
        "- First call this tool to build the 'profile.buckets' JSON fragment.",
        "- Then paste the returned object under 'profile.buckets' in your 'Create Product' call."
      ].join("\\n"),
      inputSchema: {
        buckets: z
          .array(bucketItemSchema)
          .min(1, "Provide at least one bucket")
          .describe("Array of BUCKET ITEMS. Each item has { id, ...fields }. The tool returns an OBJECT keyed by id."),
      },
    },
    async ({ buckets }) => {
      try {
        // Validate each item
        for (const b of buckets) {
          bucketItemSchema.parse(b);
        }

        // Build the output object keyed by id
        const out: Record<string, Omit<z.infer<typeof bucketItemSchema>, "id">> = {};
        for (const { id, ...rest } of buckets) {
          if (out[id]) {
            throw new Error(`Duplicated bucket id '${id}'. Each 'id' must be unique.`);
          }
          out[id] = rest;
        }

        Log.log('Successfully built profile.buckets fragment');
        return {
          content: [{ type: "text", text: JSON.stringify(out, null, 2) }],
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
    "Build-Product-Flows-Tool",
    {
      title: "Build Product Flows (for Thinger.io profile.flows)",
      description: [
        "This tool builds ONLY the JSON fragment for 'profile.flows' in a Thinger.io Product resource.",
        "Each flow is a pipeline with a data source (trigger) and a sink (destination) embeded in a product profile.",
        "Each pipeline will be inherited for every device that matches the product template.",
        "The result MUST be pasted under 'profile.flows'.",
        "",
        "WHAT TO SEND (INPUT ARGUMENT):",
        "- Provide `flows` as an ARRAY of items. Each item MUST include:",
        "  {",
        "    \"id\": string,                 // unique flow id (becomes the object key)",
        "    \"enabled\"?: boolean,         // default true",
        "    \"split_data\"?: boolean,      // default false",
        "    \"data\": {                    // source / trigger, discriminated by 'source'",
        "      \"source\": \"event\",",
        "      \"event\": one of: \"device_callback_call\" | \"device_property_create\" | \"device_property_update\" | \"device_resource_request_failed\" | \"device_state_change\" | \"device_stats_data\" | \"device_topic_subscribe\" | \"device_topic_unsubscribe\",",
        "      \"filter\"?: { \"property\": string },",
        "      \"payload\"?: string,",
        "      \"payload_function\"?: string,",
        "      \"payload_type\"?: string     // e.g. \"source_payload\"",
        "    },",
        "    \"sink\": {                     // destination, discriminated by 'target'",
        "      \"target\": \"resource\",",
        "      \"resource\": string,",
        "      \"payload\"?: string,",
        "      \"payload_function\"?: string,",
        "      \"payload_type\"?: string",
        "    }",
        "  }",
        "",
        "STRICT RULES:",
        "- Input MUST be an array: { \"flows\": [ {id, ...}, ... ] }.",
        "- Each 'id' MUST be unique in the array.",
        "- The tool OUTPUT is a SINGLE OBJECT indexed by each 'id'.",
        "- Escape JSON strings properly (e.g., newlines as \\n, quotes as \\\" ).",
        "",
        "EXAMPLE INPUT (send to this tool):",
        "{",
        "  \"flows\": [",
        "    {",
        "      \"id\": \"downlink_flow\",",
        "      \"enabled\": true,",
        "      \"split_data\": false,",
        "      \"data\": {",
        "        \"source\": \"event\",",
        "        \"event\": \"device_property_update\",",
        "        \"filter\": { \"property\": \"dragino_downlink_sender\" },",
        "        \"payload\": \"{{payload}}\",",
        "        \"payload_function\": \"\",",
        "        \"payload_type\": \"source_payload\"",
        "      },",
        "      \"sink\": {",
        "        \"target\": \"resource\",",
        "        \"resource\": \"downlink\",",
        "        \"payload\": \"{{payload}}\",",
        "        \"payload_function\": \"\",",
        "        \"payload_type\": \"source_payload\"",
        "      }",
        "    }",
        "  ]",
        "}",
        "",
        "EXAMPLE OUTPUT (paste under profile.flows):",
        "{",
        "  \"downlink_flow\": {",
        "    \"data\": {",
        "      \"source\": \"event\",",
        "      \"event\": \"device_property_update\",",
        "      \"filter\": { \"property\": \"dragino_downlink_sender\" },",
        "      \"payload\": \"{{payload}}\",",
        "      \"payload_function\": \"\",",
        "      \"payload_type\": \"source_payload\"",
        "    },",
        "    \"enabled\": true,",
        "    \"sink\": {",
        "      \"target\": \"resource\",",
        "      \"resource\": \"downlink\",",
        "      \"payload\": \"{{payload}}\",",
        "      \"payload_function\": \"\",",
        "      \"payload_type\": \"source_payload\"",
        "    },",
        "    \"split_data\": false",
        "  }",
        "}",
        "",
        "HOW TO USE:",
        "- First call this tool to build the 'profile.flows' JSON fragment.",
        "- Then paste the returned object under 'profile.flows' in your 'Create Product' call."
      ].join("\\n"),
      inputSchema: {
        flows: z.array(flowsItemSchema)
          .min(1, "Provide at least one flow")
          .describe("Array of FLOW ITEMS. Each item has { id, ...fields }. The tool returns an OBJECT keyed by id."),
      },
    },
    async ({ flows }) => {
      try {
        // Validate each item
        for (const f of flows) {
          flowsItemSchema.parse(f);
        }

        // Build the output object keyed by id
        const out: Record<string, Omit<z.infer<typeof flowsItemSchema>, "id">> = {};
        for (const { id, ...rest } of flows) {
          if (out[id]) {
            throw new Error(`Duplicated flow id '${id}'. Each 'id' must be unique.`);
          }
          out[id] = rest;
        }

        Log.log('Successfully built flows fragment:');
        return {
          content: [{ type: "text", text: JSON.stringify(out, null, 2) }],
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
    "Build-Product-API-Resources-Tool",
    {
      title: "Build Product API Resources (for Thinger.io profile.api)",
      description: [
        "This tool builds ONLY the JSON fragment for 'profile.api' in a Thinger.io Product resource.",
        "A resource is an endpoint definition that maps incoming requests to actions (endpoint calls, resource streams, plugin endpoints, etc).",
        "This API endpoint is opened in each device that matches the product template.",
        "WHAT TO SEND (INPUT ARGUMENT):",
        "- Provide `resources` as an ARRAY of items. Each item MUST include:",
        "  {",
        "    \"id\": string,                       // unique resource id (becomes the object key)",
        "    \"enabled\"?: boolean,",
        "    \"handle_connectivity\"?: boolean,",
        "    \"device_id_resolver\"?: string,",
        "    \"request\": {",
        "      \"data\": one of:",
        "        - { \"target\": \"endpoint_call\", \"endpoint\": string, \"payload\"?: string, \"payload_function\"?: string, \"payload_type\"?: string }",
        "        - { \"target\": \"resource_stream\", \"resource_stream\": string, \"payload\"?: string, \"payload_function\"?: string, \"payload_type\"?: string }",
        "        - { \"target\": \"plugin_endpoint\", \"plugin\": string, \"path\": string, \"payload\"?: string, \"payload_function\"?: string, \"payload_type\"?: string }",
        "        - { \"target\": string, ... } // generic fallback",
        "    },",
        "    \"response\"?: { \"data\"?: { ... } } // free-form passthrough",
        "  }",
        "",
        "STRICT RULES:",
        "- Input MUST be an array: { \"resources\": [ {id, ...}, ... ] }.",
        "- Each 'id' MUST be unique in the array.",
        "- The tool OUTPUT is a SINGLE OBJECT indexed by each 'id'.",
        "- Escape JSON strings properly (e.g., newlines as \\n, quotes as \\\" ).",
        "",
        "EXAMPLE INPUT (send to this tool):",
        "{",
        "  \"resources\": [",
        "    {",
        "      \"id\": \"downlink\",",
        "      \"enabled\": true,",
        "      \"handle_connectivity\": false,",
        "      \"request\": {",
        "        \"data\": {",
        "          \"target\": \"plugin_endpoint\",",
        "          \"plugin\": \"{{property.source}}\",",
        "          \"path\": \"/downlink\",",
        "          \"payload\": \"{\\n    \\\"data\\\"    : \\\"{{payload.data=\\\"\\\"}}\\\",\\n    \\\"port\\\"    :  {{payload.port=85}},\\n    \\\"priority\\\" :  {{payload.priority=3}},\\n    \\\"confirmed\\\" :  {{payload.confirmed=false}},\\n    \\\"uplink\\\"  :  {{property.uplink}} \\n}\",",
        "          \"payload_function\": \"\",",
        "          \"payload_type\": \"\"",
        "        }",
        "      },",
        "      \"response\": {",
        "        \"data\": {",
        "          \"payload\": \"{{payload}}\",",
        "          \"payload_function\": \"\",",
        "          \"payload_type\": \"source_payload\",",
        "          \"source\": \"request_response\"",
        "        }",
        "      }",
        "    },",
        "    {",
        "      \"id\": \"uplink\",",
        "      \"enabled\": true,",
        "      \"handle_connectivity\": true,",
        "      \"device_id_resolver\": \"get_id\",",
        "      \"request\": {",
        "        \"data\": {",
        "          \"target\": \"resource_stream\",",
        "          \"resource_stream\": \"uplink\",",
        "          \"payload\": \"{{payload}}\",",
        "          \"payload_function\": \"\",",
        "          \"payload_type\": \"source_payload\"",
        "        }",
        "      },",
        "      \"response\": { \"data\": {} }",
        "    }",
        "  ]",
        "}",
        "",
        "EXAMPLE OUTPUT (paste under profile.api):",
        "{",
        "  \"downlink\": {",
        "    \"enabled\": true,",
        "    \"handle_connectivity\": false,",
        "    \"request\": {",
        "      \"data\": {",
        "        \"path\": \"/downlink\",",
        "        \"payload\": \"{\\n    \\\"data\\\"    : \\\"{{payload.data=\\\"\\\"}}\\\",\\n    \\\"port\\\"    :  {{payload.port=85}},\\n    \\\"priority\\\" :  {{payload.priority=3}},\\n    \\\"confirmed\\\" :  {{payload.confirmed=false}},\\n    \\\"uplink\\\"  :  {{property.uplink}} \\n}\",",
        "        \"payload_function\": \"\",",
        "        \"payload_type\": \"\",",
        "        \"plugin\": \"{{property.source}}\",",
        "        \"target\": \"plugin_endpoint\"",
        "      }",
        "    },",
        "    \"response\": {",
        "      \"data\": {",
        "        \"payload\": \"{{payload}}\",",
        "        \"payload_function\": \"\",",
        "        \"payload_type\": \"source_payload\",",
        "        \"source\": \"request_response\"",
        "      }",
        "    }",
        "  },",
        "  \"uplink\": {",
        "    \"device_id_resolver\": \"get_id\",",
        "    \"enabled\": true,",
        "    \"handle_connectivity\": true,",
        "    \"request\": {",
        "      \"data\": {",
        "        \"payload\": \"{{payload}}\",",
        "        \"payload_function\": \"\",",
        "        \"payload_type\": \"source_payload\",",
        "        \"target\": \"resource_stream\"",
        "      }",
        "    },",
        "    \"response\": { \"data\": {} }",
        "  }",
        "}",
        "",
        "HOW TO USE:",
        "- First call this tool to build the 'profile.api' JSON fragment.",
        "- Then paste the returned object under 'profile.api' in your 'Create Product' call."
      ].join("\\n"),
      inputSchema: {
        resources: z
          .array(apiResourceItemSchema)
          .min(1, "Provide at least one API resource")
          .describe("Array of API resource ITEMS. Each item has { id, ...fields }. The tool returns an OBJECT keyed by id."),
      },
    },
    async ({ resources }) => {
      try {
        // Validate each item
        for (const r of resources) {
          apiResourceItemSchema.parse(r);
        }

        // Build the output object keyed by id
        const out: Record<string, Omit<z.infer<typeof apiResourceItemSchema>, "id">> = {};
        for (const { id, ...rest } of resources) {
          if (out[id]) {
            throw new Error(`Duplicated resource id '${id}'. Each 'id' must be unique.`);
          }
          out[id] = rest;
        }

        Log.log('Successfully built profile.api fragment');
        return {
          content: [{ type: "text", text: JSON.stringify(out, null, 2) }],
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
    "Build-Product-Autoprovisions-Tool",
    {
      title: "Build Product Autoprovisions (for Thinger.io profile.autoprovisions)",
      description: [
        "Tool for LLMs to construct the 'profile.autoprovisions' object required by Thinger.io.",
        "It returns ONLY the JSON fragment for 'profile.autoprovisions', not the whole product.",
        "",
        "Usage guidance for the LLM:",
        "1) If you want a product with autoprovisioning, FIRST call this tool to generate the JSON.",
        "2) Copy the resulting JSON and paste it under 'profile.autoprovisions' when calling 'Create Product'.",
        "3) Each entry needs an 'id' (the autoprovisioning key), a 'pattern' (match rule), and an 'enabled' flag.",
        "4) Only 'mode: pattern' is supported here.",
        "",
        "Example input (to this tool):",
        "{",
        "  \"rules\": [",
        "    { \"id\": \"Sensor Madrid 01\", \"pattern\": \"mad-*\", \"enabled\": true },",
        "    { \"id\": \"Test Devices\", \"pattern\": \"test-*\", \"enabled\": false }",
        "  ]",
        "}",
        "",
        "Example output (to paste into profile.autoprovisions):",
        "{",
        "  \"sensor_madrid_01\": {",
        "    \"config\": { \"mode\": \"pattern\", \"pattern\": \"mad-*\" },",
        "    \"enabled\": true",
        "  },",
        "  \"test_devices\": {",
        "    \"config\": { \"mode\": \"pattern\", \"pattern\": \"test-*\" },",
        "    \"enabled\": false",
        "  }",
        "}"
      ].join("\n"),
      inputSchema: {
        rules: z.array(
          z.object({
            id: z.string().describe("Unique autoprovisioning ID (object key)"),
            pattern: z.string().describe("Matching expression for devices (pattern mode)"),
            enabled: z.boolean().default(true).describe("Whether this autoprovision rule is enabled"),
          })
        )
          .min(1, "Provide at least one rule")
          .describe("List of autoprovisioning rules to build the profile.autoprovisions JSON object"),
      },
    },
    async ({ rules }) => {
      try {
        // Construye el objeto record usando el schema compacto
        const built: Record<string, unknown> = {};
        for (const r of rules) {
          const cleanId = r.id // ID sanitization
            .toLowerCase()
            .replace(/\s+/g, "_");

          if (!cleanId) {
            throw new Error(`Invalid autoprovisioning id: "${r.id}" became empty after sanitization`);
          }

          built[cleanId] = {
            config: { mode: "pattern", pattern: r.pattern },
            enabled: r.enabled ?? true,
          };
        }

        // Validation
        const parsed = autoProvisionSchema.parse(built);

        Log.info('Successfully built profile.autoprovisions fragment');
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(parsed, null, 2),
            },
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
    "Create-Product-Tool",
    {
      title: "Create Thinger.io Product",
      description: [
        "Create a new Thinger.io product with an optional 'profile' configuration.",
        "",
        "HOW TO COMPOSE 'profile' (LLM WORKFLOW):",
        "1) When a profile section is complex (e.g., autoprovisions, api, flows, buckets, endpoints), FIRST use its dedicated builder tool to generate a JSON fragment.",
        "2) COPY the returned fragment as-is.",
        "3) PASTE each fragment under its corresponding key inside 'profile' (e.g., paste API JSON under 'profile.api', flows under 'profile.flows', etc.).",
        "4) Ensure the final 'profile' is valid JSON (no trailing commas, correct braces).",
        "",
        "SUPPORTED PROFILE KEYS (non-exhaustive):",
        "- profile.properties      → Use 'Build Product Properties Tool' or provide a plain key/value object.",
        "- profile.api             → Use 'Build Product API Resources Tool' (resources indexed by id).",
        "- profile.flows           → Use 'Build Product Flows Tool' (flows indexed by id).",
        "- profile.buckets         → Use 'Build Product Buckets Tool' (buckets indexed by id).",
        "- profile.autoprovisions  → Use its builder (record indexed by autoprovision id).",
        "- profile.endpoints       → If you manage custom endpoints, paste the built fragment here.",
        "",
        "ABOUT 'code' (IMPORTANT):",
        "- You can attach a code snippet that runs in the product context and can define functions referenced",
        "  across your profile JSON (e.g., 'device_id_resolver', 'payload_function', data transforms, validators).",
        "- Set the 'code' argument in this tool; it will be embedded under profile.code with environment='javascript'.",
        "- Use this to centralize logic such as ID resolution, payload mapping, enrichment, filtering, etc.",
        "",
        "EXAMPLE: Defining helper functions in 'code' used by API/flows/buckets",
        "-------------------------------------------",
        "const get_id = ({ device, headers, payload }) => {",
        "  // Example device_id_resolver for profile.api resources",
        "  return device?.id || headers?.['x-device-id'] || 'unknown_device';",
        "};",
        "",
        "const normalize_payload = (input) => {",
        "  // Example payload_function used by API/flows/buckets to shape data",
        "  try {",
        "    const obj = typeof input === 'string' ? JSON.parse(input) : input;",
        "    return JSON.stringify({",
        "      ts: Date.now(),",
        "      data: obj?.data ?? obj,",
        "    });",
        "  } catch (_) {",
        "    return JSON.stringify({ ts: Date.now(), data: input });",
        "  }",
        "};",
        "",
        "const select_downlink_priority = ({ payload }) => {",
        "  // Another example function referenced as payload_function in profile.api or flows",
        "  const p = (payload && payload.priority) ?? 3;",
        "  return p >= 0 && p <= 5 ? p : 3;",
        "};",
        "-------------------------------------------",
        "",
        "EXAMPLE: Building fragments with helper tools and composing the final profile",
        "1) Call 'Build Product API Resources Tool' with:",
        "{",
        "  \"resources\": [",
        "    {",
        "      \"id\": \"downlink\",",
        "      \"enabled\": true,",
        "      \"handle_connectivity\": false,",
        "      \"request\": {",
        "        \"data\": {",
        "          \"target\": \"plugin_endpoint\",",
        "          \"plugin\": \"{{property.source}}\",",
        "          \"path\": \"/downlink\",",
        "          \"payload\": \"{\\n  \\\"priority\\\": {{payload.priority=3}},\\n  \\\"data\\\": {{payload.data}}\\n}\",",
        "          \"payload_function\": \"normalize_payload\",",
        "          \"payload_type\": \"\"",
        "        }",
        "      },",
        "      \"response\": { \"data\": { \"source\": \"request_response\", \"payload\": \"{{payload}}\", \"payload_type\": \"source_payload\" } }",
        "    }",
        "  ]",
        "}",
        "→ Paste the returned object under 'profile.api'.",
        "",
        "2) Call 'Build Product Flows Tool' with:",
        "{",
        "  \"flows\": [",
        "    {",
        "      \"id\": \"downlink_flow\",",
        "      \"enabled\": true,",
        "      \"split_data\": false,",
        "      \"data\": {",
        "        \"source\": \"event\",",
        "        \"event\": \"device_property_update\",",
        "        \"filter\": { \"property\": \"dragino_downlink_sender\" },",
        "        \"payload\": \"{{payload}}\",",
        "        \"payload_function\": \"normalize_payload\",",
        "        \"payload_type\": \"source_payload\"",
        "      },",
        "      \"sink\": {",
        "        \"target\": \"resource\",",
        "        \"resource\": \"downlink\",",
        "        \"payload\": \"{{payload}}\",",
        "        \"payload_function\": \"select_downlink_priority\",",
        "        \"payload_type\": \"source_payload\"",
        "      }",
        "    }",
        "  ]",
        "}",
        "→ Paste the returned object under 'profile.flows'.",
        "",
        "3) (Optional) Call 'Build Product Buckets Tool' and/or 'Build Product Properties Tool' and paste them under",
        "   'profile.buckets' / 'profile.properties'.",
        "",
        "FINAL EXAMPLE (call to this tool):",
        "{",
        "  \"name\": \"City Sensors\",",
        "  \"description\": \"Product for field sensors.\",",
        "  \"code\": \"function get_id({device, headers, payload}) { return device?.id || headers?.['x-device-id'] || 'unknown_device'; }\\nfunction normalize_payload(input) { try { const obj = typeof input === 'string' ? JSON.parse(input) : input; return JSON.stringify({ ts: Date.now(), data: obj?.data ?? obj, }); } catch (_) { return JSON.stringify({ ts: Date.now(), data: input }); } }\\nfunction select_downlink_priority({ payload }) { const p = (payload && payload.priority) ?? 3; return p >= 0 && p <= 5 ? p : 3; }\",",
        "  \"profile\": {",
        "    \"properties\": { \"fw\": \"1.0.0\", \"owner\": \"ops\" },",
        "    \"api\": { /* paste output from Build Product API Resources Tool */ },",
        "    \"flows\": { /* paste output from Build Product Flows Tool */ },",
        "    \"buckets\": { /* paste output from Build Product Buckets Tool */ },",
        "    \"autoprovisions\": {",
        "      \"sensor_madrid_01\": {",
        "        \"config\": { \"mode\": \"pattern\", \"pattern\": \"mad-*\" },",
        "        \"enabled\": true",
        "      }",
        "    }",
        "  }",
        "}",
        "",
        "Notes:",
        "- You can repeat the same approach for any other profile section (properties, buckets, flows, endpoints, api) using their own builder tools if available.",
        "- This tool validates 'profile.autoprovisions' locally before calling Thinger.io."
      ].join("\n"),
      inputSchema: {
        name: z.string().describe("Name of the new product, with less than 32 characters"),
        description: z.string().optional().describe("Description of the new product, with less than 255 characters"),
        profile: profileSchema.optional()
          .describe("Final 'profile' object. Compose it by pasting JSON fragments from builder tools under their keys."),
        code_snippet: z.string().optional().describe("Optional code snippet for Thinger.io Product script"),
      },
    },
    async ({ name, description, profile, code_snippet }) => {
      try {
        // Add code Snippet to profile if provided
        if (code_snippet) {
          profile = profile ?? {};
          profile.code = {
            code: code_snippet,
            environment: "javascript",
            storage: "",
            version: "1.0"
          };
        }

        const request: ProductCreateRequest = {
          name,
          product: name
            .toLowerCase()
            .replace(/\s+/g, "_")
            .replace(/-/g, "_")
            .substring(0, 32),
          description,
          enabled: true,
          profile,
        };

        const response = await productsApi.create(process.env.THINGER_USER ?? "", request);

        Log.info(`Successfully Created Thinger.io product '${name}'`);
        return {
          content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
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
