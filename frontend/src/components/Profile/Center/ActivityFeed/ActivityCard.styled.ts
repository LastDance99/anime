import styled from "styled-components";

export const BaseCard = styled.div<{ $type?: string }>`
  width: 100%;
  min-height: 80px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 16px;
  background: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.secondary}55;
`;

export const ProfileImg = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.subcolor};
`;

export const AnimeImg = styled.img`
  width: 56px;
  height: 80px;
  border-radius: 10px;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.subcolor};
`;

export const Nickname = styled.span`
  font-weight: ${({ theme }) => theme.Weights.bold};
  font-family: ${({ theme }) => theme.fonts.cafe24};
`;

export const TimeText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.subtext};
  margin-left: auto;
  min-width: 60px;
  text-align: right;
  font-family: ${({ theme }) => theme.fonts.main};
`;