"use client";

import React, { useState, useEffect } from "react";
import { FiltersItem } from "@/services/filters/types/FiltersItem";
import { extractPropertiesNames } from "@/lib/filters/helpers/extractPropertiesNames";
import { handleCheckboxChange } from "@/components/[Filters]/[FiltersOptions]/[Checkboxes]/actions/handleCheckboxChange";
import { useFilters } from "@/lib/filters/state/FiltersContext";
import Checkbox from "@/components/[Filters]/[FiltersOptions]/[Checkboxes]/[Checkbox]/Checkbox";

interface CheckboxProps {
  itemsToFilter: FiltersItem[];
  label: string;
  propertyToSearch: string;
}

const Checkboxes: React.FC<CheckboxProps> = ({
  itemsToFilter,
  label,
  propertyToSearch,
}) => {
  const { STATE_filtersOptions, STATE_setFiltersOptions } = useFilters();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const { STATE_setShowAnimation, STATE_filtersOptionsHandler } = useFilters();

  useEffect(() => {
    if (STATE_filtersOptions) {
      setSelectedOptions(STATE_filtersOptions[propertyToSearch] ?? []);
    } else {
      setSelectedOptions([]);
    }
  }, [STATE_filtersOptions, propertyToSearch]);

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
                propertyToSearch,
                STATE_filtersOptions,
                STATE_setFiltersOptions,
                STATE_filtersOptionsHandler,
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
