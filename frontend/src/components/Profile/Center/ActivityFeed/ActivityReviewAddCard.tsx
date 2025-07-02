import React from "react";
import { BaseCard, AnimeImg, TimeText } from "./ActivityListReviewCard.styled";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

interface Props {
  anime_title: string;
  anime_img: string;
  review: string;
  created_at: string;
}

export default function ActivityReviewAddCard({
  anime_title,
  anime_img,
  review,
  created_at,
}: Props) {
  const { t } = useTranslation();

  return (
    <BaseCard $type="review_add">
      <AnimeImg src={anime_img} alt={anime_title} />
      <span>
        <b style={{ color: "#B79E12" }}>{anime_title}</b>
        {t("activity.review_suffix_added1")}
        <b style={{ color: "#2196f3" }}>{t("activity.review_suffix_added2")}</b>
        {t("activity.review_suffix_added3")}
      </span>
      <TimeText>{dayjs(created_at).fromNow()}</TimeText>
    </BaseCard>
  );
}