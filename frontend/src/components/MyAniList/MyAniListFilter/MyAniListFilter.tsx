import React, { useState } from "react";
import YearSlider from "./Year/Year";
import Format from "./FilterSelect/FilterSelect";
import { genreOptions, seasonOptions, statusOptions, formatOptions, } from "./FilterSelect/filterOptions";
import type { AniListFilters } from "../../../types/AniListFilters";

type Props = {
  filters: AniListFilters;
  setFilters: React.Dispatch<React.SetStateAction<AniListFilters>>;
};

export default function MyAniListFilter({ filters, setFilters }: Props) {

  return (
    <div>
      {/* 장르 드롭다운 */}
      <Format
        value={filters.genre}
        onChange={v => setFilters(f => ({ ...f, genre: v }))}
        options={genreOptions}
        label="장르"
      />

      {/* 시즌 드롭다운 */}
      <Format
        value={filters.season}
        onChange={v => setFilters(f => ({ ...f, season: v }))}
        options={seasonOptions}
        label="계절"
      />

      {/* 방영 상태 */}
      <Format
        value={filters.status}
        onChange={v => setFilters(f => ({ ...f, status: v }))}
        options={statusOptions}
        label="방영상태"
      />

      {/* 연도 슬라이더 */}
      <YearSlider
        value={filters.year}
        min={1940}
        max={2025}
        onChange={v => setFilters(f => ({ ...f, year: v }))}
      />
    </div>
  );
}