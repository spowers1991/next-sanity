"use client";

import React, { useEffect } from "react";
import Checkbox from "./selectors/[checkbox]/Checkbox";
import FilteredListing from "./FilteredListing";
import { updateFilters } from "./actions/updateFilters";
import { useFilters } from "./state/FiltersContext";
import { FilteredItem } from "./types/FilteredItem";

interface FilterProps {
  itemsToFilter: FilteredItem[];
}

const Filters: React.FC<FilterProps> = ({ itemsToFilter }) => {
  // Destructure filter state and setters from context
  const {
    STATE_filtersOptions,
    STATE_itemsToFilter,
    STATE_filteredItems,
    STATE_setFiltersOptions,
    STATE_setItemsToFilter,
    STATE_setFilteredItems,
  } = useFilters();

  /**
   * Updates the selected filter options for a given property path
   */
  const filtersHandler = (selectedOptions: string[], propertyPath: string) => {
    STATE_setFiltersOptions((prevFilters) => ({
      ...prevFilters,
      [propertyPath]: selectedOptions,
    }));
  };

  /**
   * Effect: update filtered items whenever the filters or base items change
   */
  useEffect(() => {
    // Keep context items in sync with props
    STATE_setItemsToFilter(itemsToFilter);

    // Apply filters
    updateFilters(STATE_itemsToFilter, STATE_filtersOptions, STATE_setFilteredItems);
  }, [itemsToFilter, STATE_itemsToFilter, STATE_filtersOptions]);

  return (
    <div className="container flex m-auto w-full">
      <div className="grid grid-cols-2 gap-6 w-full">
        {/* Filter Sidebar */}
        <div className="flex flex-col gap-6 bg-white p-6">
          <Checkbox
            itemsToFilter={STATE_itemsToFilter}
            label="Cast Members"
            propertyToSearch="castMembers.characterName"
            filtersOptions={STATE_filtersOptions}     
            setFiltersOptions={STATE_setFiltersOptions} 
            filtersHandler={filtersHandler}
          />
        </div>

        {/* Filtered Listing */}
        <div className="w-full">
          <FilteredListing filteredItems={STATE_filteredItems} />
        </div>
      </div>
    </div>
  );
};

export default Filters;
