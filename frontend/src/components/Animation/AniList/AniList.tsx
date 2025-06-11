import React from "react";
import AniListFilter from "./AniListFilter/AniListFilter";
import { AniListFlex, AniListWrapper } from "./AniList.styled";
import AniListCard from "./AniListCard/AniListCard";
import type { AnimeItem } from "../../../types/anime";

interface AniListProps {
  list: AnimeItem[];
  total?: number;
  sort: string;
  sortOptions: { label: string; value: string }[];
  onSortChange: (value: string) => void;
}

export default function AniList({
  list,
  total,
  sort,
  sortOptions,
  onSortChange,
}: AniListProps) {
  return (
    <AniListWrapper>
      <AniListFilter
        total={total ?? list.length}
        sort={sort}
        sortOptions={sortOptions}
        onSortChange={onSortChange}
      />
      <AniListFlex>
        {list.map(anime => (
          <AniListCard key={anime.id} anime={anime} />
        ))}
      </AniListFlex>
    </AniListWrapper>
  );
}