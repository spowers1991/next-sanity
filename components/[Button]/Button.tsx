"use client";

import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-semibold uppercase text-xs ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
