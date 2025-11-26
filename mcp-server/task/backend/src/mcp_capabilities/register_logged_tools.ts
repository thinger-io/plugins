import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import type {CallToolResult} from '@modelcontextprotocol/sdk/types.js';
import type {UserEvents} from '../lib/user-events.js';

// Elimina tu tipo ToolResult y usa el tipo del SDK
type ToolResult = CallToolResult;

interface RegisterLoggedToolOpts<TInput extends Record<string, unknown>> {
  server: McpServer;
  userEvents: UserEvents;
  name: string;
  title: string;
  description: string;
  inputSchema: any;
  handler: (args: TInput) => Promise<ToolResult>;
}

export function registerLoggedTool<TInput extends Record<string, unknown>>(
  opts: RegisterLoggedToolOpts<TInput>
) {
  const {
    server,
    userEvents,
    name,
    title,
    description,
    inputSchema,
    handler,
  } = opts;

  server.registerTool(
    name,
    {title, description, inputSchema},
    async (rawArgs: Record<string, unknown>, _extra: any) => {
      const args = rawArgs as TInput;
      const start = Date.now();

      try {
        const result = await handler(args);
        const isError = !!result.isError;

        userEvents.push({
          category: 'tool',
          severity: isError ? 'warning' : 'success',
          title: isError
            ? `Tool "${name}" executed with errors`
            : `Tool "${name}" executed successfully`,
          tool: name,
          details: {
            args,
            message: result.content?.[0]?.type === 'text'
              ? result.content[0].text
              : '',
          },
          metadata: {
            duration: Date.now() - start,
            size: JSON.stringify(result).length,
          },
        });

        return result;
      } catch (err: any) {
        userEvents.push({
          category: 'tool',
          severity: 'error',
          title: `Tool "${name}" threw an exception`,
          tool: name,
          details: {
            args,
            error: err?.message ?? String(err),
          },
          metadata: {
            duration: Date.now() - start,
            size: JSON.stringify(err).length,
          },
        });

        throw err;
      }
    }
  );
}
