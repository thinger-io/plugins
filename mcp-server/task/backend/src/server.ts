import express, {Request, Response, NextFunction, RequestHandler} from 'express';
import cors from 'cors';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';
import fetch from 'node-fetch';
import {DevicesApi, ProductsApi, ApiException, ProductCreateRequest} from '@thinger-io/thinger-node'

import { Log } from "./lib/log.js";
import {thingerApiConfig} from "./lib/api.js";
import {FrontEndRouter} from "./frontend/routes.js";
import { ProductConfigBuilder } from './parser/builder.js';
import { PropertiesSchema, FlowSchema, ApiSchema, AutoprovisionsSchema, BucketSchema } from './parser/schema.js';

// Initialize thinger API
const devicesApi = new DevicesApi(thingerApiConfig);
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

const SUPPORTED_PROTOCOL_VERSIONS = ['2025-03-26', '2025-06-18'];                               // MCP Protocol spec
const REQUIRED_CLIENT_CAPABILITIES: string[] = [];                                // Client capabilities
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
  'Get Devices',
  {
    title: 'Get All thinger.io Devices from Account',
    description: 'Retrieve a list of all devices available for the specified thinger.io account.',
    inputSchema: {
    },
  },
  async () => {
    try {
      const devices = await devicesApi.list(process.env.THINGER_USER ?? '');
      return {
        content: [
          { type: 'text', text: JSON.stringify(devices, null, 2) }
        ],
      };
    } catch (error: any) {
      if (error instanceof ApiException) {
        Log.error(`Thinger.io API Exception: - ${JSON.stringify(error.body)}`);
        return {
          isError: true,
          content: [
            { type: 'text', text: `Thinger API error (HTTP): ${error.message ?? 'unknown error'}` }
          ],
        };
      }
      Log.error(`Unexpected error: ${error?.message ?? String(error)}`);
      return {
        isError: true,
        content: [
          { type: 'text', text: `Failed to list devices: ${error?.message ?? String(error)}` }
        ],
      };
    }
  }
);

server.registerTool(
  'Create Product Properties Configuration',
  {
    title: 'Create Product Properties Configuration',
    description:
    // Keep this long & explicit so the LLM understands how to chain tools.
      'Build and validate a single Property configuration for a Thinger.io Product profile.\n' +
      '\n' +
      'USAGE:\n' +
      '1) Call this tool FIRST to create ONE property (e.g., "uplink").\n' +
      '2) Read the response:\n' +
      '   - If "ok" is true, take "normalized" and pass it to "Create Product Config" as the "properties" field.\n' +
      '   - If "ok" is false, fix issues using "diagnostics" and try again.\n' +
      '3) Repeat for more properties.\n' +
      '\n' +
      'WHAT THIS TOOL RETURNS:\n' +
      '- "normalized": a { [propertyId]: {...} } object that conforms to the Product profile schema.\n' +
      '- "diagnostics": validation errors with precise paths (e.g., "properties.uplink.data.payload_type").\n' +
      '- "preview": a minimal snapshot of the property just built.\n' +
      '\n' +
      'CAPABILITIES:\n' +
      '- Supports authoring from different data source kinds: "resource", "resource_stream", "topic", "event".\n' +
      "  Internally they are mapped to the Product schema's 'resource' source and typically paired with update='events'.\n" +
      "- Lets you set payload template, payload function, payload type, and update strategy.\n" +
      '- Applies safe defaults and rejects unknown fields.\n' +
      '\n' +
      'IMPORTANT:\n' +
      '- This tool does NOT create products or call any API. It only builds/validates the JSON for the "properties" section.\n' +
      '- After success, you MUST feed "normalized" into "Create Product Config" (under its "properties" field).',
    inputSchema: {
      // Core identifiers
      name: z.string().describe("Unique property id. Will become the key under 'properties', e.g., 'uplink'."),
      description: z.string().optional().describe("Human-readable description for documentation (not stored in the profile)."),

      // Data source and linkage
      source: z.enum(['resource', 'resource_stream', 'topic', 'event']).default('resource').describe(
        "Authoring-time source kind. One of: 'resource', 'resource_stream', 'topic', 'event'. " +
        "All map to the Product schema's 'resource' source internally."
      ),
      source_name: z.string().describe(
        "Required when source != 'value'. Name of the resource/stream/topic/event, e.g., 'uplink'."
      ),

      // Data extraction
      payload: z.string().optional().default('{{payload}}').describe(
        "Template or passthrough for the data payload used to compute the property value. Default: '{{payload}}'."
      ),
      payload_function: z.string().optional().default('').describe(
        "Optional function name (defined in product code) that transforms the payload, e.g., 'extractDigitalRead'."
      ),
      payload_type: z.enum(['source_payload', 'json', 'text']).optional().default('source_payload').describe(
        "How to interpret 'payload'. Use 'source_payload' for passthrough, or 'json'/'text' for typed transforms."
      ),

      // Update strategy
      update: z.enum(['events', 'interval', 'always']).optional().default('events').describe(
        "How the property updates. 'events' (on incoming data), 'interval' (polling), or 'always' (each evaluation)."
      ),

      // Misc
      defaults: z.object({}).passthrough().optional().describe(
        "Optional default object merged as 'default' for the property (e.g., { source: 'value' })."
      ),
    },
  },
  async ({
           name,
           description,
           source,
           source_name,
           payload,
           payload_function,
           payload_type,
           update,
           defaults,
         }) => {
    try {
      // Build a single-property structure under its key
      const candidate = {
        properties: {
          [name]: {
            data: {
              payload: payload ?? '{{payload}}',
              payload_function: payload_function ?? '',
              payload_type: payload_type ?? 'source_payload',
              source: source,
              [source]: source_name, // dynamic key based on 'source'
              update: update ?? 'events',
            },
            default: defaults ?? {},
            enabled: true,
            description: description
          }
        }
      };

      // Validate strictly against the Properties schema
      const res = PropertiesSchema.safeParse(candidate.properties);

      const diagnostics: Array<{ path: string; message: string }> = [];
      if (!res.success) {
        for (const issue of res.error.issues) {
          diagnostics.push({
            path: ['properties', ...issue.path].join('.'),
            message: issue.message,
          });
        }
      }

      const ok = res.success;
      const normalized = ok ? { properties: res.data } : {};
      const preview = candidate; // raw build (useful for quick comparison / debugging)

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                ok,
                diagnostics,
                normalized,
                preview
              },
              null,
              2
            )
          }
        ]
      };
    } catch (error: any) {
      return {
        isError: true,
        content: [
          { type: 'text', text: `Failed to build property configuration: ${error?.message ?? String(error)}` }
        ],
      };
    }
  }
);

