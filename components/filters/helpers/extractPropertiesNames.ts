export function extractPropertiesNames<T extends Record<string, any>>(
  arr: T[],
  propertyPath: string
): string[] {
  const uniqueValuesSet = new Set<string>();

  if (!Array.isArray(arr)) return [];

  const pathParts = propertyPath.split(".");

  const extractValue = (obj: any, parts: string[]) => {
    if (!obj) return;

    const [current, ...rest] = parts;
    const value = obj[current];

    if (value === undefined || value === null) return;

    if (rest.length === 0) {
      // Last part of the path
      if (Array.isArray(value)) {
        value.forEach((v) => uniqueValuesSet.add(String(v)));
      } else {
        uniqueValuesSet.add(String(value));
      }
    } else {
      // Not last part → drill deeper
      if (Array.isArray(value)) {
        value.forEach((v) => extractValue(v, rest));
      } else {
        extractValue(value, rest);
      }
    }
  };

  arr.forEach((obj) => extractValue(obj, pathParts));

  return Array.from(uniqueValuesSet);
}
