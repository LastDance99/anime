import styled from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #faaac6;
  border-radius: 5px;
  width: 100%;
  max-width: 200px; /* 원하는 크기로 */
  height: 26px;     /* 높이 원하는대로 조절 */
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
  font-size: 10px;
  color: #222;
  height: 100%;
  font-family: 'Cafe24 Ssurround air', sans-serif;
`;

export const SearchBtn = styled.button`
  width: 14px;
  height: 14px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
  cursor: pointer;
  transition: background 0.13s;
  &:hover {
    background: #ffe2eb;
  }
  svg {
    display: block;
  }
`;
