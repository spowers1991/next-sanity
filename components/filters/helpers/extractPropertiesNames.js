export function extractPropertiesNames(arr, propertyPath) {
  const uniqueValuesSet = new Set();

  if (!Array.isArray(arr)) return [];

  // Split the property path into parts for nested access
  const pathParts = propertyPath.split(".");

  const extractValue = (obj, parts) => {
    if (!obj) return;

    const [current, ...rest] = parts;
    const value = obj[current];

    if (value === undefined || value === null) return;

    if (rest.length === 0) {
      // Last part of the path
      if (Array.isArray(value)) {
        value.forEach((v) => uniqueValuesSet.add(v));
      } else {
        uniqueValuesSet.add(value);
      }
    } else {
      // Not last part, drill down
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
