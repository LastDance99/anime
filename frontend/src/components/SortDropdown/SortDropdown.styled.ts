import styled from "styled-components";

export const Dropdown = styled.div`
  width: 80px;
  height: 30px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  background: ${({ theme }) => theme.colors.subcolor};
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

export const Select = styled.select`
  appearance: none;
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  cursor: pointer;
  outline: none;
  text-align: center;
`;