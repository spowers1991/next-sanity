"use client"

import React, { useEffect } from 'react';
import Checkbox from './selectors/Checkbox';
import { updateFilters } from "./actions/updateFilters";
import FilteredListing from './FilteredListing'
import { useFilters } from './state/FiltersContext';
import { FilteredItem } from './types/FilteredItem';

interface FilterProps {
    itemsToFilter: FilteredItem[];
}

const Filters: React.FC<FilterProps> = ({ itemsToFilter }) => {

  const { STATE_filtersOptions, STATE_itemsToFilter, STATE_filteredItems, STATE_setFiltersOptions, STATE_setItemsToFilter, STATE_setFilteredItems } = useFilters();
  
  //const [filtersOptions, setFiltersOptions] = useState<Record<string, any[]>>({});

  //const [filteredItems, setFilteredItems] = useState<FilteredItem[]>([]);

  // Set the filtering options based on the propertyToSearch
  const filtersHandler = (selectedOptions: string[], propertyToSearch: string) => {
    STATE_setFiltersOptions(prevFilters => ({
      ...prevFilters,
      [propertyToSearch]: selectedOptions,
    }));
  };
  // Compare and update the filters
  useEffect(() => {
        STATE_setItemsToFilter(itemsToFilter);
    updateFilters(STATE_itemsToFilter, STATE_filtersOptions, STATE_setFilteredItems);
  }, [STATE_filtersOptions, STATE_itemsToFilter]);


  return (
    <div className="container flex m-auto w-full">

      <div className="grid grid-cols-2 gap-6 w-full">

        <div className='flex flex-col gap-6 bg-white p-6'>

          <Checkbox   
            itemsToFilter={STATE_itemsToFilter}
            label={"castMembers"}
            propertyToSearch={"castMembers.characterName"}
            filtersHandler={filtersHandler}
          />

        </div>

        <div>
          <FilteredListing filteredItems={STATE_filteredItems} />
        </div>

      </div>

    </div>
  );

};

export default Filters;
