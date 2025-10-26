"use client";

import React from "react";
import { extractPropertiesNames } from "@/lib/filters/helpers/extractPropertiesNames";
import { handleCheckboxChange } from "@/components/[Filters]/[FiltersOptions]/[Checkboxes]/actions/handleCheckboxChange";
import { useFilters } from "@/lib/filters/state/FiltersContext";
import Checkbox from "@/components/[Filters]/[FiltersOptions]/[Checkboxes]/[Checkbox]/Checkbox";

interface CheckboxProps {
  label: string;
  propertyToSearch: string;
}

const Checkboxes: React.FC<CheckboxProps> = ({
  label,
  propertyToSearch,
}) => {

  const { 
    STATE_itemsToFilter, 
    STATE_filtersValues, 
    STATE_setFiltersValues, 
    STATE_setShowAnimation, 
    STATE_filtersOptionsHandler 
  } = useFilters();
  
  const options = extractPropertiesNames(STATE_itemsToFilter, propertyToSearch);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-bold uppercase text-[11px] sm:text-xs tracking-[1px]">
        {label}
      </h3>
      <div className="grid grid-cols-2 w-fit gap-x-6 gap-y-3">
        {options.map((option: string, index: number) => (
          <Checkbox
            key={index}
            option={option}
            checked={STATE_filtersValues?.[propertyToSearch]?.includes(option) ?? false}
            onChange={(checked) =>
              handleCheckboxChange(
                option,
                checked,
                propertyToSearch,
                STATE_filtersValues,
                STATE_setFiltersValues,
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