server.registerTool(
  'Create Product API Configuration',
  {
    title: 'Create Product API Configuration',
    description:
      'Build and validate ONE API resource entry for a Thinger.io Product profile.\n' +
      '\n' +
      'USAGE:\n' +
      '1) Call this tool to create ONE API endpoint (e.g., "uplink" or "downlink").\n' +
      '2) If "ok" is true, pass "normalized" to the "Create Product Config" tool under its "api" field.\n' +
      '3) Repeat for additional endpoints.\n' +
      '\n' +
      'WHAT THIS TOOL RETURNS:\n' +
      '- "normalized": an { [endpointName]: {...} } object that conforms to the Product profile API schema.\n' +
      '- "diagnostics": precise validation errors (e.g., "api.uplink.request.data.resource_stream").\n' +
      '- "preview": the built candidate (pre-validation) for comparison.\n' +
      '\n' +
      'CAPABILITIES:\n' +
      "- Supports both 'endpoint_call' and 'resource_stream' targets in request.data.\n" +
      "- Lets you set payload, payload_function, payload_type, connectivity handling, and device id resolver.\n" +
      '- Applies sensible defaults and rejects unknown fields.\n' +
      '\n' +
      'IMPORTANT:\n' +
      '- This tool does NOT create products or call any API. It only builds/validates JSON for the "api" section.\n' +
      '- After success, you MUST feed "normalized" into "Create Product Config" (under its "api" field).',
    inputSchema: {
      // Core identifier
      name: z.string().describe("Endpoint name. Becomes the key under 'api', e.g., 'uplink' or 'downlink'."),

      // Request target shape
      target: z.enum(['endpoint_call', 'resource_stream']).describe(
        "Request data target. Use 'endpoint_call' for calling a named endpoint; 'resource_stream' to push into a resource stream."
      ),

      // Fields for endpoint_call
      endpoint: z.string().optional().describe("Required when target='endpoint_call'. Defaults to 'name' if omitted."),

      // Fields for resource_stream
      resource_stream: z.string().optional().describe("Required when target='resource_stream'. Defaults to 'name' if omitted."),

      // Payload bits
      payload: z.string().optional().default('').describe("Payload template/body passed to the request."),
      payload_function: z.string().optional().default('').describe("Optional transform function name."),
      payload_type: z.string().optional().describe(
        "How to interpret 'payload'. For 'endpoint_call' default is '', for 'resource_stream' default is 'source_payload'."
      ),

      // Endpoint options
      enabled: z.boolean().optional().default(true).describe("Whether this API endpoint is enabled. Default: true."),
      handle_connectivity: z.boolean().optional().default(false).describe(
        "Set true if the endpoint manages device connectivity (e.g., 'uplink')."
      ),
      device_id_resolver: z.string().optional().describe(
        "Optional resolver function for device id (commonly used by 'uplink', e.g., 'get_id')."
      ),
    },
  },
  async ({
           name,
           target,
           endpoint,
           resource_stream,
           payload,
           payload_function,
           payload_type,
           enabled,
           handle_connectivity,
           device_id_resolver,
         }) => {
    try {

      // TODO, THERE ARE TOO MANY OPTIONS HERE. SEEK THE WAY TO SIMPLIFY FOR THE MOMENT.
      const requestData =
        target === 'resource_stream'
          ? {
            target: 'resource_stream' as const,
            resource_stream: resource_stream ?? name,
            payload: payload ?? '',
            payload_function: payload_function ?? '',
            payload_type: payload_type ?? 'source_payload',
          }
          : {
            target: 'endpoint_call' as const,
            endpoint: endpoint ?? name,
            payload: payload ?? '',
            payload_function: payload_function ?? '',
            payload_type: payload_type ?? '', // matches your downlink example
          };

      const apiItem: Record<string, any> = {
        enabled: enabled ?? true,
        handle_connectivity: handle_connectivity ?? false,
        request: { data: requestData },
        response: { data: {} },
      };

      if (device_id_resolver) {
        apiItem.device_id_resolver = device_id_resolver;
      }

      // Candidate full shape
      const candidate = {
        api: {
          [name]: apiItem,
        },
      };

      // Validate against ApiSchema
      const res = ApiSchema.safeParse(candidate.api);

      const diagnostics: Array<{ path: string; message: string }> = [];
      if (!res.success) {
        for (const issue of res.error.issues) {
          diagnostics.push({
            path: ['api', ...issue.path].join('.'),
            message: issue.message,
          });
        }
      }

      const ok = res.success;
      const normalized = ok ? { api: res.data } : {};
      const preview = candidate;

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ ok, diagnostics, normalized, preview }, null, 2),
          },
        ],
      };
    } catch (error: any) {
      return {
        isError: true,
        content: [
          { type: 'text', text: `Failed to build API configuration: ${error?.message ?? String(error)}` },
        ],
      };
    }
  }
);

