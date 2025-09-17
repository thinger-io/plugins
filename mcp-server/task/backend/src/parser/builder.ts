import { ProductConfig } from './schema';
import { deepMerge } from './merge';
import { validateProperties, validateBuckets, validateApi, validateAutoprovisions, validateFlows, validateFinalConfig} from './validator';

export class ProductConfigBuilder {
  private state: ProductConfig = {
    properties: {},
    buckets: {},
    flows: {},
    api: {},
    autoprovisions: {}
  };

  get snapshot(): ProductConfig { return this.state; }

  addProperties(input: unknown) {
    const res = validateProperties(input);
    if (!res.ok) return res;
    this.state = deepMerge(this.state, { properties: res.value });
    return { ok: true as const, value: res.value };
  }

  addBuckets(input: unknown) {
    const res = validateBuckets(input);
    if (!res.ok) return res;
    this.state = deepMerge(this.state, { buckets: res.value });
    return { ok: true as const, value: res.value };
  }

  addFlows(input: unknown) {
    const res = validateFlows(input);
    if (!res.ok) return res;
    this.state = deepMerge(this.state, { flows: res.value });
    return { ok: true as const, value: res.value };
  }

  addApi(input: unknown) {
    const res = validateApi(input);
    if (!res.ok) return res;
    this.state = deepMerge(this.state, { api: res.value });
    return { ok: true as const, value: res.value };
  }

  addAutoprovisions(input: unknown) {
    const res = validateAutoprovisions(input);
    if (!res.ok) return res;
    this.state = deepMerge(this.state, { autoprovisions: res.value });
    return { ok: true as const, value: res.value };
  }

  finalize() {
    return validateFinalConfig(this.state);
  }
}
