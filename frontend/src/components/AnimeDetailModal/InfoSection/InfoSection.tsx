import React, { useState } from "react";
import {
  InfoSectionWrapper,
  InfoLeft,
  InfoRight,
  ScoreBadge,
  Title,
  MetaRow,
  Desc,
  MoreButton,
  AddButton,
  PosterImg,
} from "./InfoSection.styled";
import DescMoreModal from "./DescMoreModal/DescMoreModal";
import type { AnimeItem } from "../../../types/anime";
import { useTranslation } from "react-i18next";

function valid(value: any, fallback: string) {
  if (
    value === undefined ||
    value === null ||
    value === "nan" ||
    value === "NaN" ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return fallback;
  }
  return value;
}

interface Props {
  anime: AnimeItem;
  onAddList?: () => void;
  isAdded?: boolean;
  onDelete?: () => void;
}

export default function InfoSection({
  anime,
  onAddList,
  isAdded = false,
  onDelete,
}: Props) {
  const { t } = useTranslation();
  const [showMore, setShowMore] = useState(false);

  const title = valid(anime.title, t("anime.no_title"));
  const genres: string[] = Array.isArray(anime.genres) ? anime.genres : [];
  const year = valid(anime.start_date ? anime.start_date.slice(0, 4) : null, t("anime.no_year"));
  const posterUrl = valid(anime.cover_image_xl, "");
  const original = valid(anime.source, "--");
  const episodes = valid(anime.episodes, "--");
  const format = valid(anime.format, "--");
  const avgRating = valid(anime.average_rating, "--");
  const description = valid(anime.description, t("anime.no_description"));
  const status = valid(anime.status, "--");
  const duration = valid(anime.duration, "--");
  const season = valid(anime.season, "--");

  const animationStudios = Array.isArray(anime.studios)
    ? anime.studios
        .filter((s: any) => s.node?.isAnimationStudio)
        .map((s: any) => valid(s.node.name, ""))
        .filter((name: string) => name !== "")
        .join(", ") || t("anime.no_studio")
    : t("anime.no_studio");

  const MAX_LEN = 80;
  const plainDesc = description.replace(/<[^>]+>/g, "");
  const showEllipsis = plainDesc.length > MAX_LEN;
  const displayedDesc = plainDesc.slice(0, MAX_LEN) + (showEllipsis ? "..." : "");

  const handleToggleList = () => {
    onAddList?.();
  };

  const handleDelete = () => {
    if (window.confirm(t("anime.confirm_delete"))) {
      onDelete?.();
    }
  };

  return (
    <InfoSectionWrapper>
      <InfoLeft>
        <ScoreBadge>
          <span>★ {avgRating}</span>
        </ScoreBadge>
        <Title>{title}</Title>
        <MetaRow>
          <span>{t("anime.source")}: {original}</span>
          <span>/</span>
          <span>{genres.length > 0 ? genres.join(", ") : t("anime.no_genre")}</span>
          <span>/</span>
          <span>{t("anime.format")}: {format}</span>
          <span>/</span>
          <span>{year}{t("anime.unit.year")} {season}</span>
        </MetaRow>
        <MetaRow>
          <span>{episodes}{t("anime.unit.episode")}</span>
          <span>/</span>
          <span>{duration}{t("anime.unit.minute")}</span>
          <span>/</span>
          <span>{t("anime.studio")}: {animationStudios}</span>
          <span>/</span>
          <span>{status}</span>
        </MetaRow>
        <Desc>
          <span dangerouslySetInnerHTML={{ __html: displayedDesc }} />
          {showEllipsis && (
            <MoreButton onClick={() => setShowMore(true)}>
              {t("anime.expand")}
            </MoreButton>
          )}
        </Desc>
        {showMore && (
          <DescMoreModal
            description={description}
            onClose={() => setShowMore(false)}
          />
        )}
        {onDelete ? (
          <AddButton onClick={handleDelete}>
            {t("anime.remove_list")}
          </AddButton>
        ) : (
          <AddButton onClick={handleToggleList}>
            {isAdded ? t("anime.remove_list") : t("anime.add_list")}
          </AddButton>
        )}
      </InfoLeft>
      <InfoRight>
        {posterUrl && <PosterImg src={posterUrl} alt={title} />}
      </InfoRight>
    </InfoSectionWrapper>
  );
}