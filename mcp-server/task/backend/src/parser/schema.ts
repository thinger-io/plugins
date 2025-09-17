import { z } from 'zod';


// PROPERTIES
export const PROPERTY_SOURCES = ['topic', 'resource', 'event', 'stream'] as const;
export const PROPERTY_PAYLOAD_TYPES = ['source_payload', 'json', 'text'] as const;
export const PROPERTY_UPDATES = ['events', 'interval', 'always'] as const;

// BUCKETS
export const BUCKET_BACKENDS = ['mongodb', 'influxdb'] as const;
export const BUCKET_RETENTION_UNITS = ['minutes', 'hours', 'days', 'weeks', 'months', 'years'] as const;
export const BUCKET_PAYLOAD_TYPES = ['source_payload', 'json', 'text'] as const;
export const BUCKET_SOURCES = ['topic', 'resource', 'event', 'stream'] as const;
export const BUCKET_UPDATES = ['events', 'interval', 'always'] as const;

// FLOWS
export const FLOW_EVENT_TYPES = [
  'device_property_update',
  'device_connected',
  'device_disconnected',
] as const;
export const FLOW_SOURCE_TYPES = ['event'] as const;
export const FLOW_SINK_TARGETS = ['resource', 'endpoint_call'] as const;

// API
export const API_REQUEST_TARGETS = ['endpoint_call', 'resource_stream'] as const;

// AUTOPROVISIONS
export const AUTOPROVISION_MODES = ['pattern', 'script'] as const;


// PROPERTIES SCHEMA
export const PropertyDataSchema = z.object({
  payload: z.string().default(''),
  payload_function: z.string().default(''),
  payload_type: z.enum(PROPERTY_PAYLOAD_TYPES),
  resource: z.string().min(1),
  source: z.enum(PROPERTY_SOURCES),
  update: z.enum(PROPERTY_UPDATES),
}).strict();

export const PropertySchema = z.object({
  data: PropertyDataSchema,
  default: z.record(z.unknown()).optional().default({}),
  enabled: z.boolean().optional().default(true),
  description: z.string().optional().default(''),
}).strict();

export const PropertiesSchema = z.record(PropertySchema).default({});

export type Properties = z.infer<typeof PropertiesSchema>;

// BUCKETS SCHEMA

export const BucketRetentionSchema = z.object({
  period: z.number().int().positive(),
  unit: z.enum(BUCKET_RETENTION_UNITS),
}).strict();

export const BucketDataSchema = z.object({
  payload: z.string().default(''),
  payload_function: z.string().default(''),
  payload_type: z.enum(BUCKET_PAYLOAD_TYPES),
  resource: z.string().min(1),
  source: z.enum(BUCKET_SOURCES),
  update: z.enum(BUCKET_UPDATES),
}).strict();

export const BucketSchema = z.object({
  backend: z.enum(BUCKET_BACKENDS),
  data: BucketDataSchema,
  enabled: z.boolean().optional().default(true),
  retention: BucketRetentionSchema.optional(),
  tags: z.array(z.string()).optional().default([]),
  description: z.string().optional().default(''),
}).strict();

export const BucketsSchema = z.record(BucketSchema).default({});

export type Buckets = z.infer<typeof BucketsSchema>;

// FLOWS SCHEMA
const FlowInputEventSchema = z.object({
  source: z.enum(FLOW_SOURCE_TYPES), // 'event'
  event: z.enum(FLOW_EVENT_TYPES),
  filter: z.object({
    property: z.string().min(1),
  }).partial().default({}),
  payload: z.string().default(''),
  payload_function: z.string().default(''),
  payload_type: z.string().default('source_payload'), // abreviado; si prefieres enum, cámbialo
}).strict();

const FlowSinkResourceSchema = z.object({
  target: z.literal('resource'),
  resource: z.string().min(1),
  payload: z.string().default(''),
  payload_function: z.string().default(''),
  payload_type: z.string().default('source_payload'),
}).strict();

const FlowSinkEndpointCallSchema = z.object({
  target: z.literal('endpoint_call'),
  endpoint: z.string().min(1),
  payload: z.string().default(''),
  payload_function: z.string().default(''),
  payload_type: z.string().default('source_payload'),
}).strict();

const FlowSinkSchema = z.discriminatedUnion('target', [
  FlowSinkResourceSchema,
  FlowSinkEndpointCallSchema,
]);

export const FlowSchema = z.object({
  data: FlowInputEventSchema,
  enabled: z.boolean().default(true),
  sink: FlowSinkSchema,
  split_data: z.boolean().default(false),
  description: z.string().optional().default(''),
}).strict();

export const FlowsSchema = z.record(FlowSchema).default({});

export type Flows = z.infer<typeof FlowsSchema>;

// API SCHEMA
const ApiRequestDataEndpointCallSchema = z.object({
  target: z.literal('endpoint_call'),
  endpoint: z.string().default(''),
  payload: z.string().default(''),
  payload_function: z.string().default(''),
  payload_type: z.string().default(''), // en tu ejemplo queda ""
}).strict();

const ApiRequestDataResourceStreamSchema = z.object({
  target: z.literal('resource_stream'),
  resource_stream: z.string().min(1),
  payload: z.string().default(''),
  payload_function: z.string().default(''),
  payload_type: z.string().default('source_payload'),
}).strict();

const ApiRequestDataSchema = z.discriminatedUnion('target', [
  ApiRequestDataEndpointCallSchema,
  ApiRequestDataResourceStreamSchema,
]);

const ApiRequestSchema = z.object({
  data: ApiRequestDataSchema,
}).strict();

const ApiResponseSchema = z.object({
  data: z.record(z.unknown()).default({}),
}).strict();

const ApiBaseSchema = z.object({
  enabled: z.boolean().default(true),
  handle_connectivity: z.boolean().default(false),
  request: ApiRequestSchema,
  response: ApiResponseSchema,
  description: z.string().optional().default(''),
}).strict();

const ApiUplinkSchema = ApiBaseSchema.extend({
  device_id_resolver: z.string().default(''),
  handle_connectivity: z.boolean().default(true),
}).strict();

const ApiGenericEndpointSchema = ApiBaseSchema;

const ApiEndpointSchema = z.union([ApiUplinkSchema, ApiGenericEndpointSchema]);

export const ApiSchema = z.record(ApiEndpointSchema).default({});

export type Api = z.infer<typeof ApiSchema>;

// AUTOPROVISIONS SCHEMA

const AutoprovisionConfigPatternSchema = z.object({
  mode: z.literal('pattern'),
  pattern: z.string().min(1),
}).strict();

const AutoprovisionConfigScriptSchema = z.object({
  mode: z.literal('script'),
  resolver_function: z.string().min(1),
}).strict();

const AutoprovisionConfigSchema = z.discriminatedUnion('mode', [
  AutoprovisionConfigPatternSchema,
  AutoprovisionConfigScriptSchema,
]);

export const AutoprovisionItemSchema = z.object({
  config: AutoprovisionConfigSchema,
  enabled: z.boolean().default(true),
  description: z.string().optional().default(''),
}).strict();

export const AutoprovisionsSchema = z.record(AutoprovisionItemSchema).default({});

export type Autoprovisions = z.infer<typeof AutoprovisionsSchema>;



export const ProductConfigSchema = z.object({
  properties: PropertiesSchema.optional().default({}),
  buckets: BucketsSchema.optional().default({}),
  flows: FlowsSchema.optional().default({}),
  api: ApiSchema.optional().default({}),
  autoprovisions: AutoprovisionsSchema.optional().default({}),
}).strict();

export type ProductConfig = z.infer<typeof ProductConfigSchema>;
