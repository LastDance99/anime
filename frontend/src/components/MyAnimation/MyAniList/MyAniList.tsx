import React from "react";
import MyAniListCard from "./MyAniListCard/MyAniListCard";
import type { UserAnimeItem, AnimeItem } from "../../../types/anime";
import {
  AniListContainer,
  ListWrapper,
  ListHeader,
  HeaderCol,
  ListCountText,
} from "./MyAniList.styled";

type Props = {
  list: UserAnimeItem[];
  onAnimeClick?: (anime: UserAnimeItem) => void;
  myAnimeList?: AnimeItem[];
  onDelete?: (anime: UserAnimeItem) => void; // ✅ 부모에게 전달할 삭제 핸들러
  onToggleFavorite?: (anime: UserAnimeItem) => void; // 필요 시 즐겨찾기도 위임 가능
};

export default function MyAniList({
  list,
  onAnimeClick,
  myAnimeList,
  onDelete,
  onToggleFavorite,
}: Props) {
  if (!list.length) return <div>등록된 애니가 없습니다.</div>;

  return (
    <ListWrapper>
      <ListCountText>
        총 <span>{list.length}</span>개의 애니
      </ListCountText>

      <ListHeader>
        <HeaderCol style={{ minWidth: 40 }} />
        <HeaderCol style={{ minWidth: 360, textAlign: "left" }}>제목</HeaderCol>
        <HeaderCol style={{ minWidth: 120, textAlign: "center" }}>장르</HeaderCol>
        <HeaderCol style={{ minWidth: 36, textAlign: "left", marginRight: 10 }}>내 점수</HeaderCol>
      </ListHeader>

      <AniListContainer>
        {list.map((item) => {
          const imageUrl =
            item.cover_image_xl ||
            item.cover_image_l ||
            item.imgUrl ||
            item.image_url ||
            "/images/no_poster.png";

          const genres: string[] =
            Array.isArray(item.genre_kor) ? item.genre_kor :
            Array.isArray(item.genres) ? item.genres :
            [];

          return (
            <MyAniListCard
              key={item.id}
              imgUrl={imageUrl}
              title={item.title}
              genres={genres}
              rating={item.rating}
              myRating={item.my_rating}
              isFavorite={myAnimeList?.some(a => a.id === item.id) ?? false}
              onToggleFavorite={() => onToggleFavorite?.(item)}
              onDelete={() => onDelete?.(item)} // ✅ 부모에게 위임
              onClick={() => onAnimeClick?.(item)}
            />
          );
        })}
      </AniListContainer>
    </ListWrapper>
  );
}