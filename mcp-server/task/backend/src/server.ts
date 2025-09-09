import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';

import { Log } from "./lib/log.js";

// ----------------- CONFIG -----------------
const PORT = Number(process.env.PORT ?? 3000);
const REQUIRED_TOKEN = process.env.THINGER_TOKEN_MCP_SERVER_PLUGIN ?? '';
const ALLOWED_ORIGINS = (process.env.CORS_ORIGINS ?? '*')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

const server = new McpServer({
  name: 'demo-server',
  version: '1.0.0',
});

// Example
server.registerTool(
  'add',
  {
    title: 'Addition Tool',
    description: 'Add two numbers',
    inputSchema: { a: z.number(), b: z.number() },
  },
  async ({ a, b }) => ({
    content: [{ type: 'text', text: String(a + b) }],
  })
);

server.registerResource(
  'greeting',
  new ResourceTemplate('greeting://{name}', { list: undefined }),
  {
    title: 'Greeting Resource',
    description: 'Dynamic greeting generator',
  },
  async (uri, { name }) => ({
    contents: [{ uri: uri.href, text: `Hello, ${name}!` }],
  })
);

const app = express();

app.use(
  cors({
    origin: ALLOWED_ORIGINS.length ? ALLOWED_ORIGINS : '*',
    exposedHeaders: ['Mcp-Session-Id'],
    allowedHeaders: ['Content-Type', 'Authorization', 'mcp-session-id'],
  })
);

app.use(express.json());

// Auth Bearer (development, this is useless)
function auth(req: Request, res: Response, next: NextFunction) {
  if (!REQUIRED_TOKEN) {
    return next();
  }
  const header = req.header('Authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : header;
  if (token !== REQUIRED_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

app.post('/mcp', auth, async (req: Request, res: Response) => {
  Log.info("Received MCP request:\n", JSON.stringify(req.body, null, 2));
  try {
    const transport = new StreamableHTTPServerTransport({
      enableDnsRebindingProtection: false, // TODO: set to true in production with proper config
      allowedHosts: ['127.0.0.1:' + PORT, 'localhost:' + PORT],
      allowedOrigins: Array.isArray(ALLOWED_ORIGINS) ? ALLOWED_ORIGINS : ['*'],
      // "stateless": this means no session is kept server-side
      sessionIdGenerator: undefined,
    });

    res.on('close', () => transport.close());

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
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

app.listen(PORT, () => {
  Log.info("MCP Server listening on port", PORT);
});
