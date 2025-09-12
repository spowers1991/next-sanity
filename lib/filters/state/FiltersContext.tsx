"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { FilteredItem } from "../types/FilteredItem";
import { updateFilters } from "../actions/updateFilters";

interface FiltersContextType {
  STATE_filtersOptions: Record<string, string[]>;
  STATE_itemsToFilter: FilteredItem[];
  STATE_filteredItems: FilteredItem[];
  STATE_setFiltersOptions: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  STATE_setItemsToFilter: React.Dispatch<React.SetStateAction<FilteredItem[]>>;
  STATE_setFilteredItems: React.Dispatch<React.SetStateAction<FilteredItem[]>>;
  STATE_showAnimation: boolean;
  STATE_setShowAnimation: React.Dispatch<React.SetStateAction<boolean>>;
  STATE_clearFilters: () => void;
  filtersHandler: (selectedOptions: string[], propertyPath: string) => void;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [STATE_filtersOptions, STATE_setFiltersOptions] = useState<Record<string, string[]>>({});
  const [STATE_itemsToFilter, STATE_setItemsToFilter] = useState<FilteredItem[]>([]);
  const [STATE_filteredItems, STATE_setFilteredItems] = useState<FilteredItem[]>([]);
  const [STATE_showAnimation, STATE_setShowAnimation] = useState<boolean>(true);

  // Handler to update selected filter options
  const filtersHandler = (selectedOptions: string[], propertyPath: string) => {
    STATE_setFiltersOptions(prev => {
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

  // Clear filters
  const STATE_clearFilters = () => {
    STATE_setFiltersOptions({});
  };

  // Effect to update filtered items whenever items or filters change
  useEffect(() => {
    updateFilters(STATE_itemsToFilter, STATE_filtersOptions, STATE_setFilteredItems);
  }, [STATE_itemsToFilter, STATE_filtersOptions]);

  return (
    <FiltersContext.Provider
      value={{
        STATE_filtersOptions,
        STATE_itemsToFilter,
        STATE_filteredItems,
        STATE_setFiltersOptions,
        STATE_setItemsToFilter,
        STATE_setFilteredItems,
        STATE_showAnimation,
        STATE_setShowAnimation,
        STATE_clearFilters,
        filtersHandler
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) throw new Error("useFilters must be used within a FiltersProvider");
  return context;
};
