export function updateFilters(itemsToFilter, filters, setFilteredItems) {
  // Helper to get nested values from an object based on a path
  const getNestedValues = (obj, pathParts) => {
    if (!obj) return [];

    const [current, ...rest] = pathParts;
    const value = obj[current];

    if (value === undefined || value === null) return [];

    if (rest.length === 0) {
      // Last part of path
      if (Array.isArray(value)) return value;
      return [value];
    } else {
      if (Array.isArray(value)) {
        return value.flatMap(v => getNestedValues(v, rest));
      } else {
        return getNestedValues(value, rest);
      }
    }
  };

  const newFilteredStories = itemsToFilter.filter(item => {
    return Object.keys(filters).every(propertyToSearch => {
      const filterValue = filters[propertyToSearch];
      const pathParts = propertyToSearch.split(".");
      const itemValues = getNestedValues(item, pathParts);

      if (Array.isArray(filterValue)) {
        const itemPropertyArray = itemValues.map(v =>
          typeof v === "object" && v?.title ? v.title : String(v)
        );

        return (
          filterValue.length === 0 ||
          filterValue.every(val => itemPropertyArray.includes(val))
        );
      } else if (typeof filterValue === "string") {
        return itemValues.some(v => {
          if (typeof v === "string") return v.toLowerCase().includes(filterValue.toLowerCase());
          if (v?.title) return v.title.toLowerCase().includes(filterValue.toLowerCase());
          return false;
        });
      }

      return true;
    });
  });

  setFilteredItems(newFilteredStories);
}
