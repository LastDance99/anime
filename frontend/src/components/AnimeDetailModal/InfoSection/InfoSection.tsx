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

  // 줄거리 100자까지만 보여주고 ...더보기
  const MAX_LEN = 80;
  const desc = anime.description || "";
  const showEllipsis = desc.length > MAX_LEN;
  const displayedDesc = desc.slice(0, MAX_LEN) + (showEllipsis ? "..." : "");

  return (
    <InfoSectionWrapper>
      <InfoLeft>
        {/* 1라인 - 평점 */}
        <ScoreBadge>
          <span>★ {anime.rating}</span>
        </ScoreBadge>

        {/* 2라인 - 제목 */}
        <Title>{anime.title}</Title>

        {/* 3라인 - 정보 */}
        <MetaRow>
          <span>원작: {anime.original}</span>
          <span>/ {anime.genre_kor?.join(", ")}</span>
          <span>/ 유형: {anime.format}</span>
          <span>/ {anime.year}년 {anime.season}</span>
          <span>/ {anime.episodes}화</span>
          <span>/ {anime.studio}</span>
        </MetaRow>

        {/* 4라인 - 줄거리 */}
        <Desc>
          {displayedDesc}
          {showEllipsis && (
            <MoreButton onClick={() => setShowMore(true)}>더보기</MoreButton>
          )}
          {showMore && (
            <DescMoreModal
              description={anime.description}
              onClose={() => setShowMore(false)}
            />
          )}
        </Desc>

        {/* 5라인 - 리스트 추가 버튼 */}
        <AddButton onClick={onAddList}>
            {isAdded ? "리스트에서 제거" : "리스트에 추가"}
        </AddButton>
      </InfoLeft>
      <InfoRight>
        <PosterImg src={anime.imgUrl} alt={anime.title} style={{ width: 150, height: 200, borderRadius: 6, objectFit: "cover" }} />
      </InfoRight>
    </InfoSectionWrapper>
  );
}