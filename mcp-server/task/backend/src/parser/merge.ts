export function deepMerge<T extends object, U extends object>(target: T, source: U): T & U {
  const output: any = { ...target };
  for (const [k, v] of Object.entries(source)) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      output[k] = deepMerge((output as any)[k] ?? {}, v as any);
    } else {
      output[k] = v;
    }
  }
  return output;
}
