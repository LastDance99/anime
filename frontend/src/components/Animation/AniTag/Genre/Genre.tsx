import React from "react";
import { GenreSection, GenreTitle, GenreButtonList, GenreButton } from "./Genre.styled";

const GENRES = [
  '액션','모험','드라마','개그','에로','판타지','호러','마법 소녀','메카',
  '음악','미스터리','심리','로맨스','SF','일상','스포츠','초자연','스릴러'
];

interface GenreProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Genre({ value, onChange }: GenreProps) {
  return (
    <GenreSection>
      <GenreTitle>장르</GenreTitle>
      <GenreButtonList>
        {GENRES.map(g => (
          <GenreButton
            key={g}
            $selected={value === g}
            onClick={() => onChange(g === value ? "" : g)}
          >
            {g}
          </GenreButton>
        ))}
      </GenreButtonList>
    </GenreSection>
  );
}