import React from "react";
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
  return (
    <AniListSectionWrapper>
      <AniListHeader>
        <AniListTitle>최애 애니</AniListTitle>
      </AniListHeader>
      <CardBox>
        {animeList.length === 0 ? (
          <div style={{ padding: "8px", color: "#999" }}>등록된 애니가 없습니다.</div>
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