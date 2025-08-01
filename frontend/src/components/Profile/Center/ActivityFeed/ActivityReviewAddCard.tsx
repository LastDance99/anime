import React from "react";
import { BaseCard, AnimeImg, TimeText, SideInfoBox, AniTitle, Title } from "./ActivityListReviewCard.styled";
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
      <AniTitle>
        <Title style={{ color: "#B79E12" }}>{anime_title}</Title>
        {t("activity.review_suffix_added1")}
        <b style={{ color: "#2196f3" }}>{t("activity.review_suffix_added2")}</b>
        {t("activity.review_suffix_added3")}
      </AniTitle>
      <SideInfoBox>
        <TimeText>{dayjs(created_at).fromNow()}</TimeText>
      </SideInfoBox>
    </BaseCard>
  );
}