import styled from "styled-components";

export const BaseCard = styled.div<{ $type?: string }>`
  width: 100%;
  min-height: 80px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.secondary}55;
  position: relative;
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
  margin-right: 10px;
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
  min-width: 50px;
  text-align: right;
  font-family: ${({ theme }) => theme.fonts.main};
  padding-right: 10px;
`;

export const SideInfoBox = styled.div`
  width: 100%;
  min-width: 60px;
  max-width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 80%;
  padding-right: 10px;
`;

export const Thumbnail = styled.img`
  width: 160px;
  height: 160px;
  object-fit: cover;
  padding: 6px 0 6px 0;
`;

export const StatsBox = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.subtext};
`;

export const StatItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const FlexBox = styled.div`
  width: 100%;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  padding: 10px 0 10px 10px;
  gap: 8px; // 여백 조금 주기
`;

export const TopBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PostTimeText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.subtext};
  font-family: ${({ theme }) => theme.fonts.main};
  position: absolute;
  top: 10px;
`;

export const PostStatsBox = styled.div`
  display: flex;
  gap: 6px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.subtext};
  position: absolute;
  bottom: 10px;
`;