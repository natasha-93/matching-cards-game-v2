import React from "react";

type DropdownProps<T = string> = {
  value: string;
  onChange: (label: string) => void;
  options: T[];
  getLabel: (option: T) => string;
  getKey: (option: T) => string | number;
};

export default function Dropdown<T>({
  value,
  onChange,
  options,
  getLabel,
  getKey,
}: DropdownProps<T>) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => {
        return (
          <option key={getKey(option)} value={getLabel(option)}>
            {getLabel(option)}
          </option>
        );
      })}
    </select>
  );
}
