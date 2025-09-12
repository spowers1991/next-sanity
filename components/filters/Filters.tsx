"use client"

import React, { useState, useEffect } from 'react';
import { Movie } from '@/lib/sanity/types/movie';
import Checkbox from './selectors/Checkbox';
import { updateFilters } from "./actions/updateFilters";
import FilteredListing from './FilteredListing'

interface FilterProps {
    itemsToFilter: Movie[];
}

const Filters: React.FC<FilterProps> = ({ itemsToFilter }) => {
  
  const [filtersOptions, setFiltersOptions] = useState<Record<string, any[]>>({});

  const [filteredItems, setFilteredItems] = useState<Movie[]>([]);

  // Set the filtering options based on the propertyToSearch
  const filtersHandler = (selectedOptions: string[], propertyToSearch: keyof Movie) => {
    setFiltersOptions((prevFilters) => ({
      ...prevFilters,
      [propertyToSearch]: selectedOptions,
    }));
  };
  // Compare and update the filters
  useEffect(() => {
    updateFilters(itemsToFilter, filtersOptions, setFilteredItems);
  }, [filtersOptions, itemsToFilter]);


  return (
    <div className="container flex m-auto w-full">

      <div className="grid grid-cols-2 gap-6 w-full">

        <div className='flex flex-col gap-6 bg-white p-6'>

          <Checkbox   
            itemsToFilter={itemsToFilter}
            label={"castMembers"}
            propertyToSearch={"castMembers.characterName"}
            filtersHandler={filtersHandler}
          />

        </div>

        <div>
          <FilteredListing filteredItems={filteredItems} />
        </div>

      </div>

    </div>
  );

};

export default Filters;
