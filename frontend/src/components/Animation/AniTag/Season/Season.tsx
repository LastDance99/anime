import React from "react";
import { SeasonSection, SeasonTitle, SeasonButtonList, SeasonButton } from "./Season.styled";

const SEASONS = ['봄', '여름', '가을', '겨울'];

interface SeasonProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Season({ value, onChange }: SeasonProps) {
  return (
    <SeasonSection>
      <SeasonTitle>계절</SeasonTitle>
      <SeasonButtonList>
        {SEASONS.map(s => (
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