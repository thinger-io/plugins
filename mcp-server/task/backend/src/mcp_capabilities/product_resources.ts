import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js';
import type { ProductsApi } from "@thinger-io/thinger-node";

// Resources allow servers to share data that provides context to language models,
// such as files, database schemas, or application-specific information.
// Each resource is uniquely identified by a URI.
export function registerProductResources(opts: {
  server: McpServer;
  productsApi: ProductsApi;
  thingerUser: string;
}) {
  const { server, productsApi, thingerUser } = opts;

  server.registerResource(
    "List-Thinger-Products",
    `thinger://products?owner=${thingerUser}`,
    {
      description: "List of products in Thinger.io for a specific owner.",
      mimeType: "application/json",
    },
    async () => {
      try {
        const items = await productsApi.list(thingerUser);
        return {
          contents: [
            {
              uri: `thinger://products?owner=${thingerUser}`,
              mimeType: "application/json",
              text: JSON.stringify(
                {thingerUser, count: items.length, items},
                null,
                2
              ),
            },
          ],
          _meta: {lastModified: new Date().toISOString()},
        };
      } catch (error) {
        throw new Error(`Failed to fetch products for owner ${thingerUser}: ${error}`);
      };
    }
  );
}
