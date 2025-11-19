import express, {Request, Response, NextFunction, RequestHandler} from 'express';
import cors from 'cors';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { ProductsApi, DevicesApi } from '@thinger-io/thinger-node'
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

import { Log } from "./lib/log.js";
import {thingerApiConfig} from "./lib/api.js";
import { UserEvents } from './lib/user-events.js';
import {FrontEndRouter} from "./frontend/routes.js";

// In order to improve scalability of the code, all server capabilities are implemented in mcp_capabilities directory.
// Each capability is a tool registered in the MCP server instance.
import { registerProductTools } from "./mcp_capabilities/product_tools.js";
import { registerProductResources } from "./mcp_capabilities/product_resources.js";
import { registerDevicesTools } from "./mcp_capabilities/devices_tools.js";
import { registerDashboardsTools } from "./mcp_capabilities/dashboards_tools.js";

// Initialize thinger API
const productsApi = new ProductsApi(thingerApiConfig);
const devicesApi = new DevicesApi(thingerApiConfig);

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

// Set up user events logger. This logger is used to give the user feedback about
// the plugin operations. It souldnt be used for debugging purposes.
const userEvents = new UserEvents();

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
  userEvents.push({
    category: 'error',
    severity: 'error',
    title: `JSON-RPC Error`,
    details: {
      mcpCode: code,
      message: message,
      data: data ?? null,
    },
    metadata: {
      sessionId: id?.toString() ?? 'unknown',
    }
  });
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

  userEvents.push({
    category: 'initialization',
    severity: 'info',
    title: 'MCP Client initialized',
    client: params.clientInfo?.name ?? 'unknown',
    details: {
      method: body.method ?? 'unknown',
      protocolVersion: params.protocolVersion ?? 'unknown',
      capabilities: caps,
    },
    metadata: {
      sessionId: id?.toString() ?? 'unknown',
    }
  });

  return true;
}

registerProductTools({ server, productsApi });
registerProductResources({ server, productsApi });
registerDevicesTools({ server, devicesApi});
registerDashboardsTools({ server, productsApi });

const app = express();

app.use(
  cors({
    origin: ALLOWED_ORIGINS.length ? ALLOWED_ORIGINS : '*'
  })
);

app.use(express.json());
app.enable('trust proxy');

const httpServer = createServer(app);

const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  path: '/mcp/socket.io'
});


// Auth Bearer (development, this is useless) TODO
const auth: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  next();
}

io.on('connection', (socket) => {
  Log.info('Client connected to events stream:', socket.id);

  // Send initial data when client connects
  socket.emit('initial-events', {
    events: userEvents.getRecent({ limit: 20 }),
    config: userEvents.getConfig(),
    stats: userEvents.getStats()
  });

  // Handle client requests for filtered events
  socket.on('get-events', (filters) => {
    try {
      const events = userEvents.getRecent(filters);
      socket.emit('events-response', { events, filters });
    } catch (error: any) {
      socket.emit('error', { message: 'Error fetching events', error: error.message });
    }
  });

  // Handle clear events request
  socket.on('clear-events', () => {
    try {
      userEvents.clear();
      socket.emit('events-cleared');
    } catch (error: any) {
      socket.emit('error', { message: 'Error clearing events', error: error.message });
    }
  });

  // Handle get stats request
  socket.on('get-stats', () => {
    try {
      socket.emit('stats-response', userEvents.getStats());
    } catch (error: any) {
      socket.emit('error', { message: 'Error fetching stats', error: error.message });
    }
  });

  socket.on('disconnect', () => {
    Log.info('Client disconnected from events stream:', socket.id);
  });
});

userEvents.on('new-event', (event) => {
  io.emit('new-event', event);
});

// When events are cleared, notify all clients
userEvents.on('events-cleared', () => {
  io.emit('events-cleared');
});

app.post('/mcp', auth, async (req: Request, res: Response) => {
  Log.info("Received MCP request: ", req.body["method"]);
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

    userEvents.push({
      category: 'connection',
      severity: 'info',
      title: `MCP request processed`,
      client: req.body?.params?.clientInfo?.name ?? 'unknown',
      tool: req.body?.method ?? 'unknown',
      details: {
        method: req.body?.method ?? 'unknown',
        sessionId: req.body?.sessionId ?? 'unknown'
      },
      metadata: {
        method: req.body?.method ?? 'unknown',
        sessionId: req.body?.sessionId ?? 'unknown',
      }
    });

    // Timeout responded (good stuff)
    if (timedOut) return;

  } catch (err: any) {
    Log.error(err.message);
    userEvents.push({
      category: 'error',
      severity: 'error',
      title: 'Internal server error processing MCP request',
      details: {
        error: err.message,
        source: "",
      },
      metadata: {
        method: req.body?.method ?? 'unknown',
        sessionId: req.body?.sessionId ?? 'unknown',
      }
    })
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
  Log.info("MCP config requested");
  res.json({
    token: `${process.env.THINGER_TOKEN_MCP_SERVER_PLUGIN_CALLBACK ?? ''}`,
  });
});

app.use(FrontEndRouter);

httpServer.listen(PORT, () => {
  Log.log(`Server running on port ${PORT} with WebSocket support`);
});
