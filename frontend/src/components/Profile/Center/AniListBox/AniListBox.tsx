import React from "react";
import { useTranslation } from "react-i18next";
import {
  AniListSectionWrapper,
  AniListHeader,
  AniListTitle,
  CardBox,
  AniCard,
  AniCardImage,
} from "./AniListBox.styled";
import type { AnimeItem } from "../../../../types/anime";

export default function AniListBox({ animeList }: { animeList: AnimeItem[] }) {
  const { t } = useTranslation();

  return (
    <AniListSectionWrapper>
      <AniListHeader>
        <AniListTitle>{t("anime.favorite_title")}</AniListTitle>
      </AniListHeader>
      <CardBox>
        {animeList.length === 0 ? (
          <div style={{ padding: "8px", color: "#999" }}>
            {t("anime.no_anime")}
          </div>
        ) : (
          animeList.map((item) => (
            <AniCard key={item.anime_id}>
              <AniCardImage
                src={item.cover_image_l || item.imgUrl || "/images/no_img.png"}
                alt={item.title}
              />
            </AniCard>
          ))
        )}
      </CardBox>
    </AniListSectionWrapper>
  );
}