import styled from "styled-components";

export const Dropdown = styled.div`
  width: 80px;
  height: 30px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #faaac6;
  background: #ffe2eb;
  &:hover {
    background: #FFB6C1;
  }
`;

export const Select = styled.select`
  appearance: none;
  width: 100%;
  height: 100%;
  margin-right: 10px;
  background: transparent;
  border: none;
  font-size: 12px;
  line-height: 1.5;
  color: #222;
  font-family: 'Cafe24 Ssurround air', sans-serif;
  cursor: pointer;
  outline: none;
  text-align: center;
`;
