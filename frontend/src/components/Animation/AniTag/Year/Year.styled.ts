import styled from "styled-components";

export const YearSection = styled.section`
  width: 100%;
  margin-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.bordermain};
  padding-bottom: 20px;
`;

export const YearTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base}; // 16px
  font-weight: ${({ theme }) => theme.Weights.bold};
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.text};
`;

export const YearButtonList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const YearButton = styled.button<{ $selected?: boolean }>`
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

export const YearToggleButton = styled.button`
  margin: 12px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  min-height: 28px;

  &:hover .toggle-line {
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const ToggleLine = styled.span`
  flex: 1;
  border-bottom: 1.5px solid ${({ theme }) => theme.colors.bordermain};
  margin: 0 10px;
  transition: border-color 0.15s;
  height: 0;
`;