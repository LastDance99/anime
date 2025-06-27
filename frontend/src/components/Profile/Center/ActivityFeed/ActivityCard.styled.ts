import styled from "styled-components";

export const BaseCard = styled.div<{ $type?: string }>`
  width: 100%;
  min-height: 80px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 10px;
  position: relative;
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
  margin-left: 10px;
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

export const SideInfoBox = styled.div`
  position: absolute;
  bottom: 10px;
  right: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 80%;
`;

export const Thumbnail = styled.img`
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 0 4px rgba(0,0,0,0.1);
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

// export const TopBox = styled.div`
// 
// `;
// export const MiddleBox = styled.div`
// 
// `;
// export const RowBox = styled.div`
// 
// `;