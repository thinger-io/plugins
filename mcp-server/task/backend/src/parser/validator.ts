import { z, ZodError } from 'zod';
import {
  PropertiesSchema, BucketsSchema, FlowsSchema, ApiSchema, AutoprovisionsSchema, ProductConfigSchema,
} from './schema.js';

type Issue = { path: string; message: string };
export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; errors: Issue[] };

const fmt = (e: ZodError): Issue[] => e.issues.map(i => ({ path: i.path.join('.'), message: i.message }));

export const validateProperties = (input: unknown): ValidationResult<ReturnType<typeof PropertiesSchema.parse>> => {
  try { return { ok: true, value: PropertiesSchema.parse(input ?? {}) }; }
  catch (e) { return { ok: false, errors: fmt(e as ZodError) }; }
};

export const validateBuckets = (input: unknown): ValidationResult<ReturnType<typeof BucketsSchema.parse>> => {
  try { return { ok: true, value: BucketsSchema.parse(input ?? {}) }; }
  catch (e) { return { ok: false, errors: fmt(e as ZodError) }; }
};

export const validateFlows = (input: unknown): ValidationResult<ReturnType<typeof FlowsSchema.parse>> => {
  try { return { ok: true, value: FlowsSchema.parse(input ?? {}) }; }
  catch (e) { return { ok: false, errors: fmt(e as ZodError) }; }
};

export const validateApi = (input: unknown): ValidationResult<ReturnType<typeof ApiSchema.parse>> => {
  try { return { ok: true, value: ApiSchema.parse(input ?? {}) }; }
  catch (e) { return { ok: false, errors: fmt(e as ZodError) }; }
};

export const validateAutoprovisions = (input: unknown): ValidationResult<ReturnType<typeof AutoprovisionsSchema.parse>> => {
  try { return { ok: true, value: AutoprovisionsSchema.parse(input ?? {}) }; }
  catch (e) { return { ok: false, errors: fmt(e as ZodError) }; }
};

export const validateFinalConfig = (input: unknown): ValidationResult<ReturnType<typeof ProductConfigSchema.parse>> => {
  try { return { ok: true, value: ProductConfigSchema.parse(input ?? {}) }; }
  catch (e) { return { ok: false, errors: fmt(e as ZodError) }; }
};
