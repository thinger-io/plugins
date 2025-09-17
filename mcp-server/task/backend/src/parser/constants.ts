export const PROPERTY_SOURCES = ['value', 'resource'] as const;
export const PAYLOAD_TYPES = ['source_payload', 'json', 'text'] as const;
export const UPDATE_STRATEGIES = ['events', 'interval', 'always'] as const;

export const BUCKET_BACKENDS = ['mongodb', 'timescale', 'influx'] as const;
export const RETENTION_UNITS = ['minutes', 'hours', 'days', 'weeks', 'months', 'years'] as const;

export type PropertySource = typeof PROPERTY_SOURCES[number];
export type PayloadType = typeof PAYLOAD_TYPES[number];
export type UpdateStrategy = typeof UPDATE_STRATEGIES[number];
export type BucketBackend = typeof BUCKET_BACKENDS[number];
export type RetentionUnit = typeof RETENTION_UNITS[number];

export const PROFILE_SCHEMA_VERSION = '1.0.0';
