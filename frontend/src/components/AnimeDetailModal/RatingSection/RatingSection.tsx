import React, { useState, useEffect } from "react";
import {
  RatingSectionWrapper,
  RatingCol,
  RatingTitle,
  RatingScore,
  StarRow,
  ListAddRow,
  ListAddIcon,
  ListCount,
} from "./RatingSection.styled";
import { Star as StarFull, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

interface RatingSectionProps {
  myRating: number;
  avgRating: number;
  listCount: number;
  onChangeMyRating?: (score: number) => void;
}

// 별점 렌더링 함수
function renderStars(
  score: number,
  onClick?: (val: number) => void,
  onHover?: (val: number) => void,
  onLeave?: () => void,
  hoverScore: number | null = null
) {
  return Array.from({ length: 5 }).map((_, i) => {
    const val = i + 1;
    const isFilled = score >= val;
    const icon = (
      <StarFull
        fill={isFilled ? "#F8A0BC" : "#fff"}
        stroke={isFilled ? "none" : "#F8A0BC"}
        width={32}
        height={32}
        strokeWidth={isFilled ? 1.6 : 0.2}
      />
    );
    const isActive = hoverScore !== null && hoverScore >= val;
    return (
      <span
        key={val}
        style={{
          cursor: onClick ? "pointer" : "default",
          display: "inline-block",
          position: "relative",
          transition: "transform 0.18s cubic-bezier(.5,1.8,.5,1), filter 0.12s",
          transform: isActive ? "scale(1.15)" : "scale(1)",
          filter: isActive ? "drop-shadow(0 0 6px #f8a0bc55)" : "none",
          zIndex: isActive ? 2 : 1,
        }}
        onClick={onClick ? () => onClick(val) : undefined}
        onMouseMove={onHover ? () => onHover(val) : undefined}
        onMouseLeave={onLeave}
      >
        {icon}
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
  const [hoverScore, setHoverScore] = useState<number | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    setHoverScore(null);
  }, [myRating]);

  return (
    <RatingSectionWrapper>
      <RatingCol>
        <RatingTitle>{t("anime.my_rating")}</RatingTitle>
        <RatingScore>{Number(hoverScore ?? myRating ?? 0).toFixed(1)}</RatingScore>
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
      <RatingCol>
        <RatingTitle>{t("anime.average_rating")}</RatingTitle>
        <RatingScore>{Number(avgRating ?? 0).toFixed(1)}</RatingScore>
        <StarRow>{renderStars(avgRating)}</StarRow>
      </RatingCol>
      <RatingCol>
        <RatingTitle>
          {t("anime.list_added")}
        </RatingTitle>
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