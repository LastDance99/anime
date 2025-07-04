import styled from "styled-components";

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 44px 0;
`;

export const PageButton = styled.button<{ selected: boolean }>`
  border: none;
  background: ${({ selected, theme }) =>
    selected ? theme.colors.bordermain : "none"};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.background : theme.colors.text};
  font-weight: ${({ theme }) => theme.Weights.light};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.12s, color 0.12s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.bordermain};
  }

  &:disabled {
    opacity: 0.45;
    pointer-events: none;
  }
`;