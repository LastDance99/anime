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

// ✅ 1번 방법: 값이 nan, NaN, undefined, null, 빈문자열이면 fallback 사용
function valid(value: any, fallback = "데이터가 없습니다") {
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
  const [showMore, setShowMore] = useState(false);

  // ✅ 아래 모든 변수 선언에 valid 함수 적용!
  const title = valid(anime.title, "제목 없음");
  const genres: string[] = Array.isArray(anime.genres) ? anime.genres : [];
  const year = valid(anime.start_date ? anime.start_date.slice(0, 4) : null, "연도 정보 없음");
  const posterUrl = valid(anime.cover_image_xl, ""); // 이미지는 fallback 이미지를 직접 넣어도 됨
  const original = valid(anime.source, "--");
  const episodes = valid(anime.episodes, "--");
  const format = valid(anime.format, "--");
  const avgRating = valid(anime.average_rating, "--");
  const description = valid(anime.description, "설명 없음");

  const animationStudios = Array.isArray(anime.studios)
    ? anime.studios
        .filter((s: any) => s.node?.isAnimationStudio)
        .map((s: any) => valid(s.node.name, ""))
        .filter((name: string) => name !== "")
        .join(", ") || "제작사 정보 없음"
    : "제작사 정보 없음";

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
          <span>/ {genres.length > 0 ? genres.join(", ") : "장르 정보 없음"}</span>
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