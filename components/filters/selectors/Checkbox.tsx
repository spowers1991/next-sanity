import React, { useState, useEffect } from 'react';
import { FilteredItem } from '../types/FilteredItem';
import { extractPropertiesNames } from '../helpers/extractPropertiesNames';
import { useFilters } from '../state/FiltersContext';

interface CheckboxProps {
  itemsToFilter: FilteredItem[]; 
  label: string;
  propertyToSearch: any; 
  filtersHandler: (selectedOptions: string[], property: keyof FilteredItem) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ itemsToFilter, label, propertyToSearch, filtersHandler }) => {
  const { STATE_filtersOptions, STATE_setFiltersOptions } = useFilters();

  // ✅ Use local state for selected options
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Initialize local state once from context on mount
  useEffect(() => {
    if (STATE_filtersOptions[propertyToSearch]) {
      setSelectedOptions(STATE_filtersOptions[propertyToSearch] as string[]);
    }
  }, [STATE_filtersOptions, propertyToSearch]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    const updatedOptions = isChecked
      ? [...selectedOptions, value]
      : selectedOptions.filter((option) => option !== value);

    setSelectedOptions(updatedOptions);
    
    // Update context safely
    STATE_setFiltersOptions({
      ...STATE_filtersOptions,
      [propertyToSearch]: updatedOptions,
    });

    // Call parent handler if needed
    filtersHandler(updatedOptions, propertyToSearch);
  };

  const options = extractPropertiesNames(itemsToFilter, propertyToSearch);

  return (
    <div className='flex flex-col gap-2'>
      <h3 className='font-bold uppercase text-[11px] sm:text-xs tracking-[1px]'>{label}</h3>
      <div className='grid grid-cols-2 w-fit gap-x-6 gap-y-3'>
        {options.map((option, index) => (
          <label key={index} className='col-span-1 flex flex-row gap-x-1 items-center cursor-pointer'>
            <input
              className='sr-only peer'
              type='checkbox'
              value={option}
              onChange={handleCheckboxChange}
              checked={selectedOptions.includes(option)}
            />
            <div className='relative w-6 h-6 bg-gray-200 border-white border-2 peer-checked:bg-[#434bed]'></div>
            <span className='ml-1 text-gray-700 peer-checked:text-[#333] py-[11px] sm:py-[12px] uppercase text-[11px] sm:text-xs font-[500] tracking-[1px]'>
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Checkbox;
