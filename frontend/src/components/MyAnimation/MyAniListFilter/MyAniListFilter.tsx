import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const [meta, setMeta] = useState<null | {
    genres: string[];
    formats: string[];
    originals: string[];
    statuses: string[];
    seasons: string[];
    years: number[];
  }>(null);

  useEffect(() => {
    getAnimeFilterMeta()
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

  if (!meta) return <div>{t("common.loading")}</div>;

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
          label={t("filter.genre")}
        />
      </FilterGroup>

      <FilterGroup>
        <Format
          value={filters.season}
          onChange={v => setFilters(f => ({ ...f, season: v }))}
          options={meta.seasons.map(s => ({ value: s, label: s }))}
          label={t("filter.season")}
        />
      </FilterGroup>

      <FilterGroup>
        <Format
          value={filters.original}
          onChange={v => setFilters(f => ({ ...f, original: v as OriginalType }))}
          options={meta.originals.map(o => ({ value: o, label: o }))}
          label={t("filter.source")}
        />
      </FilterGroup>

      <FilterGroup>
        <Format
          value={filters.sort}
          onChange={v => setFilters(f => ({ ...f, sort: v as SortType }))}
          options={[
            { value: "favorite", label: t("filter.sort.favorite") },
            { value: "latest", label: t("filter.sort.latest") },
            { value: "oldest", label: t("filter.sort.oldest") },
            { value: "rating", label: t("filter.sort.score") },
          ]}
          label={t("filter.sort.label")}
        />
      </FilterGroup>

      <FilterGroup>
        <Format
          value={filters.format}
          onChange={v => setFilters(f => ({ ...f, format: v }))}
          options={meta.formats.map(f => ({ value: f, label: f }))}
          label={t("filter.format")}
        />
      </FilterGroup>

      <FilterGroup>
        <Format
          value={filters.status}
          onChange={v => setFilters(f => ({ ...f, status: v }))}
          options={meta.statuses.map(s => ({ value: s, label: s }))}
          label={t("filter.status")}
        />
      </FilterGroup>

      <FilterGroup>
        <YearSlider
          value={Number(filters.year)}
          min={Math.min(...meta.years)}
          max={Math.max(...meta.years)}
          onChange={v => setFilters(f => ({ ...f, year: v }))}
          onReset={() => setFilters(f => ({ ...f, year: 0 }))}
        />
      </FilterGroup>
    </FilterContainer>
  );
}