/**
 * Recursively retrieves values from an object based on a dot-notation path.
 *
 * @param obj - Object to traverse
 * @param pathParts - Array of property keys
 * @returns Array of values found at the specified path
 */
export function getNestedValues(obj: any, pathParts: string[]): any[] {
  if (!obj) return [];

  const [current, ...rest] = pathParts;
  const value = obj[current];

  if (value === undefined || value === null) return [];

  if (rest.length === 0) {
    // Last part of path
    return Array.isArray(value) ? value : [value];
  }

  // Not last part, drill deeper
  if (Array.isArray(value)) {
    return value.flatMap(v => getNestedValues(v, rest));
  }

  return getNestedValues(value, rest);
}
