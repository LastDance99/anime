import React from "react";
import { BaseCard, AnimeImg, TimeText } from "./ActivityListReviewCard.styled";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

interface Props {
  anime_title: string;
  anime_img: string;
  created_at: string;
  review?: string;
}

export default function ActivityReviewDelCard({
  anime_title,
  anime_img,
  created_at,
  review,
}: Props) {
  const { t } = useTranslation();

  return (
    <BaseCard $type="review_del">
      <AnimeImg src={anime_img} alt={anime_title} />
      <span>
        <b style={{ color: "#B79E12" }}>{anime_title}</b>
        {t("activity.review_suffix_deleted1")}
        <b style={{ color: "#f44336" }}>{t("activity.review_suffix_deleted2")}</b>
        {t("activity.review_suffix_deleted3")}
      </span>
      {review && <div style={{ marginTop: "6px" }}>{review}</div>}
      <TimeText>{dayjs(created_at).fromNow()}</TimeText>
    </BaseCard>
  );
}