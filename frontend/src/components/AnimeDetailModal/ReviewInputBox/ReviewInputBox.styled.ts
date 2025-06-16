import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
`;

export const StarBox = styled.div`
  display: flex;
  gap: 2px;
  padding-top: 7px;
`;

export const Star = styled.span<{ $active?: boolean }>`
  font-size: 1.5rem;
  color: ${({ $active }) => ($active ? "#FFD36B" : "#ddd")};
  cursor: pointer;
  transition: color 0.18s;
  user-select: none;
`;

export const InputArea = styled.textarea`
  flex: 1;
  min-height: 38px;
  max-height: 70px;
  font-size: 1.02rem;
  background: #fff;
  border: 1px solid #f3cfe3;
  border-radius: 10px;
  padding: 10px 13px;
  resize: none;
  outline: none;
  color: #333;
  font-family: inherit;
`;

export const SubmitBtn = styled.button`
  background: #ed7cb8;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 9px 18px;
  font-size: 1rem;
  margin-left: 6px;
  cursor: pointer;
  transition: background 0.18s;
  &:disabled {
    background: #f3d0e6;
    color: #d8aacd;
    cursor: not-allowed;
  }
`;