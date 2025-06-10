import React from "react";
import { AniListGrid } from "./AniList.styled";
import AniListCard from "./AniListCard/AniListCard";
import type { AnimeItem } from "../../../types/anime"; // 경로는 실제 프로젝트 구조에 맞게 조정

interface AniListProps {
  list: AnimeItem[];
}

export default function AniList({ list }: AniListProps) {
  return (
    <AniListGrid>
      {list.map(anime => (
        <AniListCard key={anime.id} anime={anime} />
      ))}
    </AniListGrid>
  );
}