import React from "react";
import styled from "styled-components";

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
    <StyledDropdown value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => {
        return (
          <option key={getKey(option)} value={getLabel(option)}>
            {getLabel(option)}
          </option>
        );
      })}
    </StyledDropdown>
  );
}

const StyledDropdown = styled.select`
  text-transform: capitalize;
  width: 7rem;
  margin: 0.5rem;
  padding: 0.2rem 0.4rem;
  text-align: center;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  outline: none;
  cursor: pointer;
  border: none;
  appearance: none;
`;
