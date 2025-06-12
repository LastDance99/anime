import React from "react";
import { FilterSelectBox, FilterSelect, FilterSelectLabel } from "./FilterSelect.styled";

type Props = {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  label?: string;
};

export default function Format({ value, onChange, options, label = "Format" }: Props) {
  return (
    <FilterSelectBox>
      <FilterSelectLabel>{label}</FilterSelectLabel>
      <FilterSelect
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </FilterSelect>
    </FilterSelectBox>
  );
}