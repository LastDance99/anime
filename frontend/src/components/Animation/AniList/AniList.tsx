import React from "react";
import AniListFilter from "./AniListFilter/AniListFilter";
import { AniListWrapper } from "./AniList.styled";
import { AniListFlex } from "./AniListFlex.styled";
import AniListCard from "./AniListCard/AniListCard";
import type { AnimeItem } from "../../../types/anime";
import { useTranslation } from "react-i18next";

interface AniListProps {
  list: AnimeItem[];
  total?: number;
  sort: string;
  sortOptions: { label: string; value: string }[];
  onSortChange: (value: string) => void;
  scrollRef?: React.RefObject<HTMLDivElement>;
  loaderRef?: React.RefObject<HTMLDivElement>;
  onAnimeClick?: (anime: AnimeItem) => void;
  loading?: boolean;
  userAnimeIds: number[];
  onToggleAnimeList: (anime: AnimeItem) => void;
  isFiltered: boolean;
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
  loading,
  userAnimeIds,
  onToggleAnimeList,
  isFiltered,
}: AniListProps) {
  const { t } = useTranslation();

  const processedList = list.map(anime => ({
    ...anime,
    isAdded: userAnimeIds.includes(anime.id),
  }));

  if (!loading && (!list || list.length === 0)) {
    return <AniListWrapper>{t("anime.empty_list")}</AniListWrapper>;
  }

  return (
    <AniListWrapper>
      <AniListFilter
        total={total ?? list.length}
        sort={sort}
        sortOptions={sortOptions}
        onSortChange={onSortChange}
        isFiltered={isFiltered}
      />
      <AniListFlex ref={scrollRef}>
        {processedList.map(anime => (
          <AniListCard
            key={anime.id}
            anime={anime}
            isAdded={anime.isAdded ?? false}
            onClick={onAnimeClick ? () => onAnimeClick(anime) : undefined}
            onToggle={() => onToggleAnimeList(anime)}
          />
        ))}
        <div ref={loaderRef} style={{ height: 30, background: "yellow" }} />
      </AniListFlex>
    </AniListWrapper>
  );
}