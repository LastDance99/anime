import React from "react";
import { BaseCard, AnimeImg, TimeText, SideInfoBox, AniTitle, Title } from "./ActivityListReviewCard.styled";
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
      <AniTitle>
        <Title style={{ color: "#B79E12" }}>{anime_title}</Title>
        {t("activity.review_suffix_deleted1")}
        <b style={{ color: "#f44336" }}>{t("activity.review_suffix_deleted2")}</b>
        {t("activity.review_suffix_deleted3")}
      </AniTitle>
      {review && <div style={{ marginTop: "6px" }}>{review}</div>}
      <SideInfoBox>
        <TimeText>{dayjs(created_at).fromNow()}</TimeText>
      </SideInfoBox>
    </BaseCard>
  );
}