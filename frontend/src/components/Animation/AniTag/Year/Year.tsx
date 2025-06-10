import React from "react";
import { YearSection, YearTitle, YearButtonList, YearButton } from "./Year.styled";

const YEARS = ['24년 1분기', '24년 2분기', '24년 3분기', '24년 4분기'];

interface YearProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Year({ value, onChange }: YearProps) {
  return (
    <YearSection>
      <YearTitle>년도</YearTitle>
      <YearButtonList>
        {YEARS.map(y => (
          <YearButton
            key={y}
            $selected={value === y}
            onClick={() => onChange(y === value ? "" : y)}
          >
            {y}
          </YearButton>
        ))}
      </YearButtonList>
    </YearSection>
  );
}