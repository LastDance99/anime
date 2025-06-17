import React, { useState } from "react";
import {
  RatingSectionWrapper,
  RatingCol,
  RatingTitle,
  RatingScore,
  StarRow,
  ListAddRow,
  ListAddIcon,
  ListCount
} from "./RatingSection.styled";
import { Star as StarFull, StarHalf, Plus } from "lucide-react";

interface RatingSectionProps {
  myRating: number;
  avgRating: number;
  listCount: number;
  onChangeMyRating?: (score: number) => void;
}

// 별 렌더링 함수 (클릭, hover 지원)
function renderStars(
  score: number,
  onClick?: (val: number) => void,
  onHover?: (val: number) => void,
  onLeave?: () => void,
  hoverScore?: number | null
) {
  return Array.from({ length: 5 }).map((_, i) => {
    const leftVal = i + 1;
    const rightVal = i + 1;
    const icon =
      score >= leftVal ? (
        <StarFull fill="#F8A0BC" stroke="none" width={32} height={32} strokeWidth={1.6} />
      ) : (
        <StarFull fill="#fff" stroke="#F8A0BC" width={32} height={32} strokeWidth={0.2} />
      );
    // 애니메이션 스타일
    const isActive = hoverScore !== undefined && hoverScore !== null && hoverScore >= rightVal;
    return (
      <span
        key={i}
        style={{
          cursor: onClick ? "pointer" : "default",
          display: "inline-block",
          position: "relative",
          transition: "transform 0.18s cubic-bezier(.5,1.8,.5,1), filter 0.12s",
          transform: isActive ? "scale(1.15)" : "scale(1)",
          filter: isActive ? "drop-shadow(0 0 6px #f8a0bc55)" : "none",
          zIndex: isActive ? 2 : 1,
        }}
      >
        {onClick ? (
          <>
            {/* 왼쪽(반 별) hover/click */}
            <span
              style={{
                position: "absolute",
                left: 0, top: 0, width: "50%", height: "100%", zIndex: 10,
              }}
              onClick={() => onClick(leftVal)}
              onMouseMove={() => onHover?.(leftVal)}
              onMouseLeave={onLeave}
            />
            {/* 오른쪽(꽉 별) hover/click */}
            <span
              style={{
                position: "absolute",
                right: 0, top: 0, width: "50%", height: "100%", zIndex: 10,
              }}
              onClick={() => onClick(rightVal)}
              onMouseMove={() => onHover?.(rightVal)}
              onMouseLeave={onLeave}
            />
            {icon}
          </>
        ) : (
          icon
        )}
      </span>
    );
  });
}

export default function RatingSection({
  myRating,
  avgRating,
  listCount,
  onChangeMyRating,
}: RatingSectionProps) {
  // ⭐️ hover 별점 임시 상태
  const [hoverScore, setHoverScore] = useState<number | null>(null);

  return (
    <RatingSectionWrapper>
      {/* 내 평점 (클릭/hover 지원) */}
      <RatingCol>
        <RatingTitle>내 평점</RatingTitle>
        <RatingScore>
          {(hoverScore ?? myRating).toFixed(1)}
        </RatingScore>
        <StarRow style={{ userSelect: "none" }}>
          {renderStars(
            hoverScore ?? myRating,
            onChangeMyRating,
            setHoverScore,
            () => setHoverScore(null),
            hoverScore
          )}
        </StarRow>
      </RatingCol>
      {/* 평균 평점 (static) */}
      <RatingCol>
        <RatingTitle>평균 평점</RatingTitle>
        <RatingScore>{avgRating.toFixed(1)}</RatingScore>
        <StarRow>
          {renderStars(avgRating)}
        </StarRow>
      </RatingCol>
      {/* 리스트 추가 수 */}
      <RatingCol>
        <RatingTitle>리스트에<br />추가된 수</RatingTitle>
        <ListAddRow>
          <ListAddIcon>
            <Plus size={20} strokeWidth={3} color="#F8A0BC" />
          </ListAddIcon>
          <ListCount>{listCount ?? "----"}</ListCount>
        </ListAddRow>
      </RatingCol>
    </RatingSectionWrapper>
  );
}