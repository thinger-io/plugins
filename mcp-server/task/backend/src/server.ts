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

const autoProvisionSchema = z.record(
  z.string().describe("Autoprovisioning ID"), // Autoprisioning ID (key)
  z.object({
    "config": z.object({
      "mode": z.enum(['pattern']),
      "pattern": z.string()
    }),
    "enabled": z.boolean(),
  }).strict()
);

server.registerTool(
  'Create Product ',
  {
    title: 'Create Thinger.io Product',
    description: 'Create a new product in thinger.io',
    inputSchema: {
      name: z.string().describe("Name of the new product"),
      description: z.string().optional().describe("Description of the new product"),
      profile: z.object({
        properties: z.object({}),
        buckets: z.object({}),
        flows: z.object({}),
        endpoints: z.object({}),
        api: z.object({}),
        autoprovisions: autoProvisionSchema
      }).strict().describe("Product configuration schema. All the behaviour of the product is defined here, such" +
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
