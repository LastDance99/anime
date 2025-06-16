import React from "react";
import { InfoSectionWrapper, TitleBox, Badge, Title, MetaBox, MetaText, PosterImg } from "./InfoSection.styled";
import type { AnimeItem } from "../../../types/anime";

type InfoSectionProps = {
  anime: AnimeItem;
};

export default function InfoSection({ anime }: InfoSectionProps) {
  return (
    <InfoSectionWrapper>
      <PosterImg src={anime.image_url} alt={anime.title} />
      <div>
        <TitleBox>
          <Badge>⭐ {anime.rating.toFixed(1)}</Badge>
          <Title>{anime.title}</Title>
        </TitleBox>
        <MetaBox>
          <MetaText>장르: {anime.genre_kor.join(", ")}</MetaText>
          <MetaText>방영: {anime.year}년 {anime.season} / {anime.broadcast}</MetaText>
          <MetaText>원작: {anime.original} / 형식: {anime.format.toUpperCase()}</MetaText>
        </MetaBox>
      </div>
    </InfoSectionWrapper>
  );
}