import React, { useState } from "react";
import MyAniListCard from "./MyAniListCard/MyAniListCard";
import { useOutletContext } from "react-router-dom";
import type { UserAnimeItem } from "../../../types/anime";
import type { AniListFilters } from "../../../types/AniListFilters";
import {
  AniListContainer,
  ListWrapper,
  ListHeader,
  HeaderCol,
  ListCountText,
} from "./MyAniList.styled";

type ProfileContext = {
  user: any;
  comments: any[];
  userAnimeList: UserAnimeItem[];
};

type Props = {
  filters: AniListFilters;
  onAnimeClick?: (anime: UserAnimeItem) => void; // ⭐️ 추가!
};

export default function MyAniList({ filters, onAnimeClick }: Props) {
  const { userAnimeList } = useOutletContext<ProfileContext>();
  const [list, setList] = useState(userAnimeList);

  const filteredList = list.filter(
    (item) =>
      (!filters.genre || item.genre_kor.includes(filters.genre)) &&
      (!filters.season || item.season === filters.season) &&
      (!filters.status || item.broadcast === filters.status) &&
      (!filters.format || item.format === filters.format) &&
      (!filters.original || item.original === filters.original) &&
      (!filters.year || item.year === filters.year)
  );

  const sortedList = filteredList.slice();
  if (filters.sort === "latest") {
    sortedList.sort(
      (a, b) => new Date(b.added_at).getTime() - new Date(a.added_at).getTime()
    );
  } else if (filters.sort === "oldest") {
    sortedList.sort(
      (a, b) => new Date(a.added_at).getTime() - new Date(b.added_at).getTime()
    );
  }

  const handleToggleFavorite = (id: number) => {
    setList((list) =>
      list.map((item) =>
        item.id === id ? { ...item, is_favorite: !item.is_favorite } : item
      )
    );
  };

  const handleDelete = (id: number) => {
    setList((list) => list.filter((item) => item.id !== id));
  };

  if (!userAnimeList.length) return <div>등록된 애니가 없습니다.</div>;
  if (!filteredList.length) return <div>조건에 맞는 애니가 없습니다.</div>;

  return (
    <ListWrapper>
      {/* 전체 개수 카운트 */}
      <ListCountText>
        총 <span>{sortedList.length}</span>개의 애니
      </ListCountText>

      {/* 헤더 */}
      <ListHeader>
        <HeaderCol style={{ minWidth: 40 }} />
        <HeaderCol style={{ minWidth: 360, textAlign: "left" }}>제목</HeaderCol>
        <HeaderCol style={{ minWidth: 120, textAlign: "center" }}>장르</HeaderCol>
        <HeaderCol style={{ minWidth: 36, textAlign: "left", marginRight: 10 }}>내 점수</HeaderCol>
      </ListHeader>
      {/* 카드 리스트 */}
      <AniListContainer>
        {sortedList.map((item) => (
          <MyAniListCard
            key={item.id}
            imgUrl={item.image_url}
            title={item.title}
            genres={item.genre_kor}
            rating={item.rating}
            myRating={item.my_rating}
            isFavorite={item.is_favorite ?? false}
            onToggleFavorite={() => handleToggleFavorite(item.id)}
            onDelete={() => handleDelete(item.id)}
            onClick={() => onAnimeClick?.(item)} // ⭐️ 카드 클릭시 상세모달용!
          />
        ))}
      </AniListContainer>
    </ListWrapper>
  );
}