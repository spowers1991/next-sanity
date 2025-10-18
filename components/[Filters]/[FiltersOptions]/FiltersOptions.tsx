"use client";

import React from "react";
import { FilterConfigItem } from "@/lib/filters/types/FilterConfigItem";
import Checkboxes from "./[Checkboxes]/Checkboxes";
// import TextSearch from "./[TextSearch]/TextSearch"; // Uncomment when ready
import { FilteredItem } from "@/lib/filters/types/FilteredItem";

interface FiltersOptionsProps {
  itemsToFilter: FilteredItem[];
  filtersToShow: FilterConfigItem[]; // array of filters to render
}

const FiltersOptions: React.FC<FiltersOptionsProps> = ({ itemsToFilter, filtersToShow }) => {

  return (
    <div className="flex flex-col gap-6">
      {filtersToShow.map((filter, index) => {
        if (filter.type === "checkbox") {
          return (
            <Checkboxes
              key={index}
              itemsToFilter={itemsToFilter}
              label={filter.label}
              propertyToSearch={filter.propertyToSearch}
            />
          );
        }

        // Placeholder for TextSearch
        if (filter.type === "textSearch") {
          return (
            // <TextSearch
            //   key={index}
            //   itemsToFilter={itemsToFilter}
            //   label={filter.label}
            //   propertyToSearch={filter.propertyToSearch}
            // />
            <div key={index} className="text-gray-500 italic">
              TextSearch placeholder
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default FiltersOptions;