server.registerTool(
  'Create Product Config',
  {
    title: 'Create Thinger.io Product Configuration schema',
    description:
      'Create and validate a Thinger.io Product Configuration **incrementally**.\n' +
      '\n' +
      'RECOMMENDED FLOW:\n' +
      '1) Build each section with its dedicated tools (e.g., "Create Product Properties Configuration").\n' +
      '2) Pass the returned "normalized" objects into this tool to assemble the full profile.\n' +
      '3) Use this tool repeatedly: start with "properties", then "buckets", etc.\n' +
      '\n' +
      'WHAT THIS TOOL DOES:\n' +
      '- Validates each provided section independently.\n' +
      '- Returns "normalized" (accepted sections), "diagnostics" (per-section errors), and "preview" (merged snapshot).',
    inputSchema: {
      properties: z.object({}).passthrough().optional().describe(
        'Strictly validated "properties" section for the Product profile.\n' +
        '\n' +
        'EXPECTED SHAPE (PropertiesSchema):\n' +
        '{\n' +
        '  "<propertyId>": {\n' +
        '    "data": {\n' +
        '      "payload": string,\n' +
        '      "payload_function": string,\n' +
        '      "payload_type": "source_payload" | "json" | "text",\n' +
        '      "resource": string,\n' +
        '      "source": "resource" | "value",\n' +
        '      "update": "events" | "interval" | "always"\n' +
        '    },\n' +
        '    "default"?: object,\n' +
        '    "enabled"?: boolean\n' +
        '  }\n' +
        '}\n' +
        '\n' +
        'USAGE:\n' +
        '• Prefer to obtain this object from "Create Product Properties Configuration" and pass its "normalized.properties".\n' +
        '• You may include one or multiple property entries per call.\n'
      ),
      buckets: z.object({}).passthrough().optional().describe(
        'Strictly validated "buckets" section for the Product profile.\n' +
        '\n' +
        'EXPECTED SHAPE (BucketsSchema):\n' +
        '{\n' +
        '  "<bucketId>": {\n' +
        '    "backend": "mongodb" | "timescale" | "influx",\n' +
        '    "data": {\n' +
        '      "payload": string,\n' +
        '      "payload_function": string,\n' +
        '      "payload_type": "source_payload" | "json" | "text",\n' +
        '      "resource": string,\n' +
        '      "source": "resource" | "value",\n' +
        '      "update": "events" | "interval" | "always"\n' +
        '    },\n' +
        '    "enabled"?: boolean,\n' +
        '    "retention"?: { "period": number, "unit": "minutes" | "hours" | "days" | "weeks" | "months" | "years" },\n' +
        '    "tags"?: string[]\n' +
        '  }\n' +
        '}\n' +
        '\n' +
        'USAGE:\n' +
        '• Provide a validated/normalized buckets object (from a buckets builder tool if available).\n' +
        '• Include one or multiple bucket entries per call.\n'
      ),
      flows: z.object({}).passthrough().optional().describe(
        'Strictly validated "flows" section for the Product profile.\n' +
        '\n' +
        'EXPECTED SHAPE (FlowsSchema):\n' +
        '{\n' +
        '  "<flowId>": {\n' +
        '    "data": {\n' +
        '      "source": "event",\n' +
        '      "event": "device_property_update" | "device_connected" | "device_disconnected",\n' +
        '      "filter"?: { "property"?: string },\n' +
        '      "payload": string,\n' +
        '      "payload_function": string,\n' +
        '      "payload_type": string\n' +
        '    },\n' +
        '    "enabled"?: boolean,\n' +
        '    "sink": (\n' +
        '      { "target": "resource", "resource": string, "payload": string, "payload_function": string, "payload_type": string }\n' +
        '      | { "target": "endpoint_call", "endpoint": string, "payload": string, "payload_function": string, "payload_type": string }\n' +
        '    ),\n' +
        '    "split_data"?: boolean\n' +
        '  }\n' +
        '}\n' +
        '\n' +
        'USAGE:\n' +
        '• Provide a validated flows object (ideally built by a dedicated flows builder tool).\n'
      ),
      api: z.object({}).passthrough().optional().describe(
        'Strictly validated "api" section for the Product profile.\n' +
        '\n' +
        'EXPECTED SHAPE (ApiSchema):\n' +
        '{\n' +
        '  "<endpointName>": {\n' +
        '    "enabled"?: boolean,\n' +
        '    "handle_connectivity"?: boolean,\n' +
        '    "device_id_resolver"?: string,\n' +
        '    "request": {\n' +
        '      "data": (\n' +
        '        { "target": "endpoint_call", "endpoint": string, "payload": string, "payload_function": string, "payload_type": string }\n' +
        '        | { "target": "resource_stream", "resource_stream": string, "payload": string, "payload_function": string, "payload_type": "source_payload" }\n' +
        '      )\n' +
        '    },\n' +
        '    "response": { "data": object }\n' +
        '  }\n' +
        '}\n' +
        '\n' +
        'USAGE:\n' +
        '• Prefer to obtain this object from "Create Product API Configuration" and pass its "normalized.api".\n' +
        '• Include one or multiple endpoints per call.\n'
      ),
      autoprovisions: z.object({}).passthrough().optional().describe(
        'Strictly validated "autoprovisions" section for device auto-provisioning.\n' +
        '\n' +
        'EXPECTED SHAPE (AutoprovisionsSchema):\n' +
        '{\n' +
        '  "<ruleId>": {\n' +
        '    "config": (\n' +
        '      { "mode": "pattern", "pattern": string }\n' +
        '      | { "mode": "script", "resolver_function": string }\n' +
        '    ),\n' +
        '    "enabled"?: boolean\n' +
        '  }\n' +
        '}\n' +
        '\n' +
        'USAGE:\n' +
        '• Provide a validated/normalized autoprovisions object (from a dedicated builder if available).\n'
      ),
    },
  },
  async ({properties, buckets, flows, api, autoprovisions}) => {
    try {
      // For creating a new product, we need to provide a "productCreateRequest" object. To create such object,
      // we need to parse the input parameters into a valid "profile" object. This can be done using the
      // ProductConfigBuilder class.
      const builder = new ProductConfigBuilder();
      const diagnostics: any[] = [];
      const normalized: any = {};

      // Add product properties
      const r = builder.addProperties(properties ?? {});
      if (!r.ok) {
        diagnostics.push({ section: 'properties', errors: r.errors });
      } else {
        normalized.properties = r.value;
      }

      // Add product buckets
      const r2 = builder.addBuckets(buckets ?? {});
      if (!r2.ok) {
        diagnostics.push({ section: 'buckets', errors: r2.errors });
      } else {
        normalized.buckets = r2.value;
      }

      // Add product flows
      const r3 = builder.addFlows(flows ?? {});
      if (!r3.ok) {
        diagnostics.push({ section: 'flows', errors: r3.errors });
      } else {
        normalized.flows = r3.value;
      }

      // Add product api resources
      const r4 = builder.addApi(api ?? {});
      if (!r4.ok) {
        diagnostics.push({ section: 'api', errors: r4.errors });
      } else {
        normalized.api = r4.value;
      }

      // Add product autoprovisions
      const r5 = builder.addAutoprovisions(autoprovisions ?? {});
      if (!r5.ok) {
        diagnostics.push({ section: 'autoprovisions', errors: r5.errors });
      } else {
        normalized.autoprovisions = r5.value;
      }

      const finalCheck = builder.finalize();
      const ok = finalCheck.ok && diagnostics.length === 0;

      return {
        content: [
          { type: 'text', text: JSON.stringify({
            ok,
            diagnostics,
            normalized
          }, null, 2) }
        ],
      };

    } catch (error: any) {
      if (error instanceof ApiException) {
        Log.error(`Thinger.io API Exception: - ${JSON.stringify(error.body)}`);
        return {
          isError: true,
          content: [
            { type: 'text', text: `Thinger API error (HTTP): ${error.message ?? 'unknown error'}` }
          ],
        };
      }
      Log.error(`Unexpected error: ${error?.message ?? String(error)}`);
      return {
        isError: true,
        content: [
          { type: 'text', text: `Failed to list devices: ${error?.message ?? String(error)}` }
        ],
      };
    }
  }
);

