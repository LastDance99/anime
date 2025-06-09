// components/ActivityFeed/ActivityCard.styled.ts
import styled from "styled-components";

export const BaseCard = styled.div<{ $type?: string }>`
  width: 100%;
  min-height: 80px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 16px;
  background: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

export const ProfileImg = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 8px;
  object-fit: cover;
`;

export const AnimeImg = styled.img`
  width: 56px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
`;

export const Nickname = styled.span`
  font-weight: ${({ theme }) => theme.Weights.bold};
`;

export const TimeText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.subtext};
  margin-left: auto;
  min-width: 60px;
  text-align: right;
`;
