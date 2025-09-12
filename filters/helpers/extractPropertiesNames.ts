export function extractPropertiesNames<T extends object>(
  arr: T[],
  propertyPath: string
): string[] {
  const uniqueValues = new Set<string>();
  const pathParts = propertyPath.split(".");

  const extractValue = (obj: T, parts: string[]): void => {
    const [current, ...rest] = parts;
    const value = (obj as Record<string, unknown>)[current];
    if (value === undefined || value === null) return;

    if (rest.length === 0) {
      if (Array.isArray(value)) value.forEach(v => uniqueValues.add(String(v)));
      else uniqueValues.add(String(value));
    } else {
      if (Array.isArray(value)) value.forEach(v => extractValue(v as T, rest));
      else extractValue(value as T, rest);
    }
  };

  arr.forEach(obj => extractValue(obj, pathParts));

  return Array.from(uniqueValues);
}
