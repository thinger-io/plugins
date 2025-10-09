import { z } from 'zod';

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

export const bucketItemSchema = z.object({
  id: z.string().min(1).describe("Unique Bucket ID (object key in profile.buckets)"),
  enabled: z.boolean().default(true),
  backend: z.enum(['mongodb', 'influxdb']).default('mongodb'),
  retention: z.object({
    period: z.number(),
    unit: z.enum(['hours', 'days', 'weeks', 'months', 'years'])
  }),
  tags: z.array(z.string()).optional(),
  data: z.union([
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
  ]),
}).strict();

export const flowsItemSchema = z.object({
  id: z.string().min(1).describe("Unique Flow ID (object key in profile.api)"),
  enabled: z.boolean().default(true),
  split_data: z.boolean().default(false),

  data: z.union([
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
  ]),

  sink: z.union([
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
  ]),
}).strict();

export const apiResourceItemSchema = z.object({
  id: z.string().min(1).describe("Unique API resource ID (object key in profile.api)"),
  enabled: z.boolean().default(true),
  handle_connectivity: z.boolean().optional(),
  device_id_resolver: z.string().optional(),

  request: z.object({
    data: z.union([
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
    ]),
  }).strict(),

  response: z.object({
    data: z.union([
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
        source: z.literal("topic"),
        topic: z.string(),
        publish_source: z.enum(['any', '']).default('any'),
        payload: z.string().optional(),
        payload_function: z.string().optional(),
        payload_type: z.string().optional(),
      }).strict(),
    ]),
  }).strict().optional(),
}).strict();

export const profileSchema = z.object({
  properties: z.object({}).passthrough().optional()
    .describe("Optional: product properties object"),
  buckets: z.object({}).passthrough().optional()
    .describe("Optional: data buckets object"),
  flows: z.object({}).passthrough().optional()
    .describe("Optional: flows object"),
  endpoints: z.object({}).passthrough().optional()
    .describe("Optional: endpoints object"),
  api: z.object({}).passthrough().optional()
    .describe("Optional: API resources object. Build it with 'Build Product API Resources' and paste here."),
  autoprovisions: autoProvisionSchema.optional()
    .describe("Optional: autoprovisioning JSON. Build it with 'Build Product Autoprovisions' and paste here."),
}).strict();