server.registerTool(
  'Create Product ',
  {
    title: 'Create Thinger.io Product',
    description: 'Create a new product in thinger.io',
    inputSchema: {
      name: z.string().describe("Name of the new product"),
      description: z.string().optional().describe("Description of the new product"),
      profile: z.object({}).passthrough().describe("Product configuration schema. All the behaviour of the product is defined here, such" +
        " as API resources, data buckets, autoprovisioning, custom scripts and properties.").optional(),
    },
  },
  async ({name, description, profile}) => {
    try {
      // For creating a new product, we need to provide a "productCreateRequest" object.
      const request: ProductCreateRequest = {
        name: name,
        product: name.toLowerCase().replace(/\s+/g, '-'),
        description: description,
        enabled: true,
        profile: profile,
      }
      Log.info("Creating product with request:", JSON.stringify(request, null, 2));
      const response = await productsApi.create(process.env.THINGER_USER ?? '', request);
      return {
        content: [
          { type: 'text', text: JSON.stringify(response, null, 2) }
        ],
      };
    } catch (error: any) {
      if (error instanceof ApiException) {
        Log.error(`Thinger.io API Exception: - ${JSON.stringify(error.body)}`);
        return {
          isError: true,
          content: [
            { type: 'text', text: `Thinger API error (HTTP): ${error.message ?? 'unknown error'}` }
          ],
        };
      }
      Log.error(`Unexpected error: ${error?.message ?? String(error)}`);
      return {
        isError: true,
        content: [
          { type: 'text', text: `Failed to list devices: ${error?.message ?? String(error)}` }
        ],
      };
    }
  }
);

