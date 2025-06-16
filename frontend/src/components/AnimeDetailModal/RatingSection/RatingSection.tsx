import React from "react";
import { Section, RatingBox, SubTitle, StarBox, Star, StatBox, StatItem, StatLabel, StatValue } from "./RatingSection.styled";

type Props = {
  myRating: number;
  onChangeMyRating: (val: number) => void;
  avgRating: number;
  listCount: number;
};

export default function RatingSection({ myRating, onChangeMyRating, avgRating, listCount }: Props) {
  return (
    <Section>
      <RatingBox>
        <SubTitle>내 평점</SubTitle>
        <StarBox>
          {[1, 2, 3, 4, 5].map(i => (
            <Star
              key={i}
              $active={i <= myRating}
              onClick={() => onChangeMyRating(i)}
            >
              ★
            </Star>
          ))}
        </StarBox>
      </RatingBox>
      <StatBox>
        <StatItem>
          <StatLabel>평균 평점</StatLabel>
          <StatValue>
            {avgRating.toFixed(1)}
            <span style={{ marginLeft: 3, color: "#FFC36B" }}>★</span>
          </StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>리스트에<br/>추가된 수</StatLabel>
          <StatValue>{listCount}</StatValue>
        </StatItem>
      </StatBox>
    </Section>
  );
}