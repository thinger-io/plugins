import express, {Request, Response, NextFunction, RequestHandler} from 'express';
import cors from 'cors';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { ProductsApi} from '@thinger-io/thinger-node'

import { Log } from "./lib/log.js";
import {thingerApiConfig} from "./lib/api.js";
import {FrontEndRouter} from "./frontend/routes.js";

// In order to improve scalability of the code, all server capabilities are implemented in mcp_capabilities directory.
// Each capability is a tool registered in the MCP server instance.
import { registerProductTools } from "./mcp_capabilities/product_tools.js";
import { registerProductResources } from "./mcp_capabilities/product_resources.js";

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
}, {
  // Server capabilities
  capabilities: {
    tools: {},
    resources: {},
  }
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

registerProductTools({ server, productsApi });
registerProductResources({ server, productsApi, thingerUser: process.env.THINGER_USER ?? 'UNDEFINED'});

const app = express();

app.use(
  cors({
    origin: ALLOWED_ORIGINS.length ? ALLOWED_ORIGINS : '*'
  })
);

app.use(express.json());
app.enable('trust proxy');


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
  res.json({
    token: `${process.env.THINGER_TOKEN_MCP_SERVER_PLUGIN_CALLBACK ?? ''}`,
  });
});

app.use(FrontEndRouter);

app.listen(PORT, () => {
  Log.info("MCP Server listening on port", PORT);
});
