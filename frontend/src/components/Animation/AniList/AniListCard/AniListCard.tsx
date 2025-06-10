import React from "react";
import { CardBox, AniImg, AniTitle } from "./AniListCard.styled";

export default function AniListCard({ anime }) {
  return (
    <CardBox>
      <AniImg src={anime.imgUrl} alt={anime.title} />
      <AniTitle>{anime.title}</AniTitle>
    </CardBox>
  );
}