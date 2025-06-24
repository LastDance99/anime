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
  const [showMore, setShowMore] = useState(false);

  const title = anime.title || "-";
  const genres: string[] = Array.isArray(anime.genres) ? anime.genres : [];

  const year = anime.start_date ? anime.start_date.slice(0, 4) : "-";
  const posterUrl = anime.cover_image_xl || "";
  const original = anime.source || "-";
  const episodes = anime.episodes ?? "-";
  const format = anime.format || "-";
  const avgRating = anime.average_rating ?? "-";
  const description = anime.description || "";

  const animationStudios = Array.isArray(anime.studios)
    ? anime.studios
        .filter((s: any) => s.node?.isAnimationStudio)
        .map((s: any) => s.node.name)
        .join(", ")
    : "-";

  const MAX_LEN = 80;
  const plainDesc = description.replace(/<[^>]+>/g, "");
  const showEllipsis = plainDesc.length > MAX_LEN;
  const displayedDesc = plainDesc.slice(0, MAX_LEN) + (showEllipsis ? "..." : "");

  const handleToggleList = () => {
    onAddList?.();
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
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
          <span>원작: {original}</span>
          <span>/ {genres.join(", ")}</span>
          <span>/ 유형: {format}</span>
          <span>/ {year}</span>
          <span>/ {episodes}화</span>
          <span>/ {animationStudios}</span>
        </MetaRow>
        <Desc>
          <span dangerouslySetInnerHTML={{ __html: displayedDesc }} />
          {showEllipsis && (
            <MoreButton onClick={() => setShowMore(true)}>더보기</MoreButton>
          )}
        </Desc>
        {showMore && (
          <DescMoreModal
            description={description}
            onClose={() => setShowMore(false)}
          />
        )}
        {onDelete ? (
          <AddButton onClick={handleDelete}>리스트에서 삭제</AddButton>
        ) : (
          <AddButton onClick={handleToggleList}>
            {isAdded ? "리스트에서 제거" : "리스트에 추가"}
          </AddButton>
        )}
      </InfoLeft>
      <InfoRight>
        {posterUrl && <PosterImg src={posterUrl} alt={title} />}
      </InfoRight>
    </InfoSectionWrapper>
  );
}