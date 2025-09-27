"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { FilteredItem } from "../types/FilteredItem";
import { updateFilters } from "../actions/updateFilters";
import { filtersHandler as handleFilters } from "../actions/filtersHandler"; 

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

  const filtersHandler = (selectedOptions: string[], propertyPath: string) => {
    handleFilters(selectedOptions, propertyPath, STATE_setFiltersOptions);
  };

  const STATE_clearFilters = () => {
    STATE_setFiltersOptions({});
  };

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
        filtersHandler,
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