server.registerTool(
  'Get Bucket info',
  {
    title: 'Get Bucket info',
    description: 'Retrieve data from a specific thinger.io device bucket.',
    inputSchema: {
      device: z.string().describe("Thinger.io Device ID"),
      bucket: z.string().describe("Thinger.io DataBucket name"),
    },
  },
  async ({ device, bucket }) => {
    try {
      const data = await devicesApi.readBucketData('v3', process.env.THINGER_USER ?? '', device, bucket);
      return {
        content: [
          { type: 'text', text: JSON.stringify(data, null, 2) }
        ],
      };
    } catch (error: any) {
      if (error instanceof ApiException) {
        Log.error(`Thinger.io API Exception: - ${JSON.stringify(error.body)}`);
        return {
          isError: true,
          content: [
            { type: 'text', text: `Thinger API error (HTTP): ${error.message ?? 'unknown error'}` }
          ],
        };
      }
      Log.error(`Unexpected error: ${error?.message ?? String(error)}`);
      return {
        isError: true,
        content: [
          { type: 'text', text: `Failed to list devices: ${error?.message ?? String(error)}` }
        ],
      };
    }
  }
);

server.registerTool(
  'Get Data buckets',
  {
    title: 'Get Data buckets',
    description: 'List all data buckets from a specific thinger.io device.',
    inputSchema: {
      device: z.string().describe("Thinger.io Device ID"),
    },
  },
  async ({device}) => {
    try {
      const data = await devicesApi.listBuckets(process.env.THINGER_USER ?? '', device);
      return {
        content: [
          { type: 'text', text: JSON.stringify(data, null, 2) }
        ],
      };
    } catch (error: any) {
      if (error instanceof ApiException) {
        Log.error(`Thinger.io API Exception: - ${JSON.stringify(error.body)}`);
        return {
          isError: true,
          content: [
            { type: 'text', text: `Thinger API error (HTTP): ${error.message ?? 'unknown error'}` }
          ],
        };
      }
      Log.error(`Unexpected error: ${error?.message ?? String(error)}`);
      return {
        isError: true,
        content: [
          { type: 'text', text: `Failed to list devices: ${error?.message ?? String(error)}` }
        ],
      };
    }
  }
);

