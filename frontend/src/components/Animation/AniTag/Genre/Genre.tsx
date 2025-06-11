import React, { useState } from "react";
import { GenreSection, GenreTitle, GenreButtonList, GenreButton, GenreToggleButton, ToggleLine } from "./Genre.styled";

const GENRES = [
  '액션','모험','드라마','개그','에로','판타지','호러','마법 소녀','메카',
  '음악','미스터리','심리','로맨스','SF','일상','스포츠','초자연','스릴러'
];

interface GenreProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function Genre({ value, onChange }: GenreProps) {
  // ...showAll 로직 동일
  const [showAll, setShowAll] = React.useState(false);
  const VISIBLE_COUNT = 8;
  const visibleGenres = showAll ? GENRES : GENRES.slice(0, VISIBLE_COUNT);

  // 버튼 클릭 핸들러
  const handleClick = (g: string) => {
    if (value.includes(g)) {
      // 이미 선택 → 제거
      onChange(value.filter(v => v !== g));
    } else {
      // 새로 선택 → 추가
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
      {GENRES.length > VISIBLE_COUNT && (
        <GenreToggleButton onClick={() => setShowAll(v => !v)} aria-label={showAll ? "접기" : "더보기"}>
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
        </GenreToggleButton>
      )}
    </GenreSection>
  );
}