"use client";

import React from "react";
import FilteredListing from "./[FilteredListing]/FilteredListing";
import Button from "../[Button]/Button";
import { useFilters } from "@/lib/filters/state/FiltersContext";
import type { FiltersConfig } from "@/lib/filters/types/FiltersConfig";
import FiltersOptions from "./[FiltersOptions]/FiltersOptions";

interface FilterProps {
  itemsToFilter: unknown[];
  filtersOptions: FiltersConfig[];
}

const Filters: React.FC<FilterProps> = ({ itemsToFilter, filtersOptions }) => {
  const {
    STATE_setupFilters,
    STATE_filtersValues,
    STATE_setShowAnimation,
    STATE_clearFilters,
  } = useFilters();

  STATE_setupFilters(itemsToFilter, filtersOptions);

  return (
    <div className="container">
      <div className="grid grid-cols-2 gap-6 w-full">
        <div className="flex flex-col gap-6 bg-white p-6">
          {Object.keys(STATE_filtersValues).length > 0 && (
            <Button
              label="Clear Filters"
              onClick={() => {
                STATE_clearFilters();
                STATE_setShowAnimation(true);
              }}
              className="bg-red-900 text-white p-3"
            />
          )}

          <FiltersOptions />
        </div>

        <div className="w-full">
          <FilteredListing />
        </div>
      </div>
    </div>
  );
};

export default Filters;
