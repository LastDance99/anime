import styled from "styled-components";

export const SeasonSection = styled.section`
  width: 100%;
  margin-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.bordermain};
  padding-bottom: 20px;
`;

export const SeasonTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base}; // 16px
  font-weight: ${({ theme }) => theme.Weights.bold};
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.text};
`;

export const SeasonButtonList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const SeasonButton = styled.button<{ $selected?: boolean }>`
  border: ${({ $selected, theme }) =>
    $selected ? `2px solid ${theme.colors.bordermain}` : `1px solid ${theme.colors.bordermain}`};
  background: ${({ $selected, theme }) =>
    $selected ? theme.colors.primary : theme.colors.background};
  border-radius: 18px;
  width: 86px;
  min-height: 16px;
  font-size: ${({ theme }) => theme.fontSizes.xl}; // 20px
  font-weight: ${({ theme }) => theme.Weights.bold};
  font-family: ${({ theme }) => theme.fonts.cute};
  align-items: center;
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.colors.bordermain};
  cursor: pointer;
  transition: 0.1s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.secondary};
  }
`;