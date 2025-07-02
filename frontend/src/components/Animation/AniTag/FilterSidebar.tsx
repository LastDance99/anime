import React, { useEffect, useState } from "react";
import Search from "./Search/Search";
import ResetButton from "./ResetButton/ResetButton";
import Genre from "./Genre/Genre";
import Season from "./Season/Season";
import Year from "./Year/Year";
import Broadcast from "./Broadcast/Broadcast";
import type { AnimeFilter } from "../../../types/anime";
import { getAnimeFilterMeta } from "../../../api/anime";
import { FilterSidebarContainer } from "./FilterSidebar.styled";
import { useTranslation } from "react-i18next";

interface FilterSidebarProps {
  filters: AnimeFilter;
  setFilters: React.Dispatch<React.SetStateAction<AnimeFilter>>;
}

export default function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  const { t } = useTranslation();

  const [meta, setMeta] = useState<null | {
    genres: string[];
    years: (string | number)[];
    seasons: string[];
    broadcasts: string[];
  }>(null);

  useEffect(() => {
    getAnimeFilterMeta("ko")
      .then(data => {
        console.log("필터 옵션:", data);

        const filteredSeasons = (data.seasons || []).filter(
          (s: string | null | undefined) => s && s.toLowerCase() !== "nan"
        );

        const rawYears = (data.years || []) as (number | string)[];
        const yearsAbove2010 = rawYears.filter((y) => typeof y === "number" && y > 2010);
        const hasBelow2010 = rawYears.some((y) => typeof y === "number" && y <= 2010);
        const processedYears = hasBelow2010 ? [...yearsAbove2010, "2010년 이하"] : yearsAbove2010;

        setMeta({
          genres: data.genres || [],
          years: processedYears,
          seasons: filteredSeasons,
          broadcasts: data.statuses || [],
        });
      })
      .catch(err => {
        setMeta({
          genres: [],
          years: [],
          seasons: [],
          broadcasts: [],
        });
        console.error("필터 옵션 불러오기 실패:", err);
      });
  }, []);

  if (!meta) return <div>{t("anime.filter_loading")}</div>;

  return (
    <FilterSidebarContainer>
      <Search
        value={filters.keyword}
        onChange={v => setFilters(f => ({ ...f, keyword: v }))}
      />
      <ResetButton
        onClick={() =>
          setFilters({
            genre: [],
            season: "",
            year: "",
            broadcast: "",
            keyword: "",
          })
        }
      />
      <Genre
        value={filters.genre}
        onChange={v => setFilters(f => ({ ...f, genre: v }))}
        options={meta.genres}
      />
      <Year
        value={filters.year}
        onChange={v => setFilters(f => ({ ...f, year: v }))}
        options={meta.years}
      />
      <Season
        value={filters.season}
        onChange={v => setFilters(f => ({ ...f, season: v }))}
        options={meta.seasons}
      />
      <Broadcast
        value={filters.broadcast}
        onChange={v => setFilters(f => ({ ...f, broadcast: v }))}
        options={meta.broadcasts}
      />
    </FilterSidebarContainer>
  );
}