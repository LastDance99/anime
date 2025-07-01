import React from "react";
import { BaseCard, AnimeImg, TimeText } from "./ActivityListReviewCard.styled";
import dayjs from "dayjs";

export default function ActivityReviewAddCard({
  anime_title,
  anime_img,
  review,
  created_at,
}: {
  anime_title: string;
  anime_img: string;
  review: string;
  created_at: string;
}) {
  return (
    <BaseCard $type="review_add">
      <AnimeImg src={anime_img} alt={anime_title} />
      <span><b style={{ color: "#B79E12" }}>{anime_title}</b>에 리뷰를 <b style={{ color: "#2196f3" }}>작성</b>하였습니다.</span>
      <TimeText>{dayjs(created_at).fromNow()}</TimeText>
    </BaseCard>
  );
}