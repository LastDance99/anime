import React from "react";
import MyAniListCard from "./MyAniListCard/MyAniListCard";
import { useOutletContext } from "react-router-dom";
import type { AnimeItem } from "../../../types/anime";
import type { AniListFilters } from "../../../types/AniListFilters";

type ProfileContext = {
  user: any;
  comments: any[];
  userAnimeList: AnimeItem[];
};

type Props = {
  filters: AniListFilters;
};

export default function MyAniList({ filters }: Props) {
  const { userAnimeList } = useOutletContext<ProfileContext>();
  
  if (!userAnimeList.length) {
    return <div>등록된 애니가 없습니다.</div>;
  }

  // 필터링 로직 적용
  const filteredList = userAnimeList.filter(item =>
    (!filters.genre || item.genreKor.includes(filters.genre)) &&
    (!filters.season || item.season === filters.season) &&
    (!filters.status || item.broadcast === filters.status) &&
    (!filters.year || item.year === filters.year)
  );

  if (!filteredList.length) {
    return <div>조건에 맞는 애니가 없습니다.</div>;
  }

  return (
    <>
      {filteredList.map(item => (
        <MyAniListCard
          key={item.id}
          imgUrl={item.imgUrl}
          title={item.title}
          genres={item.genreKor}
          rating={item.rating}
        />
      ))}
    </>
  );
}