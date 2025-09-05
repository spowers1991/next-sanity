import { getNestedValues } from "../helpers/getNestedValues";

/**
 * Updates a list of items based on dynamic filter criteria.
 * Supports nested properties via dot-notation (e.g., "castMembers.characterName").
 *
 * @template T - Type of the items to filter
 * @param itemsToFilter - The array of items to filter
 * @param filters - Object mapping property paths to filter values (string or string[])
 * @param setFilteredItems - Callback to set the filtered items
 */
export function updateFilters<T extends Record<string, any>>(
  itemsToFilter: T[],
  filters: Record<string, string | string[]>,
  setFilteredItems: (items: T[]) => void
): void {

  // Filter items
  const filteredItems = itemsToFilter.filter(item => {
    return Object.keys(filters).every(propertyPath => {
      const filterValue = filters[propertyPath];
      const pathParts = propertyPath.split(".");
      const itemValues = getNestedValues(item, pathParts);

      // Handle array of filter options
      if (Array.isArray(filterValue)) {
        const valuesAsStrings = itemValues.map(v =>
          typeof v === "object" && v?.title ? String(v.title) : String(v)
        );

        // If no filter selected, include all
        if (filterValue.length === 0) return true;

        return filterValue.every(val => valuesAsStrings.includes(val));
      }

      // Handle single string filter
      if (typeof filterValue === "string") {
        return itemValues.some(v => {
          if (typeof v === "string") return v.toLowerCase().includes(filterValue.toLowerCase());
          if (v?.title) return v.title.toLowerCase().includes(filterValue.toLowerCase());
          return false;
        });
      }

      // Default include
      return true;
    });
  });

  // Update state
  setFilteredItems(filteredItems);
}
