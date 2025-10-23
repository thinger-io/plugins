import {McpServer, ResourceTemplate} from '@modelcontextprotocol/sdk/server/mcp.js';
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

  server.registerResource(
    "Get-Thinger-Product-Details",
    new ResourceTemplate("thinger://products/{productId}", {list: undefined}),
    {
      description: "Get details of a specific product in Thinger.io by its ID.",
      usage: "Replace {productId} in the URI with the actual product ID you want to fetch.",
      mimeType: "application/json"
    },
    async (uri: URL) => {
      // Extract productId from the URI path
      const pathParts = uri.pathname.split('/');
      const productId = pathParts[pathParts.length - 1];

      try {
        const product = await productsApi.exportData(thingerUser, productId);

        return {
          contents: [
            {
              uri: uri.href,
              mimeType: "application/json",
              text: JSON.stringify(product, null, 2),
            },
          ],
          _meta: {lastModified: new Date().toISOString()},
        };
      } catch (error) {
        throw new Error(`Failed to fetch product ${productId} for owner ${thingerUser}: ${error}`);
      }
    }
  )
}
