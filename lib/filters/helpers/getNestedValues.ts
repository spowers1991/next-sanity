export function getNestedValues<T extends Record<string, unknown>>(
  obj: T | undefined,
  pathParts: string[]
): unknown[] {
  if (!obj) return [];

  const [current, ...rest] = pathParts;
  const value = obj[current as keyof T];

  if (value === undefined || value === null) return [];

  if (rest.length === 0) {
    return Array.isArray(value) ? value : [value];
  }

  if (Array.isArray(value)) {
    return value.flatMap(v => getNestedValues(v as T, rest));
  }

  return getNestedValues(value as T, rest);
}