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
import { useTranslation } from "react-i18next";

type Props = {
  list: UserAnimeItem[];
  totalCount?: number;
  onAnimeClick?: (anime: UserAnimeItem) => void;
  myAnimeList?: AnimeItem[];
  onAdd?: (anime: UserAnimeItem) => void;
  onRemove?: (anime: UserAnimeItem) => void;
  onToggleFavorite?: (anime: UserAnimeItem) => void;
  isMyPage: boolean;
};

export default function MyAniList({
  list,
  totalCount = 0,
  onAnimeClick,
  myAnimeList,
  onAdd,
  onRemove,
  onToggleFavorite,
  isMyPage,
}: Props) {
  const { t } = useTranslation();

  if (!list.length) return <div>{t("mylist.empty")}</div>;

  return (
    <ListWrapper>
      <ListCountText>
        {t("mylist.total", { count: totalCount })}
      </ListCountText>

      <ListHeader>
        <HeaderCol style={{ minWidth: 60 }} />
        <HeaderCol style={{ minWidth: 500, textAlign: "left" }}>
          {t("mylist.title")}
        </HeaderCol>
        <HeaderCol style={{ minWidth: 180, textAlign: "left", paddingLeft: 60 }}>
          {t("mylist.genre")}
        </HeaderCol>
        <HeaderCol style={{ minWidth: 36, textAlign: "left", marginRight: 10 }}>
          {t("mylist.my_rating")}
        </HeaderCol>
      </ListHeader>

      <AniListContainer>
        {list.map((item) => {
          const imageUrl =
            item.cover_image_xl ||
            item.cover_image_l ||
            item.cover_image_m ||
            item.imgUrl ||
            item.image_url ||
            "/images/no_poster.png";

          const genres: string[] =
            Array.isArray(item.genre_kor)
              ? item.genre_kor
              : Array.isArray(item.genres)
              ? item.genres
              : [];

          const isAdded = myAnimeList?.some((a) => a.id === item.id) ?? false;

          return (
            <MyAniListCard
              key={item.id}
              imgUrl={imageUrl}
              title={item.title}
              genres={genres}
              rating={item.rating}
              myRating={typeof item.my_rating === "number" ? item.my_rating
                : typeof item.rating === "number" ? item.rating
                : undefined}
              isAdded={isAdded}
              onAdd={isMyPage ? () => onAdd?.(item) : undefined}
              onRemove={isMyPage ? () => onRemove?.(item) : undefined}
              onToggleFavorite={isMyPage ? () => onToggleFavorite?.(item) : undefined}
              onClick={() => onAnimeClick?.(item)}
              isFavorite={item.is_favorite}
              canEdit={isMyPage}
            />
          );
        })}
      </AniListContainer>
    </ListWrapper>
  );
}