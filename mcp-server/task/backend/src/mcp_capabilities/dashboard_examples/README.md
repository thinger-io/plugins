# Dashboard Examples

This directory contains pre-configured dashboard widget examples for different IoT use cases. These examples serve as templates that can be used by LLM clients to understand dashboard structures and generate appropriate configurations.

## Purpose

The dashboard examples help:
- Demonstrate proper widget structure and configuration
- Show ApexCharts options formatting best practices
- Provide data source configuration examples
- Illustrate layout and styling patterns
- Serve as starting points for custom dashboards

## Structure

Each dashboard example is stored as a separate JSON file:

```
dashboard_examples/
├── index.ts                                    # Main module with loading functions
├── temperature_and_humidity_dashboard.json     # Temperature & humidity monitoring
├── power_monitoring_dashboard.json             # Three-phase voltage monitoring
├── energy_consumption_dashboard.json           # Energy consumption tracking
├── water_quality_dashboard.json                # Water quality metrics (pH, TDS, etc.)
└── README.md                                   # This file
```

## Available Categories

### 1. `temperature_and_humidity_dashboard`
Example for monitoring temperature and humidity sensors.
- Dual Y-axis configuration (temperature and humidity)
- 24-hour time range
- MongoDB bucket sources
- Smooth curve visualization

### 2. `power_monitoring_dashboard`
Example for three-phase voltage monitoring in electrical systems.
- Three voltage phase series (Ph1-N, Ph2-N, Ph3-N)
- Grid visualization with custom colors
- Mixed backend sources (MongoDB and InfluxDB examples)
- Advanced toolbar with zoom and pan controls

### 3. `energy_consumption_dashboard`
Example for tracking energy consumption over time.
- Area chart with gradient fill
- 7-day time range
- Energy units formatting (kWh)
- Real-time monitoring setup

### 4. `water_quality_dashboard`
Example for water quality monitoring (pH, TDS, Turbidity).
- Triple Y-axis configuration
- Multiple water quality parameters
- Custom value ranges (pH: 0-14)
- Color-coded series for different metrics

## Adding New Examples

To add a new dashboard example:

1. **Create the JSON file**
   ```bash
   touch src/dashboard_examples/my_new_dashboard.json
   ```

2. **Define the dashboard structure**
   ```json
   {
     "product": "my_product_type",
     "tab": 0,
     "widget": {
       "api": {},
       "layout": {
         "col": 0,
         "row": 0,
         "sizeX": 12,
         "sizeY": 8
       },
       "panel": {
         "color": "#1976D2",
         "currentColor": "#1976D2",
         "showFullscreen": true,
         "showOffline": { "type": "last_sample" },
         "subtitle": "Description",
         "title": "My Dashboard",
         "updateTs": 1730000000000
       },
       "properties": {
         "options": "var options = { ... };"
       },
       "sources": [
         {
           "bucket": { ... },
           "color": "#FF5722",
           "name": "Series Name",
           "source": "bucket",
           "timespan": { ... }
         }
       ],
       "type": "apex_charts"
     }
   }
   ```

3. **Update the index.ts file**
   Add your new category to the `DASHBOARD_CATEGORIES` constant:
   ```typescript
   export const DASHBOARD_CATEGORIES = {
     // ... existing categories
     'my_new_dashboard': 'my_new_dashboard.json'
   } as const;
   ```

4. **Update the tool registration**
   In `dashboards_tools.ts`, add the new category to the enum in the `inputSchema`:
   ```typescript
   category: z.enum([
     // ... existing categories
     'my_new_dashboard'
   ])
   ```

5. **Update the tool description**
   Add documentation for your new category in the tool's description field in `dashboards_tools.ts`.

## Usage in Code

The examples are accessed through the `Get-Dashboard-Example-By-Category` MCP tool:

```typescript
// Load a specific example
import { loadDashboardExample } from '../dashboard_examples/index.js';

const example = await loadDashboardExample('temperature_and_humidity_dashboard');

// Get all available categories
import { getAvailableCategories } from '../dashboard_examples/index.js';

const categories = getAvailableCategories();
console.log(categories); // ['temperature_and_humidity_dashboard', 'power_monitoring_dashboard', ...]

// Load all examples
import { getAllDashboardExamples } from '../dashboard_examples/index.js';

const allExamples = await getAllDashboardExamples();
```

## Important Notes

When using these examples:
- Update the `user` field in bucket sources with the actual Thinger.io username
- Modify bucket IDs to match your actual data buckets
- Adjust the `product` field to your target product identifier
- Customize colors, titles, and labels as needed
- Update timestamps (`updateTs`) to current values

## Best Practices

1. **Colors**: Use hexadecimal color codes (#RRGGBB) for consistency
2. **Options**: The 'options' field must be valid JavaScript code as a string
3. **Timestamps**: Use current timestamp in milliseconds for `updateTs`
4. **Backend Types**: Stick to 'mongodb', 'influxdb', or 'dynamodb'
5. **Tags**: Structure varies by backend - check your bucket configuration
6. **Layout**: Grid system typically has 12 columns width
7. **Documentation**: Always document new examples thoroughly
