import styled from "styled-components";

export const InputBox = styled.div`
  width: 600px;
  height: auto;
  position: relative;
  border: 1.5px solid #F8A0BC;
  background: #fff;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 12px 10px 12px;
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  font-size: 15px;
  color: #555;
  background: transparent;
  outline: none;
  padding: 10px 58px 10px 12px;
  box-sizing: border-box;
  font-family: inherit;

  &::placeholder {
    color: #d3b7c3;
    font-size: 15px;
    letter-spacing: 0.01em;
  }
`;

export const SubmitButton = styled.button`
  position: absolute;
  bottom: 7px;
  right: 14px;
  background: none;
  border: none;
  color: #F8A0BC;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
  opacity: 1;
  transition: color 0.15s, opacity 0.1s;
  &:hover:not(:disabled) {
    color: #e05a8b;
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