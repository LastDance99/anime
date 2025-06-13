import React, { useState } from "react";
import { YearSection, YearTitle, YearButtonList, YearButton, YearToggleButton, ToggleLine } from "./Year.styled";

const YEARS = [
  2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018,
  2017, 2016, 2015, 2014, 2013, 2012, 2011, '2010년 이전'
];

interface YearProps {
  value: string | number;
  onChange: (value: string) => void;
}

export default function Year({ value, onChange }: YearProps) {
  const [showAll, setShowAll] = useState(false);
  const VISIBLE_COUNT = 8;
  const visibleYears = showAll ? YEARS : YEARS.slice(0, VISIBLE_COUNT);

  return (
    <YearSection>
      <YearTitle>년도</YearTitle>
      <YearButtonList>
        {visibleYears.map(y => (
          <YearButton
            key={y}
            $selected={value === y}
            onClick={() => onChange(y === value ? "" : String(y))}
          >
            {y}
          </YearButton>
        ))}
      </YearButtonList>
      {YEARS.length > VISIBLE_COUNT && (
        <YearToggleButton onClick={() => setShowAll(v => !v)} aria-label={showAll ? "접기" : "더보기"}>
          <ToggleLine className="toggle-line" />
          {showAll ? (
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <polyline points="5,12 10,7 15,12" stroke="#d75a85" strokeWidth="2.1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <polyline points="5,8 10,13 15,8" stroke="#d75a85" strokeWidth="2.1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          <ToggleLine className="toggle-line" />
        </YearToggleButton>
      )}
    </YearSection>
  );
}