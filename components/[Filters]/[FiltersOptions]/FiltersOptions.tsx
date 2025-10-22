"use client";

import React from "react";
import { FiltersConfig } from "@/lib/filters/types/FiltersConfig";
import Checkboxes from "./[Checkboxes]/Checkboxes";
// import TextSearch from "./[TextSearch]/TextSearch"; // Uncomment when ready
import { FiltersItem } from "@/services/filters/types/FiltersItem";

interface FiltersOptionsProps {
  itemsToFilter: FiltersItem[];
  filtersToShow: FiltersConfig[]; // array of filters to render
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
