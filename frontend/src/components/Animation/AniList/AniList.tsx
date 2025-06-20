import React from "react";
import AniListFilter from "./AniListFilter/AniListFilter";
import { AniListWrapper } from "./AniList.styled";
import { AniListFlex } from "./AniListFlex.styled";
import AniListCard from "./AniListCard/AniListCard";
import type { AnimeItem } from "../../../types/anime";

interface AniListProps {
  list: AnimeItem[];
  total?: number;
  sort: string;
  sortOptions: { label: string; value: string }[];
  onSortChange: (value: string) => void;
  scrollRef?: React.RefObject<HTMLDivElement>;
  loaderRef?: React.RefObject<HTMLDivElement>;
  onAnimeClick?: (anime: AnimeItem) => void;
}

export default function AniList({
  list,
  total,
  sort,
  sortOptions,
  onSortChange,
  scrollRef,
  loaderRef,
  onAnimeClick,
}: AniListProps) {
  if (!list || list.length === 0) {
    return <AniListWrapper>애니메이션 목록이 없습니다.</AniListWrapper>;
  }

  return (
    <AniListWrapper>
      <AniListFilter
        total={total ?? list.length}
        sort={sort}
        sortOptions={sortOptions}
        onSortChange={onSortChange}
      />
      <AniListFlex ref={scrollRef}>
        {list.map(anime => (
          <AniListCard
            key={anime.id}
            anime={anime}
            onClick={onAnimeClick ? () => onAnimeClick(anime) : undefined}
          />
        ))}
        <div ref={loaderRef} style={{ height: 30, background: "yellow" }} />
      </AniListFlex>
    </AniListWrapper>
  );
}