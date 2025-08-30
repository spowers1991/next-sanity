"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// filtersOptions stores all selected filters globally
export type FiltersOptions = Record<string, string[]>;

interface FiltersContextType {
  filtersOptions: any;
  setFiltersOptions: any;
  clearFilters: () => void;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [filtersOptions, setFiltersOptionsState] = useState<FiltersOptions>({});

  // Update the entire filtersOptions at once
  const setFiltersOptions = (newFilters: FiltersOptions) => {
    setFiltersOptionsState(newFilters);
  };

  const clearFilters = () => setFiltersOptionsState({});

  return (
    <FiltersContext.Provider value={{ filtersOptions, setFiltersOptions, clearFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const ctx = useContext(FiltersContext);
  if (!ctx) throw new Error("useFilters must be used within a FiltersProvider");
  return ctx;
};
