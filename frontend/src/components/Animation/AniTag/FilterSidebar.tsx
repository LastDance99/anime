import React from "react";
import Search from "./Search/Search";
import ResetButton from "./ResetButton/ResetButton";
import Genre from "./Genre/Genre";
import Season from "./Season/Season";
import Year from "./Year/Year";
import Broadcast from "./Broadcast/Broadcast";
import type { AnimeFilter } from "../../../types/anime";
import {
  FilterSidebarContainer
} from "./FilterSidebar.styled";

interface FilterSidebarProps {
  filters: AnimeFilter;
  setFilters: React.Dispatch<React.SetStateAction<AnimeFilter>>;
}

export default function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  return (
    <FilterSidebarContainer>
      <Search
        value={filters.keyword}
        onChange={v => setFilters(f => ({ ...f, keyword: v }))}
      />
      <ResetButton
        onClick={() =>
          setFilters({
            genre: "",
            season: "",
            year: "",
            broadcast: "",
            keyword: "",
          })
        }
      />
      <Genre value={filters.genre} onChange={v => setFilters(f => ({ ...f, genre: v }))} />
      <Season value={filters.season} onChange={v => setFilters(f => ({ ...f, season: v }))} />
      <Year value={filters.year} onChange={v => setFilters(f => ({ ...f, year: v }))} />
      <Broadcast value={filters.broadcast} onChange={v => setFilters(f => ({ ...f, broadcast: v }))} />
    </FilterSidebarContainer>
  );
}
