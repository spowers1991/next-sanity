import React from 'react';
import { FilteredItem } from './types/FilteredItem';
import FiltersCard from '@/components/filters/FiltersCard';

interface FilteredListingProps {
  filteredItems: FilteredItem[];
  //page: number;
}

const FilteredListing: React.FC<FilteredListingProps> = ({ filteredItems }) => {
  return (
    <>
      {filteredItems?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-6">
          {filteredItems.map(( filteredItem ) => (
              <FiltersCard key={filteredItem.externalId} filteredItem={filteredItem} />
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
