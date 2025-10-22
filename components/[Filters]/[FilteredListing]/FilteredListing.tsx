
import React from "react";
import { FiltersItem } from "@/services/filters/types/FiltersItem";
import FiltersCard from "./[FiltersCard]/FiltersCard";

interface FilteredListingProps {
  filteredItems: FiltersItem[];
}

const FilteredListing: React.FC<FilteredListingProps> = ({ filteredItems }) => {

  return (
    <>
      {filteredItems?.length > 0 ? (
        <div
          className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-3"
        >
          {filteredItems.map((filteredItem, index) => (
            <FiltersCard key={filteredItem._id} filteredItem={filteredItem} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center text-lg">
          No project available for these filters...
        </div>
      )}
    </>
  );
};

export default FilteredListing;
