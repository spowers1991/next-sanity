
import React from "react";
import FiltersCard from "./[FiltersCard]/FiltersCard";
import { useFilters } from "@/lib/filters/state/FiltersContext";

const FilteredListing: React.FC = () => {

const { STATE_filteredItems } = useFilters();

  return (
    <>
      {STATE_filteredItems?.length > 0 ? (
        <div
          className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-3"
        >
          {STATE_filteredItems.map((filteredItem, index) => {
            const item = filteredItem as {
              _id: string;
              _type: string;
              slug: { current: string };
              title: string;
            };

            return <FiltersCard key={item._id} filteredItem={item} index={index} />;
          })}
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
