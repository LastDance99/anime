import styled from "styled-components";

// InfoSection 스타일
export const InfoSectionWrapper = styled.section`
  display: flex;
  gap: 32px;
  align-items: flex-start;
  padding: 24px;
  background: #fdeaf4;
  border-radius: 0 0 16px 16px;
`;

export const PosterImg = styled.img`
  width: 108px;
  height: 150px;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

export const Badge = styled.span`
  font-size: 0.93rem;
  padding: 2px 8px;
  border-radius: 12px;
  background: #f7d9e9;
  color: #c35577;
  font-weight: bold;
`;

export const Title = styled.h2`
  font-size: 1.28rem;
  font-weight: bold;
  margin: 0;
  color: #333;
`;

export const MetaBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 4px;
`;

export const MetaText = styled.span`
  font-size: 0.97rem;
  color: #6a6a6a;
`;