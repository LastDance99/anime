import styled from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  border-radius: 5px;
  width: 100%;
  max-width: 200px;
  height: 26px;
  position: relative;
  padding: 0 8px;
  box-sizing: border-box;
  margin-left: 160px;
`;

export const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.xxs}; // 9px
  color: ${({ theme }) => theme.colors.text};
  height: 100%;
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
`;

export const SearchBtn = styled.button`
  width: 14px;
  height: 14px;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
  cursor: pointer;
  transition: background 0.13s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }

  svg {
    display: block;
  }
`;