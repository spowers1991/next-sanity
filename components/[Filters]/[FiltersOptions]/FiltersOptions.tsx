"use client";

import React from "react";
import Checkboxes from "./[Checkboxes]/Checkboxes";
// import TextSearch from "./[TextSearch]/TextSearch"; // Uncomment when ready
import { useFilters } from "@/lib/filters/state/FiltersContext";

const FiltersOptions: React.FC = () => {

  const { STATE_filtersOptions } = useFilters();

  return (
    <div className="flex flex-col gap-6">
      {STATE_filtersOptions.map((filter, index) => {
        if (filter.type === "checkbox") {
          return (
            <Checkboxes
              key={index}
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
