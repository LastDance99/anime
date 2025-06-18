import styled from "styled-components";

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  padding: 6px 10px;
  margin-left: 12px;
  border-radius: 6px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.main};
  cursor: pointer;
  transition: background-color 0.15s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;