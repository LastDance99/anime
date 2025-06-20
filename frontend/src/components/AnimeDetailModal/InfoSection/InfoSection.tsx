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

interface Props {
  anime: any;
  onAddList?: () => void;
  isAdded?: boolean;
}

export default function InfoSection({ anime, onAddList, isAdded }: Props) {
  const [showMore, setShowMore] = useState(false);

  const title = anime.title || "-";
  const genres = anime.genres || [];
  const year = anime.start_date ? anime.start_date.slice(0, 4) : "-";
  const posterUrl = anime.cover_image_xl || "";
  const original = anime.source || "-";
  const episodes = anime.episodes ?? "-";
  const format = anime.format || "-";
  const avgRating = anime.average_rating ?? "-";
  const description = anime.description || "";

  const animationStudios =
    Array.isArray(anime.studios)
      ? anime.studios
          .filter((s: any) => s.node?.isAnimationStudio)
          .map((s: any) => s.node.name)
          .join(", ")
      : "-";

  const MAX_LEN = 80;
  const plainDesc = description.replace(/<[^>]+>/g, "");
  const showEllipsis = plainDesc.length > MAX_LEN;
  const displayedDesc = plainDesc.slice(0, MAX_LEN) + (showEllipsis ? "..." : "");

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
          {/* "더보기"를 눌러도 InfoSection 줄거리는 80자 미리보기만! */}
          <span
            dangerouslySetInnerHTML={{ __html: displayedDesc }}
          />
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
        <AddButton onClick={onAddList}>
          {isAdded ? "리스트에서 제거" : "리스트에 추가"}
        </AddButton>
      </InfoLeft>
      <InfoRight>
        {posterUrl && <PosterImg src={posterUrl} alt={title} />}
      </InfoRight>
    </InfoSectionWrapper>
  );
}