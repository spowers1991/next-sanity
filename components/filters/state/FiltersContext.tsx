"use client";

import React, { createContext, useContext, useState } from "react";
import { FilteredItem } from "../types/FilteredItem";

// ✅ Types
type FiltersOptions = Record<string, string[]>;

interface FiltersContextType {
  STATE_itemsToFilter: FilteredItem[];
  STATE_setItemsToFilter: React.Dispatch<React.SetStateAction<FilteredItem[]>>;
  STATE_filteredItems: FilteredItem[];
  STATE_setFilteredItems: React.Dispatch<React.SetStateAction<FilteredItem[]>>;
  STATE_filtersOptions: FiltersOptions;
  STATE_setFiltersOptions: React.Dispatch<React.SetStateAction<FiltersOptions>>;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [STATE_itemsToFilter, STATE_setItemsToFilter] = useState<FilteredItem[]>([]);
  const [STATE_filteredItems, STATE_setFilteredItems] = useState<FilteredItem[]>([]);
  const [STATE_filtersOptions, STATE_setFiltersOptions] = useState<FiltersOptions>({});

  return (
    <FiltersContext.Provider
      value={{
        STATE_itemsToFilter,
        STATE_setItemsToFilter,
        STATE_filteredItems,
        STATE_setFilteredItems,
        STATE_filtersOptions,
        STATE_setFiltersOptions,
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
