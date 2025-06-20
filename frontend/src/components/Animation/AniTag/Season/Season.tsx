import React from "react";
import {
  SeasonSection,
  SeasonTitle,
  SeasonButtonList,
  SeasonButton
} from "./Season.styled";

interface SeasonProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export default function Season({ value, onChange, options }: SeasonProps) {
  if (!options || options.length === 0) return null;

  return (
    <SeasonSection>
      <SeasonTitle>계절</SeasonTitle>
      <SeasonButtonList>
        {options.map(s => (
          <SeasonButton
            key={s}
            $selected={value === s}
            onClick={() => onChange(s === value ? "" : s)}
          >
            {s}
          </SeasonButton>
        ))}
      </SeasonButtonList>
    </SeasonSection>
  );
}