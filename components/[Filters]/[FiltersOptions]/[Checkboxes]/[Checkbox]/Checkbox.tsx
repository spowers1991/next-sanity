"use client";

import React from "react";

interface CheckboxProps {
  option: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ option, checked, onChange }) => {
  return (
    <label className="col-span-1 flex flex-row gap-x-1 items-center cursor-pointer">
      <input
        className="sr-only peer"
        type="checkbox"
        value={option}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="relative w-6 h-6 bg-gray-200 border-white border-2 peer-checked:bg-[#434bed]"></div>
      <span className="ml-1 text-gray-700 peer-checked:text-[#333] py-[11px] sm:py-[12px] uppercase text-[11px] sm:text-xs font-[500] tracking-[1px]">
        {option}
      </span>
    </label>
  );
};

export default Checkbox;
