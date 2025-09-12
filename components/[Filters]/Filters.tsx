"use client";

import React, { useEffect } from "react";
import FilteredListing from "./[FilteredListing]/FilteredListing";
import Button from "../[Button]/Button";
import { FilteredItem } from "@/lib/filters/types/FilteredItem";
import { useFilters } from "@/lib/filters/state/FiltersContext";
import FiltersOptions from "./[FiltersOptions]/FiltersOptions";

interface FilterConfigItem {
  type: "checkbox" | "textSearch";
  label: string;
  propertyToSearch: string;
}

interface FilterProps {
  itemsToFilter: FilteredItem[];
  filtersToShow: FilterConfigItem[];
}

const Filters: React.FC<FilterProps> = ({ itemsToFilter, filtersToShow }) => {
  const {
    STATE_filtersOptions,
    STATE_itemsToFilter,
    STATE_filteredItems,
    STATE_setItemsToFilter,
    STATE_setShowAnimation,
    STATE_clearFilters,
  } = useFilters();

  // Initialize items to filter
  useEffect(() => {
    STATE_setItemsToFilter(itemsToFilter);
  }, [itemsToFilter, STATE_setItemsToFilter]);

  return (
    <div className="container">
      <div className="grid grid-cols-2 gap-6 w-full">
        <div className="flex flex-col gap-6 bg-white p-6">
          {/* Clear Filters Button */}
          {Object.keys(STATE_filtersOptions).length > 0 && (
            <Button
              label="Clear Filters"
              onClick={() => {
                STATE_clearFilters();
                STATE_setShowAnimation(true);
              }}
              className="bg-red-900 text-white p-3"
            />
          )}

          {/* Pass filtersToShow down */}
          <FiltersOptions
            itemsToFilter={STATE_itemsToFilter}
            filtersToShow={filtersToShow}
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
