import React from "react";
import { BaseCard, AnimeImg, TimeText } from "./ActivityCard.styled";
import dayjs from "dayjs";

export default function ActivityListDelCard({
  anime_title,
  anime_img,
  created_at,
}: {
  anime_title: string;
  anime_img: string;
  created_at: string;
}) {
  return (
    <BaseCard $type="list_del">
      <AnimeImg src={anime_img} alt={anime_title} />
      <span>{anime_title}이 리스트에서 <b style={{ color: "#e53935" }}>삭제</b>되었습니다.</span>
      <TimeText>{dayjs(created_at).fromNow()}</TimeText>
    </BaseCard>
  );
}
