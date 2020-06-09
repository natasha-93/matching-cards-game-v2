import React from "react";

type DropdownProps = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
};

export default function Dropdown({ value, onChange, options }: DropdownProps) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
}
