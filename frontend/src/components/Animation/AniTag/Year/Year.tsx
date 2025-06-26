import React, { useState } from "react";
import {
  YearSection,
  YearTitle,
  YearButtonList,
  YearButton,
  YearToggleButton,
  ToggleLine
} from "./Year.styled";

interface YearProps {
  value: string | number;
  onChange: (value: string) => void;
  options: (string | number)[];
}

export default function Year({ value, onChange, options }: YearProps) {
  const [showAll, setShowAll] = useState(false);
  const VISIBLE_COUNT = 8;
  const visibleYears = showAll ? options : options.slice(0, VISIBLE_COUNT);

  return (
    <YearSection>
      <YearTitle>년도</YearTitle>
      <YearButtonList>
        {visibleYears.map(y => (
          <YearButton
            key={y}
            $selected={String(value) === String(y)}
            onClick={() => onChange(String(y) === String(value) ? "" : String(y))}
          >
            {y}
          </YearButton>
        ))}
      </YearButtonList>
      {options.length > VISIBLE_COUNT && (
        <YearToggleButton
          onClick={() => setShowAll(v => !v)}
          aria-label={showAll ? "접기" : "더보기"}
        >
          <ToggleLine className="toggle-line" />
          {showAll ? (
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <polyline
                points="5,12 10,7 15,12"
                stroke="#d75a85"
                strokeWidth="2.1"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <polyline
                points="5,8 10,13 15,8"
                stroke="#d75a85"
                strokeWidth="2.1"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          <ToggleLine className="toggle-line" />
        </YearToggleButton>
      )}
    </YearSection>
  );
}