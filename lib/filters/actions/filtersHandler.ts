// filtersOptionsHandler.ts

export const filtersOptionsHandler = (
  propertyPath: string,
  selectedOptions: string[],
  setFiltersOptions: React.Dispatch<React.SetStateAction<Record<string, string[]>>>
) => {
  setFiltersOptions(prev => {
    const newFilters = { ...prev };

    if (selectedOptions.length === 0) {
      // remove key if no options selected
      delete newFilters[propertyPath];
    } else {
      newFilters[propertyPath] = selectedOptions;
    }

    return newFilters;
  });
};
