import React from "react";
import { isInputOptionChecked } from "./helpers/isInputOptionChecked";

interface InputOptionProps {
  option: string;
  propertyToSearch: any;
  filtersOptions: any;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxInputOption: React.FC<InputOptionProps> = ({
  option,
  propertyToSearch,
  filtersOptions,
  handleCheckboxChange,
}) => {
  const isChecked = isInputOptionChecked(option, propertyToSearch, filtersOptions);

  return (
    <label className="col-span-1 flex flex-row gap-x-1 items-center cursor-pointer">
      <input
        className="sr-only peer"
        type="checkbox"
        value={option}
        checked={isChecked} // ✅ controlled by parent filtersOptions
        onChange={handleCheckboxChange} // parent manages updates
      />
      <div className="relative w-6 h-6 bg-gray-200 border-white border-2 peer-checked:bg-[#434bed] peer-checked:after:absolute peer-checked:after:w-4 peer-checked:after:h-2 peer-checked:after:border-b-2 peer-checked:after:rotate-45 peer-checked:after:left-1 peer-checked:after:top-2"></div>
      <span className="ml-1 text-gray-700 peer-checked:text-[#333] py-[11px] sm:py-[12px] uppercase text-[11px] sm:text-xs font-[500] tracking-[1px]">
        {option}
      </span>
    </label>
  );
};

export default CheckboxInputOption;
