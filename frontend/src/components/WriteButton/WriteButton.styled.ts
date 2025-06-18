import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  width: 70px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  background: ${({ theme }) => theme.colors.subcolor};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;