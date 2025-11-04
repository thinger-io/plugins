import { z } from 'zod';

///////////////////////////////////// PRODUCTS SCHEMAS /////////////////////////////////////////

export const autoProvisionSchema = z.record(
  z.string().describe("Autoprovisioning ID"), // Autoprisioning ID (key)
  z.object({
    "config": z.object({
      "mode": z.enum(['pattern']),
      "pattern": z.string()
    }),
    "enabled": z.boolean(),
  }).strict()
);

// The following schema is used in multiple places, so we define it separately
const dataSourceSchema = z.union([
  z.object({
    source: z.literal("event"),
    payload_type: z.literal("source_payload"),
    payload_function: z.string().optional(),
    event: z.enum(["device_callback_call", "device_property_create", "device_property_update",
      "device_resource_request_failed", "device_state_change", "device_stats_data",
      "device_topic_subscribe", "device_topic_unsubscribe"]),
    payload: z.string().default("{{payload}}").optional(),
  }).strict(),

  z.object({
    source: z.literal("topic"),
    payload_type: z.literal("source_payload"),
    payload_function: z.string().optional(),
    topic: z.string(),
    payload: z.string().default("{{payload}}").optional(),
  }).strict(),

  z.object({
    target: z.literal("resource_stream"),
    resource_stream: z.string(),
    payload: z.string().optional(),
    payload_function: z.string().optional(),
    payload_type: z.string().optional(),
  }).strict(),

  z.object({
    source: z.literal("resource"),
    resource: z.string(),
    update: z.enum(['events']).default('events'),
    payload: z.string().optional(),
    payload_function: z.string().optional(),
    payload_type: z.string().optional(),
  }).strict(),
]);

const dataTargetSchema = z.union([
  z.object({
    target: z.literal("endpoint_call"),
    endpoint: z.string(),
    payload: z.string().optional(),
    payload_function: z.string().optional(),
    payload_type: z.string().optional(),
  }).strict(),

  z.object({
    target: z.literal("resource_stream"),
    resource_stream: z.string(),
    payload: z.string().optional(),
    payload_function: z.string().optional(),
    payload_type: z.string().optional(),
  }).strict(),

  z.object({
    target: z.literal("topic"),
    topic: z.string(),
    payload: z.string().optional(),
    payload_function: z.string().optional(),
    payload_type: z.string().optional(),
  }).strict(),
]);

const apiResourceRequestDataSchema = z.union([
  ...dataSourceSchema.options,
  z.object({
    target: z.literal("plugin_endpoint"),
    plugin: z.string(),
    path: z.string(),
    payload: z.string().optional(),
    payload_function: z.string().optional(),
    payload_type: z.string().optional(),
  }).strict(),
]);

const apiResourceResponseDataSchema = z.union([
  ...dataTargetSchema.options, // Incluye todos los tipos genéricos
  z.object({
    source: z.literal("request_response"),
    payload: z.string().optional(),
    payload_function: z.string().optional(),
    payload_type: z.string().optional(),
  }).strict(),
]);

export const propertyItemSchema = z.object({
  enabled: z.boolean().default(true),
  default: z.object({}).passthrough().optional(),
  data: dataSourceSchema,
});

export const bucketItemSchema = z.object({
  enabled: z.boolean().default(true),
  backend: z.enum(['mongodb', 'influxdb']).default('mongodb'),
  retention: z.object({
    period: z.number(),
    unit: z.enum(['hours', 'days', 'weeks', 'months', 'years'])
  }),
  tags: z.array(z.string()).optional(),
  data: dataSourceSchema,
}).strict();

export const flowsItemSchema = z.object({
  enabled: z.boolean().default(true),
  split_data: z.boolean().default(false),

  data: dataSourceSchema,
  sink: dataTargetSchema,
}).strict();

export const apiResourceItemSchema = z.object({
  enabled: z.boolean().default(true),
  handle_connectivity: z.boolean().optional(),
  device_id_resolver: z.string().optional(),

  request: z.object({
    data: apiResourceRequestDataSchema,
  }).strict(),

  response: z.object({
    data: apiResourceResponseDataSchema,
  }).strict().optional(),
}).strict();

export const autoprovisionItemSchema = z.object({
  config: z.object({
    mode: z.enum(['pattern']),
    pattern: z.string().describe("Regular expression pattern to match device IDs")
  }),
  enabled: z.boolean(),
}).strict();

///////////////////////////////////// DASHBOARDS AND WIDGETS SCHEMAS /////////////////////////////////////////

const widgetLayoutSchema = z.object({
  col: z.number(),
  row: z.number(),
  sizeX: z.number(),
  sizeY: z.number()
});

const widgetPanelSchema = z.object({
  color: z.string(),
  currentColor: z.string(),
  showOffline: z.object({ type: z.string() }),
  title: z.string()
});

export const apexChartWidgetSchema = z.object({
  layout: widgetLayoutSchema,
  panel: widgetPanelSchema,
  properties: z.object({
    alignTimeSeries: z.boolean(),
    dataAppend: z.boolean(),
    options: z.string(),
    realTimeUpdate: z.boolean()
  }),
  sources: z.array(
    z.union([
      z.object({
        aggregation: z.object({ period: z.string(), type: z.string() }),
        bucket: z.object({
          backend: z.string(),
          id: z.string(),
          mapping: z.string(),
          tags: z.object({
            device: z.array(z.unknown()),
            group: z.array(z.unknown())
          })
        }),
        color: z.string(),
        device_property: z.object({
          device: z.string(),
          mapping: z.string(),
          property: z.string()
        }),
        name: z.string(),
        source: z.string(),
        timespan: z.object({
          magnitude: z.string(),
          mode: z.string(),
          value: z.number()
        }),
        transform: z.string()
      }),
      z.object({
        aggregation: z.object({}),
        color: z.string(),
        device_bucket: z.object({
          backend: z.string(),
          device: z.string(),
          id: z.string(),
          mapping: z.string(),
          tags: z.object({
            device: z.array(z.unknown()),
            group: z.array(z.unknown())
          })
        }),
        name: z.string(),
        source: z.string(),
        timespan: z.object({ mode: z.string() })
      }),
      z.object({
        color: z.string(),
        device: z.object({
          id: z.string(),
          mapping: z.string(),
          resource: z.string()
        }),
        name: z.string(),
        source: z.string(),
        timespan: z.object({ magnitude: z.string(), value: z.number() })
      }),
      z.object({
        color: z.string(),
        device_property: z.object({ device: z.string(), property: z.string() }),
        name: z.string(),
        source: z.string(),
        timespan: z.object({ magnitude: z.string(), value: z.number() })
      })
    ])
  ),
  type: z.literal("apex_charts"),
})
