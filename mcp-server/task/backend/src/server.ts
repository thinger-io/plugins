import express, {Request, Response, NextFunction, RequestHandler} from 'express';
import cors from 'cors';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';
import { ProductsApi, ApiException, ProductCreateRequest} from '@thinger-io/thinger-node'

import { Log } from "./lib/log.js";
import {thingerApiConfig} from "./lib/api.js";
import {FrontEndRouter} from "./frontend/routes.js";
import { autoProvisionSchema, apiResourceItemSchema, flowsItemSchema, bucketItemSchema, profileSchema } from "./schemas.js";

// Initialize thinger API
const productsApi = new ProductsApi(thingerApiConfig);

const PORT = Number(process.env.PORT ?? 3000);
const ALLOWED_ORIGINS = (process.env.CORS_ORIGINS ?? '*')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

const server = new McpServer({
  name: 'thinger-MCP-server',
  version: '1.0.0',
});

const SUPPORTED_PROTOCOL_VERSIONS = ['2025-03-26', '2025-06-18'];                  // MCP Protocol spec
const REQUIRED_CLIENT_CAPABILITIES: string[] = [];                                        // Client capabilities
const REQUEST_TIMEOUT_MS = Number(process.env.MCP_REQUEST_TIMEOUT_MS ?? 10000);   // Response timeout (default: 10s)

// HELPERS
function jsonRpcError(
  id: string | number | null,
  code: number,
  message: string,
  data?: Record<string, unknown>
) {
  Log.error("JSON-RPC Error:", { id, code, message, data });
  return data
    ? { jsonrpc: '2.0', id, error: { code, message, data } }
    : { jsonrpc: '2.0', id, error: { code, message } };
}

function preflightInitializeGuard(body: any, res: Response): boolean {
  // 'Initialize' requests MUST NOT be sent in a batch request.
  if (Array.isArray(body)) {
    res.status(200).json(jsonRpcError(null, -32602, 'Batches are not allowed before initialization'));
    return false;
  }

  if (!body || body.jsonrpc !== '2.0' || typeof body.method !== 'string') {
    // Invalid JSON-RPC
    res.status(200).json(jsonRpcError(null, -32600, 'Invalid JSON-RPC 2.0 request'));
    return false;
  }

  // We only care about 'initialize' requests
  if (body.method !== 'initialize') return true;

  const id = body.id ?? null;
  const params = body.params ?? {};

  // Protocol version checks:
  const requested = params.protocolVersion;
  if (!requested || typeof requested !== 'string') {
    res.status(200).json(jsonRpcError(id, -32602, 'Missing or invalid protocolVersion in initialize'));
    return false;
  }
  if (!SUPPORTED_PROTOCOL_VERSIONS.includes(requested)) {
    res
      .status(200)
      .json(
        jsonRpcError(id, -32602, 'Unsupported protocol version', {
          supported: SUPPORTED_PROTOCOL_VERSIONS,
          requested
        })
      );
    return false;
  }

  const caps = params.capabilities ?? {};
  const missing = REQUIRED_CLIENT_CAPABILITIES.filter((k) => !(k in caps));
  if (missing.length > 0) {
    res
      .status(200)
      .json(
        jsonRpcError(id, -32602, 'Missing required client capabilities', {
          required: REQUIRED_CLIENT_CAPABILITIES,
          received: Object.keys(caps)
        })
      );
    return false;
  }

  return true;
}

// SERVER CAPABILITIES

server.registerTool(
  "Build Product Buckets Tool",
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

      return {
        content: [{ type: "text", text: JSON.stringify(out, null, 2) }],
      };
    } catch (err: any) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Invalid BUCKETS payload: ${err?.message ?? String(err)}`,
          },
        ],
      };
    }
  }
);

server.registerTool(
  "Build Product Flows Tool",
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

      return {
        content: [{ type: "text", text: JSON.stringify(out, null, 2) }],
      };
    } catch (err: any) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Invalid FLOWS payload: ${err?.message ?? String(err)}`,
          },
        ],
      };
    }
  }
);


server.registerTool(
  "Build Product API Resources Tool",
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

      return {
        content: [{ type: "text", text: JSON.stringify(out, null, 2) }],
      };
    } catch (err: any) {
      return {
        isError: true,
        content: [{ type: "text", text: `Invalid API resources payload: ${err?.message ?? String(err)}` }],
      };
    }
  }
);


