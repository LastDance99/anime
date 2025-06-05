import styled from "styled-components"

export const Button = styled.button`
  display: flex;
  width: 70px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border: 1px solid #faaac6;
  background: #ffe2eb;
  color: #222;
  font-family: 'Cafe24Ssurround air', sans-serif;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #FFB6C1;
  }
`;