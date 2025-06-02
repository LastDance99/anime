import styled from "styled-components";

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 44px 0;
`;

export const PageButton = styled.button<{ selected: boolean }>`
  border: none;
  background: ${({ selected }) => (selected ? "#FFB6C1" : "none")};
  color: ${({ selected }) => (selected ? "#fff" : "#222")};
  font-weight: 300;
  font-family: 'Cafe24 Ssurround air', sans-serif;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 16px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.12s, color 0.12s;
  &:hover {
    background: #ffe2eb;
    color: #e84d7a;
  }
  &:disabled {
    opacity: 0.45;
    pointer-events: none;
  }
`;