server.registerTool(
  "Build Product Autoprovisions Tool",
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
      const built: Record<string, any> = {};
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

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(parsed, null, 2),
          },
        ],
      };
    } catch (err: any) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Invalid autoprovisions payload: ${err?.message ?? String(err)}`,
          },
        ],
      };
    }
  }
);


server.registerTool(
  "Create Product Tool",
  {
    title: "Create Thinger.io Product",
    description: [
      "Create a new Thinger.io product with an optional 'profile' configuration.",
      "",
      "How to compose the 'profile' (general process for the LLM):",
      "- When a profile section is complex (e.g., autoprovisions), FIRST use its dedicated builder tool to generate a JSON fragment.",
      "- COPY the returned fragment as-is.",
      "- PASTE each fragment under its corresponding key inside 'profile' (e.g., paste autoprovisions JSON under 'profile.autoprovisions').",
      "- Ensure the final 'profile' is valid JSON (no trailing commas, correct braces).",
      "",
      "Example (final call to this tool):",
      "{",
      "  \"name\": \"City Sensors\",",
      "  \"description\": \"Product for field sensors.\",",
      "  \"profile\": {",
      "    \"properties\": { \"fw\": \"1.0.0\", \"owner\": \"ops\" },",
      "    \"autoprovisions\": {",
      "      \"sensor_madrid_01\": {",
      "        \"config\": { \"mode\": \"pattern\", \"pattern\": \"mad-*\" },",
      "        \"enabled\": true",
      "      },",
      "      \"test_devices\": {",
      "        \"config\": { \"mode\": \"pattern\", \"pattern\": \"test-*\" },",
      "        \"enabled\": false",
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
      name: z.string().describe("Name of the new product"),
      description: z.string().optional().describe("Description of the new product"),
      profile: profileSchema.optional()
        .describe("Final 'profile' object. Compose it by pasting JSON fragments from builder tools under their keys."),
    },
  },
  async ({ name, description, profile }) => {
    try {
      // Validación defensiva adicional
      if (profile?.autoprovisions) {
        autoProvisionSchema.parse(profile.autoprovisions);
      }

      const request: ProductCreateRequest = {
        name,
        product: name.toLowerCase().replace(/\s+/g, "_"), // product ID sanitization
        description,
        enabled: true,
        profile,
      };

      Log.info("Creating product with request:", JSON.stringify(request, null, 2));
      const response = await productsApi.create(process.env.THINGER_USER ?? "", request);

      return {
        content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
      };
    } catch (error: any) {
      if (error instanceof ApiException) {
        Log.error(`Thinger.io API Exception: - ${JSON.stringify(error.body)}`);
        return {
          isError: true,
          content: [{ type: "text", text: `Thinger API error (HTTP): ${error.message ?? "unknown error"}` }],
        };
      }
      Log.error(`Unexpected error: ${error?.message ?? String(error)}`);
      return {
        isError: true,
        content: [{ type: "text", text: `Failed to create product: ${error?.message ?? String(error)}` }],
      };
    }
  }
);

const app = express();

app.use(
  cors({
    origin: ALLOWED_ORIGINS.length ? ALLOWED_ORIGINS : '*'
  })
);

app.use(express.json());


// Auth Bearer (development, this is useless) TODO
const auth: RequestHandler = (req: Request, res: Response, next: NextFunction) => {

  next();
}

app.post('/mcp', auth, async (req: Request, res: Response) => {
  Log.info("Received MCP request:\n", JSON.stringify(req.body, null, 2));
  try {
    // Check 'initialize' requests before creating the transport
    if (!preflightInitializeGuard(req.body, res)) return;

    const transport = new StreamableHTTPServerTransport({
      enableDnsRebindingProtection: false, // TODO: set to true in production with proper config
      allowedHosts: ['127.0.0.1:' + PORT, 'localhost:' + PORT],
      allowedOrigins: Array.isArray(ALLOWED_ORIGINS) ? ALLOWED_ORIGINS : ['*'],
      // "stateless": this means no session is kept server-side
      sessionIdGenerator: undefined,
    });

    res.on('close', () => transport.close());

    // Handle the request with a timeout
    const handlePromise = (async () => {
      await server.connect(transport);
      await transport.handleRequest(req, res, req.body);
    })();

    let timedOut = false;
    const timeout = setTimeout(() => {
      if (!res.headersSent) {
        timedOut = true;
        const id = Array.isArray(req.body) ? null : req.body?.id ?? null;
        res
          .status(200)
          .json(
            jsonRpcError(id, -32000, 'Request timed out', {
              timeoutMs: REQUEST_TIMEOUT_MS
            })
          );
      }
      transport.close();
    }, REQUEST_TIMEOUT_MS);

    try {
      await handlePromise;
    } finally {
      clearTimeout(timeout);
    }

    // Timeout responded (good stuff)
    if (timedOut) return;

  } catch (err: any) {
    Log.error(err.message);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: { code: -32603, message: 'Internal server error' },
        id: null,
      });
    }
  }
});

app.get('/api/mcp/config', (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  res.json({
    url: `${baseUrl}/mcp`,
    token: `Bearer ${process.env.THINGER_TOKEN_MCP_SERVER_PLUGIN_CALLBACK ?? ''}`,
  });
});

app.use(FrontEndRouter);

app.listen(PORT, () => {
  Log.info("MCP Server listening on port", PORT);
});
