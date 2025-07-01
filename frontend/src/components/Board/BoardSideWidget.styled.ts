import styled from "styled-components";

export const SideWidgetBox = styled.aside`
  width: 340px;
  background: ${({ theme }) => theme.colors.background};
  border: 1.6px solid ${({ theme }) => theme.colors.bordermain};
  border-radius: 16px;
  padding: 32px 24px 24px 24px;
  box-shadow: 0 2px 8px rgba(255, 182, 193, 0.08);
  font-family: ${({ theme }) => theme.fonts.cafe24};
  color: ${({ theme }) => theme.colors.text};

  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    padding: 18px 8px 12px 8px;
    border-radius: 10px;
  }
`;

export const WidgetTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.cuteBold};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.bordermain};
  margin-bottom: 16px;
  font-weight: bold;
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
`;

export const WidgetSection = styled.section`
  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ListItem = styled.li`
  padding: 0;
  border-radius: 10px;
  transition: background 0.15s;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

export const PostButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  padding: 7px 10px 7px 10px;
  border-radius: 10px;
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-size: ${({ theme }) => theme.fontSizes.sm};   // 더 작게!
  font-weight: ${({ theme }) => theme.Weights.normal}; // 400, 얇게
  color: ${({ theme }) => theme.colors.text};
  transition: background 0.15s, color 0.15s, font-weight 0.15s;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.fonts.cafe24}; // hover만 살짝 볼드
    font-weight: ${({ theme }) => theme.Weights.medium};
  }
  &:active {
    background: ${({ theme }) => theme.colors.bordermain};
    color: ${({ theme }) => theme.colors.background};
  }
`;

export const PostMeta = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xxs};
  color: ${({ theme }) => theme.colors.subtext};
  margin-left: 7px;
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-weight: ${({ theme }) => theme.Weights.light};
`;

export const PostNewBadge = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.xxs};
  font-family: ${({ theme }) => theme.fonts.cute};
  border-radius: 7px;
  padding: 2px 8px;
  margin-left: 6px;
  vertical-align: middle;
`;

export const WidgetDivider = styled.hr`
  border: none;
  border-top: 1.2px dashed ${({ theme }) => theme.colors.bordermain};
  margin: 18px 0;
  opacity: 0.7;
`;

export const WidgetSectionTitle = styled.h4`
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.bordermain};
  margin-bottom: 8px;
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  font-weight: 400;
`;