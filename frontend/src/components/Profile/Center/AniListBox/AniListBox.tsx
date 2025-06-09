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
        <AniListTitle>--- 애니리스트</AniListTitle>
      </AniListHeader>
      <CardBox>
        {animeList.slice(0, 20).map((item: AnimeItem) => (
          <AniCard key={item.id}>
            <AniCardImage src={item.imgUrl} alt={item.title} />
          </AniCard>
        ))}
      </CardBox>
    </AniListSectionWrapper>
  );
}