server.registerTool(
  'search',
  {
    title: 'Search',
    description: 'Given a query string, returns a list of relevant documents with metadata (id, title, snippet, published_at).',
    inputSchema: { query: z.string() },
  },
  async ({ query }) => {
    const results: Array<{ id: string; title?: string; snippet?: string; published_at?: string }> = [];

    const devices = await devicesApi.list(process.env.THINGER_USER ?? '');
    for (const d of devices ?? []) {
      const hit = JSON.stringify(d).toLowerCase().includes(query.toLowerCase());
      if (hit) {
        const url = `${process.env.PUBLIC_BASE_URL ?? 'https://console.thinger.io'}/#/${process.env.THINGER_USER ?? ''}/devices/${d.device}`;
        results.push({
          id: url,
          title: `Device: ${d.device}`,
          snippet: d.description ?? 'Thinger device'
        });
      }
    }

    return { content: [{ type: 'text', text: JSON.stringify({ query, results }, null, 2) }] };
  }
);

server.registerTool(
  'fetch',
  {
    title: 'Fetch',
    description: 'Fetch a URL and return its content. Use the "id" returned by the "search" tool. Optional parameters to limit the length of the content and to paginate through it.',
    inputSchema: {
      id: z.string().describe("URL to fetch, usually obtained from the 'search' tool"),
      max_length: z.number().int().min(1000).max(200000).optional(),
      start_index: z.number().int().min(0).optional(),
    },
  },
  async ({ id, max_length = 40000, start_index = 0 }) => {
    try {
      // Whitelist básica (ajústala a tu despliegue)
      const allowed = (process.env.FETCH_ALLOWED_HOSTS ?? '').split(',').map(s => s.trim()).filter(Boolean);
      if (allowed.length && !allowed.some(host => id.includes(host))) {
        return {
          isError: true,
          content: [{ type: 'text', text: `fetch blocked: host not allowed (${id})` }],
        };
      }

      const resp = await fetch(id, {
        headers: { 'User-Agent': 'thinger-mcp-server/1.0 (+mcp)' },
      });
      const text = await resp.text();

      const sliced = text.slice(start_index, start_index + max_length);

      const payload = {
        id,
        status: resp.status,
        contentType: resp.headers.get('content-type') ?? 'text/plain',
        length: text.length,
        start_index,
        returned_length: sliced.length,
        content: sliced,
      };

      return {
        content: [{ type: 'text', text: JSON.stringify(payload, null, 2) }],
      };
    } catch (error: any) {
      return {
        isError: true,
        content: [{ type: 'text', text: `fetch failed: ${error?.message ?? String(error)}` }],
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


// Auth Bearer (development, this is useless)
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
