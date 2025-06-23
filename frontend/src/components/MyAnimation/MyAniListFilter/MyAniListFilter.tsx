import React, { useEffect, useState } from "react";
import YearSlider from "./Year/Year";
import Format from "./FilterSelect/FilterSelect";
import Search from "../../Animation/AniTag/Search/Search";
import { getAnimeFilterMeta } from "../../../api/anime";
import type { AniListFilters, OriginalType, SortType } from "../../../types/AniListFilters";
import { FilterContainer, FilterGroup, FilterSearchBox } from "./MyAniListFilter.styled";

type Props = {
  filters: AniListFilters;
  setFilters: React.Dispatch<React.SetStateAction<AniListFilters>>;
};

export default function MyAniListFilter({ filters, setFilters }: Props) {
  const [meta, setMeta] = useState<null | {
    genres: string[];
    formats: string[];
    originals: string[];
    statuses: string[];
    seasons: string[];
    years: number[];
  }>(null);

  useEffect(() => {
    getAnimeFilterMeta("ko")
      .then(data => {
        setMeta({
          genres: data.genres || [],
          formats: data.formats || [],
          originals: data.sources || [],
          statuses: data.statuses || [],
          seasons: (data.seasons || []).filter((s: string) => s && s.toLowerCase() !== "nan"),
          years: (data.years || []).filter((y: string | number): y is number => typeof y === "number"),
        });
      })
      .catch(err => {
        console.error("필터 옵션 불러오기 실패:", err);
        setMeta({
          genres: [],
          formats: [],
          originals: [],
          statuses: [],
          seasons: [],
          years: [],
        });
      });
  }, []);

  if (!meta) return <div>필터 옵션 로딩중...</div>;

  return (
    <FilterContainer>
      <FilterSearchBox>
        <Search
          value={filters.keyword}
          onChange={v => setFilters(f => ({ ...f, keyword: v }))}
        />
      </FilterSearchBox>

      <FilterGroup>
        <Format
          value={filters.genre}
          onChange={v => setFilters(f => ({ ...f, genre: v }))}
          options={meta.genres.map(g => ({ value: g, label: g }))}
          label="장르"
        />
      </FilterGroup>

      <FilterGroup>
        <Format
          value={filters.season}
          onChange={v => setFilters(f => ({ ...f, season: v }))}
          options={meta.seasons.map(s => ({ value: s, label: s }))}
          label="계절"
        />
      </FilterGroup>

      <FilterGroup>
        <Format
          value={filters.original}
          onChange={v => setFilters(f => ({ ...f, original: v as OriginalType }))}
          options={meta.originals.map(o => ({ value: o, label: o }))}
          label="원작"
        />
      </FilterGroup>

      <FilterGroup>
        <Format
          value={filters.sort}
          onChange={v => setFilters(f => ({ ...f, sort: v as SortType }))}
          options={[
            { value: "favorite", label: "최애의 애니" },
            { value: "latest", label: "최신순" },
            { value: "oldest", label: "오래된 순" },
            { value: "score", label: "평점" },
          ]}
          label="정렬"
        />
      </FilterGroup>

      <FilterGroup>
        <Format
          value={filters.format}
          onChange={v => setFilters(f => ({ ...f, format: v }))}
          options={meta.formats.map(f => ({ value: f, label: f }))}
          label="포맷"
        />
      </FilterGroup>

      <FilterGroup>
        <Format
          value={filters.status}
          onChange={v => setFilters(f => ({ ...f, status: v }))}
          options={meta.statuses.map(s => ({ value: s, label: s }))}
          label="방영상태"
        />
      </FilterGroup>

      <FilterGroup>
        <YearSlider
          value={Number(filters.year)}
          min={Math.min(...meta.years.filter((y): y is number => typeof y === "number"))}
          max={Math.max(...meta.years.filter((y): y is number => typeof y === "number"))}
          onChange={v => setFilters(f => ({ ...f, year: v }))}
          onReset={() => setFilters(f => ({ ...f, year: 0 }))}
        />
      </FilterGroup>
    </FilterContainer>
  );
}