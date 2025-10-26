import { useEffect } from "react";
import { FiltersConfig } from "@/lib/filters/types/FiltersConfig";

export const useSetupFilters = (
  itemsToFilter: unknown[],
  filtersOptions: FiltersConfig[],
  STATE_setItemsToFilter: React.Dispatch<React.SetStateAction<unknown[]>>,
  STATE_setFiltersOptions: React.Dispatch<React.SetStateAction<FiltersConfig[]>>
) => {
  useEffect(() => {
    STATE_setItemsToFilter(itemsToFilter);
    STATE_setFiltersOptions(filtersOptions);
  }, [itemsToFilter, filtersOptions, STATE_setItemsToFilter, STATE_setFiltersOptions]);
};
