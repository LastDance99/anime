import React, { useState } from "react";
import YearSlider from "./Year/Year";
import Format from "./FilterSelect/FilterSelect";
import Search from "../../Animation/AniTag/Search/Search";
import { genreOptions, seasonOptions, statusOptions, formatOptions, originOptions, sortOptions } from "./FilterSelect/filterOptions";
import type { AniListFilters, OriginalType, SortType } from "../../../types/AniListFilters";
import { FilterContainer, FilterGroup, FilterSearchBox } from "./MyAniListFilter.styled";

type Props = {
  filters: AniListFilters;
  setFilters: React.Dispatch<React.SetStateAction<AniListFilters>>;
};

export default function MyAniListFilter({ filters, setFilters }: Props) {

  return (
    <FilterContainer>
      <FilterSearchBox>
        {/* 검색창 */}
        <Search
          value={filters.keyword}
          onChange={v => setFilters(f => ({ ...f, keyword: v }))}
        />
      </FilterSearchBox>
      <FilterGroup>
      {/* 장르 드롭다운 */}
        <Format
          value={filters.genre}
          onChange={v => setFilters(f => ({ ...f, genre: v }))}
          options={genreOptions}
          label="장르"
        />
      </FilterGroup>
      <FilterGroup>
      {/* 시즌 드롭다운 */}
        <Format
          value={filters.season}
          onChange={v => setFilters(f => ({ ...f, season: v }))}
          options={seasonOptions}
          label="계절"
        />
      </FilterGroup>
      <FilterGroup>
      {/* 원작 드롭다운 */}
        <Format
          value={filters.original}
          onChange={v => setFilters(f => ({ ...f, original: v as OriginalType }))}
          options={originOptions}
          label="원작"
        />
      </FilterGroup>
      <FilterGroup>
      {/* 정렬 드롭다운 */}
        <Format
          value={filters.sort}
          onChange={v => setFilters(f => ({ ...f, sort: v as SortType }))}
          options={sortOptions}
          label="정렬"
        />
      </FilterGroup>
      <FilterGroup>
      {/* 포멧 드롭다운 */}
        <Format
          value={filters.format}
          onChange={v => setFilters(f => ({ ...f, format: v }))}
          options={formatOptions}
          label="포맷"
        />
      </FilterGroup>
      <FilterGroup>
      {/* 방영 상태 */}
        <Format
          value={filters.status}
          onChange={v => setFilters(f => ({ ...f, status: v }))}
          options={statusOptions}
          label="방영상태"
        />
      </FilterGroup>
      <FilterGroup>
      {/* 연도 슬라이더 */}
        <YearSlider
          value={filters.year}
          min={1940}
          max={2025}
          onChange={v => setFilters(f => ({ ...f, year: v }))}
          onReset={() => setFilters(f => ({ ...f, year: 0 }))}
        />
      </FilterGroup>
    </FilterContainer>
  );
}