import React from "react";
import { CardWrapper, Thumbnail, Title, Genre, Score } from "./MyAniListCard.styled";
import { MessageCircle } from "lucide-react";

type MyAniListCardProps = {
  imgUrl: string;
  title: string;
  genres: string[];
  rating: number;
};

export default function MyAniListCard({ imgUrl, title, genres, rating }: MyAniListCardProps) {
  return (
    <CardWrapper>
      <Thumbnail src={imgUrl} alt={title} />
      <Title>{title}</Title>
      <MessageCircle size={18} style={{ margin: "0 16px" }} />
      <Genre>{genres.join(", ")}</Genre>
      <Score>{rating.toFixed(1)}</Score>
    </CardWrapper>
  );
}