import styled from "styled-components";

export const InputBox = styled.div`
  width: 600px;
  height: auto;
  position: relative;
  border: 1.5px solid ${({ theme }) => theme.colors.bordermain};
  background: ${({ theme }) => theme.colors.background};
  border-radius: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 12px;
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  font-size: ${({ theme }) => theme.fontSizes.md}; // 14px
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  outline: none;
  padding: 10px 58px 10px 12px;
  box-sizing: border-box;
  font-family: ${({ theme }) => theme.fonts.main};

  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
    font-size: ${({ theme }) => theme.fontSizes.md};
    letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  }
`;

export const SubmitButton = styled.button`
  position: absolute;
  bottom: 7px;
  right: 14px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.bordermain};
  font-size: ${({ theme }) => theme.fontSizes.md}; // 14px
  font-weight: ${({ theme }) => theme.Weights.bold};
  cursor: pointer;
  padding: 0;
  opacity: 1;
  transition: color 0.15s, opacity 0.1s;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const SliderRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 2px;
`;