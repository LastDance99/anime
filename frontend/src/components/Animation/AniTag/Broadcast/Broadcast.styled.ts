import styled from "styled-components";

export const BroadcastSection = styled.section`
  width: 180px;
  margin-bottom: 24px;
`;

export const BroadcastTitle = styled.div`
  font-size: 1.08rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const BroadcastButtonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BroadcastButton = styled.button<{ $selected?: boolean }>`
  border: ${({ $selected }) => $selected ? "2px solid #f99" : "1px solid #f99"};
  background: ${({ $selected }) => $selected ? "#ffe4ec" : "white"};
  border-radius: 18px;
  width: 86px;
  min-height: 16px;
  font-size: 20px;
  font-weight: 700;
  font-family: 'UhBee mysen', sans-serif;
  align-items: center;
  display: flex;
  justify-content: center;
  color: #d75a85;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    background: #ffe4ec;
    border: 2px solid #fdafd8;
  }
`;