export function extractPropertiesNames(
  arr: unknown[],
  propertyPath: string
): string[] {
  const uniqueValues = new Set<string>();
  const pathParts = propertyPath.split(".");

  const extractValue = (obj: unknown, parts: string[]): void => {
    if (typeof obj !== "object" || obj === null) return;

    const [current, ...rest] = parts;
    const value = (obj as Record<string, unknown>)[current];
    if (value === undefined || value === null) return;

    if (rest.length === 0) {
      if (Array.isArray(value)) value.forEach(v => uniqueValues.add(String(v)));
      else uniqueValues.add(String(value));
    } else {
      if (Array.isArray(value)) value.forEach(v => extractValue(v, rest));
      else extractValue(value, rest);
    }
  };

  arr.forEach(obj => extractValue(obj, pathParts));

  return Array.from(uniqueValues);
}
