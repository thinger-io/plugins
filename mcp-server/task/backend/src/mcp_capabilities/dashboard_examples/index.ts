import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface DashboardWidget {
  type: string;  // 'donutchart', 'chart', 'html_time', 'apex_charts', etc.
  layout: {
    col: number;
    row: number;
    sizeX: number;
    sizeY: number;
  };
  panel: any;
  properties: any;
  sources: any[];
}

export interface DashboardTab {
  name: string;
  widgets: DashboardWidget[];
}

export interface DashboardExample {
  tabs: DashboardTab[];
}

export const DASHBOARD_CATEGORIES = {
  'temperature_and_humidity_dashboard': 'temperature_and_humidity_dashboard.json',
} as const;

export type DashboardCategory = keyof typeof DASHBOARD_CATEGORIES;

/**
 * Get available dashboard categories
 */
export function getAvailableCategories(): string[] {
  return Object.keys(DASHBOARD_CATEGORIES);
}

/**
 * Load a dashboard example by category
 */
export async function loadDashboardExample(category: DashboardCategory): Promise<DashboardExample> {
  const filename = DASHBOARD_CATEGORIES[category];

  if (!filename) {
    throw new Error(`Unknown dashboard category: ${category}. Available categories: ${getAvailableCategories().join(', ')}`);
  }

  const filePath = join(__dirname, filename);

  try {
    const content = await readFile(filePath, 'utf-8');
    return JSON.parse(content) as DashboardExample;
  } catch (err: any) {
    throw new Error(`Failed to load dashboard example for category '${category}': ${err.message}`);
  }
}

/**
 * Get all dashboard examples
 */
export async function getAllDashboardExamples(): Promise<Record<DashboardCategory, DashboardExample>> {
  const examples: any = {};

  for (const category of Object.keys(DASHBOARD_CATEGORIES) as DashboardCategory[]) {
    examples[category] = await loadDashboardExample(category);
  }

  return examples;
}
