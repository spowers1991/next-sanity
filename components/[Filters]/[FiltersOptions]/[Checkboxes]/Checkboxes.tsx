"use client";

import React, { useState, useEffect } from "react";
import { FilteredItem } from "@/lib/filters/types/FilteredItem";
import { extractPropertiesNames } from "@/lib/filters/helpers/extractPropertiesNames";
import { handleCheckboxChange } from "@/lib/filters/actions/handleCheckboxChange";
import { useFilters } from "@/lib/filters/state/FiltersContext";
import Checkbox from "@/components/[Filters]/[FiltersOptions]/[Checkboxes]/[Checkbox]/Checkbox";

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
          <Checkbox
            key={index}
            option={option}
            checked={selectedOptions.includes(option)}
            onChange={(checked) =>
              handleCheckboxChange(
                option,
                checked,
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
        ))}
      </div>
    </div>
  );
};

export default Checkboxes;
