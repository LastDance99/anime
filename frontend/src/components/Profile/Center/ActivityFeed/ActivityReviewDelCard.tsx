import React from "react";
import { BaseCard, AnimeImg, TimeText } from "./ActivityCard.styled";
import dayjs from "dayjs";

export default function ActivityReviewDelCard({
  anime_title,
  anime_img,
  created_at,
  review,
}: {
  anime_title: string;
  anime_img: string;
  created_at: string;
  review?: string;
}) {
  return (
    <BaseCard $type="review_del">
      <AnimeImg src={anime_img} alt={anime_title} />
      <span>
        <b style={{ color: "#B79E12" }}>{anime_title}</b>에 남긴 리뷰가 <b style={{ color: "#f44336" }}>삭제</b>되었습니다.
      </span>
      {review && <div style={{ marginTop: "6px" }}>{review}</div>}
      <TimeText>{dayjs(created_at).fromNow()}</TimeText>
    </BaseCard>
  );
}