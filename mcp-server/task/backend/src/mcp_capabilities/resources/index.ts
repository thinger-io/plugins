import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ============================================================================
// RESOURCE METADATA (for MCP Resources)
// ============================================================================

export interface ResourceMetadata {
  uri: string;
  path: string;
  description: string;
}

const RESOURCES: Record<string, ResourceMetadata> = {
  // Dashboard examples
  'apex-widget-examples': {
    uri: 'thinger://examples/dashboards/widgets',
    path: 'dashboards/widgets/apex-chart-examples.json',
    description: 'ApexChart widget JSON examples'
  },
  'dashboard-full-examples': {
    uri: 'thinger://examples/dashboards/full',
    path: 'dashboards/full-dashboards/temperature_and_humidity_dashboard.json',
    description: 'Complete dashboard example for temperature and humidity monitoring'
  },
  'dashboard-gps-gnss-examples': {
    uri: 'thinger://examples/dashboards/gps-gnss',
    path: 'dashboards/full-dashboards/gps_and_gnss_dashboard.json',
    description: 'Complete dashboard example for GPS and GNSS tracking with location, speed, and direction'
  },

  // Product examples
  'property-examples': {
    uri: 'thinger://examples/products/properties',
    path: 'products/properties.json',
    description: 'Product Property configuration examples'
  },
  'bucket-examples': {
    uri: 'thinger://examples/products/buckets',
    path: 'products/buckets.json',
    description: 'Data bucket configuration examples'
  },
  'flow-examples': {
    uri: 'thinger://examples/products/flows',
    path: 'products/flows.json',
    description: 'Flow pipeline configuration examples'
  },
  'api-resource-examples': {
    uri: 'thinger://examples/products/api-resources',
    path: 'products/api-resources.json',
    description: 'API resource configuration examples'
  },
  'autoprovision-examples': {
    uri: 'thinger://examples/products/autoprovision',
    path: 'products/autoprovision.json',
    description: 'Auto-provisioning configuration examples'
  },
  'code-examples': {
    uri: 'thinger://examples/products/code',
    path: 'products/code.json',
    description: 'JavaScript code examples for products'
  },
};

// ============================================================================
// EXAMPLE CATEGORIES (for Example Tools)
// ============================================================================

export const EXAMPLE_CATEGORIES = {
  // Product examples
  'product-properties': 'products/properties.json',
  'product-buckets': 'products/buckets.json',
  'product-flows': 'products/flows.json',
  'product-api-resources': 'products/api-resources.json',
  'product-autoprovision': 'products/autoprovision.json',
  'product-code': 'products/code.json',

  // Dashboard examples
  'dashboard-full-temperature-humidity': 'dashboards/full-dashboards/temperature_and_humidity_dashboard.json',
  'dashboard-full-gps-gnss': 'dashboards/full-dashboards/gps_and_gnss_dashboard.json',
  'dashboard-apex-widgets': 'dashboards/widgets/apex-chart-examples.json',
} as const;

export type ExampleCategory = keyof typeof EXAMPLE_CATEGORIES;

// ============================================================================
// CACHE
// ============================================================================

class ResourceCache {
  private cache = new Map<string, { content: string; timestamp: number }>();
  private TTL = 15 * 60 * 1000; // 15 minutes

  async get(uri: string, loader: () => Promise<string>): Promise<string> {
    const cached = this.cache.get(uri);
    if (cached && Date.now() - cached.timestamp < this.TTL) {
      return cached.content;
    }

    const content = await loader();
    this.cache.set(uri, { content, timestamp: Date.now() });
    return content;
  }

  clear(): void {
    this.cache.clear();
  }

  getCacheStats(): { size: number; entries: string[] } {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys())
    };
  }
}

const cache = new ResourceCache();

// ============================================================================
// MCP RESOURCE REGISTRATION
// ============================================================================

/**
 * Register all resources with the MCP server
 */
export function registerToolResources(server: McpServer) {
  for (const [key, meta] of Object.entries(RESOURCES)) {
    server.registerResource(
      key,
      meta.uri,
      {
        description: meta.description,
        mimeType: 'application/json',
      },
      async () => {
        const content = await cache.get(meta.uri, async () => {
          const filePath = join(__dirname, meta.path);
          return await readFile(filePath, 'utf-8');
        });

        return {
          contents: [
            {
              uri: meta.uri,
              mimeType: 'application/json',
              text: content,
            },
          ],
          _meta: { lastModified: new Date().toISOString() },
        };
      }
    );
  }
}

// ============================================================================
// EXAMPLE LOADING FUNCTIONS
// ============================================================================

/**
 * Get available example categories
 */
export function getAvailableExampleCategories(): string[] {
  return Object.keys(EXAMPLE_CATEGORIES);
}

/**
 * Get categories by prefix (e.g., 'product' returns all product examples)
 */
export function getCategoriesByPrefix(prefix: string): string[] {
  return Object.keys(EXAMPLE_CATEGORIES).filter(key => key.startsWith(prefix));
}

/**
 * Load an example by category
 */
export async function loadExample<T = unknown>(category: ExampleCategory): Promise<T> {
  const filename = EXAMPLE_CATEGORIES[category];

  if (!filename) {
    throw new Error(`Unknown example category: ${category}. Available: ${getAvailableExampleCategories().join(', ')}`);
  }

  const filePath = join(__dirname, filename);

  try {
    const content = await readFile(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (err: any) {
    throw new Error(`Failed to load example '${category}': ${err.message}`);
  }
}

/**
 * Load multiple examples by prefix
 */
export async function loadExamplesByPrefix<T = unknown>(prefix: string): Promise<Record<string, T>> {
  const categories = getCategoriesByPrefix(prefix) as ExampleCategory[];
  const results: Record<string, T> = {};

  for (const category of categories) {
    results[category] = await loadExample<T>(category);
  }

  return results;
}

// ============================================================================
// CACHE UTILITIES
// ============================================================================

export function getCacheStats() {
  return cache.getCacheStats();
}

export function clearCache() {
  cache.clear();
}
