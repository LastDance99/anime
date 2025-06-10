// components/Profile/Center/StatsBox/StatsBox.tsx
import React from "react";
import { StatsRow, StatBox, StatNumber, StatLabel } from "./StatsBox.styled";

export default function StatsBox({
  totalAnime,
  avgScore,
  // heartCount,
  attendance,
}: {
  totalAnime: number;
  avgScore: number;
  // heartCount: number;
  attendance: number;
}) {
  return (
    <StatsRow>
      <StatBox>
        <StatNumber>{totalAnime}</StatNumber>
        <StatLabel>애니리스트</StatLabel>
      </StatBox>
      <StatBox>
        <StatNumber>{avgScore}</StatNumber>
        <StatLabel>평균 점수</StatLabel>
      </StatBox>
      {/* <StatBox>
        <StatNumber>{heartCount}</StatNumber>
        <StatLabel>받은 하트 수</StatLabel>
      </StatBox> */}
      <StatBox>
        <StatNumber>{attendance}</StatNumber>
        <StatLabel>출석일</StatLabel>
      </StatBox>
    </StatsRow>
  );
}
