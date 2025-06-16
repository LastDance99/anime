import styled from "styled-components";

export const Section = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff8fc;
  border-bottom: 1px solid #f4cfe3;
  padding: 22px 36px 18px 36px;
`;

export const RatingBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

export const SubTitle = styled.div`
  font-size: 1.03rem;
  color: #b47aac;
  margin-bottom: 3px;
  font-weight: 600;
`;

export const StarBox = styled.div`
  display: flex;
  gap: 3px;
`;

export const Star = styled.span<{ $active?: boolean }>`
  font-size: 1.65rem;
  color: ${({ $active }) => ($active ? "#FFD36B" : "#ddd")};
  cursor: pointer;
  user-select: none;
  transition: color 0.18s;
`;

export const StatBox = styled.div`
  display: flex;
  gap: 38px;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

export const StatLabel = styled.span`
  font-size: 0.94rem;
  color: #a7a7a7;
  line-height: 1.16;
  text-align: center;
`;

export const StatValue = styled.span`
  font-size: 1.23rem;
  color: #6c3566;
  font-weight: bold;
  letter-spacing: 0.02em;
`;