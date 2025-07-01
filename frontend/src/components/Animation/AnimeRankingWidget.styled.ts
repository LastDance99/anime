import styled from "styled-components";

export const RankingBox = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1.6px solid ${({ theme }) => theme.colors.bordermain};
  border-radius: 18px;
  padding: 28px 24px 20px 24px;
  box-shadow: 0 2px 8px rgba(255, 182, 193, 0.07);
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.cafe24};

  ${({ theme }) => theme.media.mobile} {
    padding: 16px 6px 12px 6px;
    border-radius: 11px;
  }
`;

export const TabList = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 18px;
`;

export const Tab = styled.button<{ active?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.cute};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme, active }) => (active ? theme.colors.bordermain : theme.colors.subtext)};
  background: ${({ theme, active }) => (active ? theme.colors.primary : "none")};
  border: none;
  border-radius: 16px;
  font-weight: ${({ theme, active }) => (active ? theme.Weights.bold : theme.Weights.normal)};
  padding: 6px 22px;
  cursor: pointer;
  transition: background 0.13s, color 0.13s, font-weight 0.13s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.secondary};
    font-weight: ${({ theme }) => theme.Weights.bold};
  }
`;

export const RankingList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const RankingItem = styled.li`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.subcolor};
  border-radius: 13px;
  padding: 7px 12px;
  min-height: 58px;
  box-shadow: 0 1px 3px rgba(255, 182, 193, 0.08);

  ${({ theme }) => theme.media.mobile} {
    min-height: 44px;
    padding: 6px 6px;
    border-radius: 8px;
  }
`;

export const RankBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.cafe24};
  font-size: ${({ theme }) => theme.fontSizes.md};
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.bordermain};
  font-weight: ${({ theme }) => theme.Weights.bold};
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-right: 13px;
  ${({ theme }) => theme.media.mobile} {
    width: 22px;
    height: 22px;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    margin-right: 6px;
  }
`;

export const CoverThumb = styled.div`
  width: 44px;
  height: 62px;
  border-radius: 9px;
  background: #f8f8f8;
  overflow: hidden;
  margin-right: 14px;
  flex-shrink: 0;
  box-shadow: 0 1px 6px rgba(255, 182, 193, 0.14);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 32px;
    height: 42px;
    border-radius: 5px;
    margin-right: 7px;
  }
`;

export const RankingInfo = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const AnimeTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.cafe24};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.Weights.medium};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AnimeMeta = styled.div`
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-size: ${({ theme }) => theme.fontSizes.ss};
  color: ${({ theme }) => theme.colors.subtext};
  margin-top: 2px;
  letter-spacing: 0.01em;
  display: flex;
  gap: 10px;
`;
