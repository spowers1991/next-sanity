/**
 * Updates a list of items based on dynamic filter criteria.
 * Supports nested properties via dot-notation (e.g., "castMembers.characterName").
 *
 * @template T - Type of the items to filter
 * @param itemsToFilter - The array of items to filter
 * @param filters - Object mapping property paths to filter values (string or string[])
 * @param setFilteredItems - Callback to set the filtered items
 */
export function updateFilters<T extends object>(
  itemsToFilter: unknown[],
  filters: Record<string, string | string[]>,
  setFilteredItems: (items: unknown[]) => void
): void {
  /**
   * Recursively retrieves values from an object based on a dot-notation path.
   *
   * @param obj - Object to traverse
   * @param pathParts - Array of property keys
   * @returns Array of values found at the specified path
   */
  const getNestedValues = (obj: unknown, pathParts: string[]): unknown[] => {
    if (!obj || typeof obj !== "object") return [];

    const [current, ...rest] = pathParts;
    const value = (obj as Record<string, unknown>)[current];

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
  };

  const filteredItems = itemsToFilter.filter(item => {
    return Object.keys(filters).every(propertyPath => {
      const filterValue = filters[propertyPath];
      const pathParts = propertyPath.split(".");
      const itemValues = getNestedValues(item, pathParts);

      // Handle array of filter options
      if (Array.isArray(filterValue)) {
        const valuesAsStrings = itemValues.map(v => {
          if (typeof v === "string") return v;
          if (v && typeof v === "object" && "title" in v) {
            return String((v as { title: string }).title);
          }
          return String(v);
        });

        // If no filter selected, include all
        if (filterValue.length === 0) return true;

        return filterValue.every(val => valuesAsStrings.includes(val));
      }

      // Handle single string filter
      if (typeof filterValue === "string") {
        return itemValues.some(v => {
          if (typeof v === "string") return v.toLowerCase().includes(filterValue.toLowerCase());
          if (v && typeof v === "object" && "title" in v) {
            return String((v as { title: string }).title)
              .toLowerCase()
              .includes(filterValue.toLowerCase());
          }
          return false;
        });
      }

      return true;
    });
  });

  setFilteredItems(filteredItems);
}