import React from "react";
import {
  GenreSection,
  GenreTitle,
  GenreButtonList,
  GenreButton,
  GenreToggleButton,
  ToggleLine
} from "./Genre.styled";

interface GenreProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
}

export default function Genre({ value, onChange, options }: GenreProps) {
  const [showAll, setShowAll] = React.useState(false);
  const VISIBLE_COUNT = 8;
  const visibleGenres = showAll ? options : options.slice(0, VISIBLE_COUNT);

  const handleClick = (g: string) => {
    if (value.includes(g)) {
      onChange(value.filter(v => v !== g));
    } else {
      onChange([...value, g]);
    }
  };

  return (
    <GenreSection>
      <GenreTitle>장르</GenreTitle>
      <GenreButtonList>
        {visibleGenres.map(g => (
          <GenreButton
            key={g}
            $selected={value.includes(g)}
            onClick={() => handleClick(g)}
          >
            {g}
          </GenreButton>
        ))}
      </GenreButtonList>
      {options.length > VISIBLE_COUNT && (
        <GenreToggleButton
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
        </GenreToggleButton>
      )}
    </GenreSection>
  );
}