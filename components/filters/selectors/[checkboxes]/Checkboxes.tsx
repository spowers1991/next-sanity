import React, { useState, useEffect } from "react";
import { FilteredItem } from "@/components/filters/types/FilteredItem";
import { extractPropertiesNames } from "@/components/filters/helpers/extractPropertiesNames";
import { handleCheckboxChange } from "./actions/handleCheckboxChange";
import { useFilters } from "../../state/FiltersContext";

interface CheckboxProps {
  itemsToFilter: FilteredItem[];
  label: string;
  propertyToSearch: string;
  filtersOptions: Record<string, string[]>;
  setFiltersOptions: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  filtersHandler: (selectedOptions: string[], propertyPath: string) => void;
}

const Checkboxes: React.FC<CheckboxProps> = ({
  itemsToFilter,
  label,
  propertyToSearch,
  filtersOptions,
  setFiltersOptions,
  filtersHandler,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const { STATE_setShowAnimation } = useFilters();

  useEffect(() => {
    if (filtersOptions) {
      setSelectedOptions(filtersOptions[propertyToSearch] ?? []);
    } else {
      setSelectedOptions([]);
    }
  }, [filtersOptions, propertyToSearch]);

  const options = extractPropertiesNames(itemsToFilter, propertyToSearch);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-bold uppercase text-[11px] sm:text-xs tracking-[1px]">{label}</h3>
      <div className="grid grid-cols-2 w-fit gap-x-6 gap-y-3">
        {options.map((option: string, index: number) => (
          <label key={index} className="col-span-1 flex flex-row gap-x-1 items-center cursor-pointer">
            <input
              className="sr-only peer"
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={(e) =>
                handleCheckboxChange(
                  option,
                  e.target.checked,
                  selectedOptions,
                  setSelectedOptions,
                  filtersOptions,
                  setFiltersOptions,
                  propertyToSearch,
                  filtersHandler,
                  STATE_setShowAnimation
                )
              }
            />
            <div className="relative w-6 h-6 bg-gray-200 border-white border-2 peer-checked:bg-[#434bed]"></div>
            <span className="ml-1 text-gray-700 peer-checked:text-[#333] py-[11px] sm:py-[12px] uppercase text-[11px] sm:text-xs font-[500] tracking-[1px]">
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Checkboxes;
