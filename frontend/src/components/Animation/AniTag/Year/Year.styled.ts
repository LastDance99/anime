import styled from "styled-components";

export const YearSection = styled.section`
  width: 180px;
  margin-bottom: 24px;
`;

export const YearTitle = styled.div`
  font-size: 1.08rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

export const YearButtonList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const YearButton = styled.button<{ $selected?: boolean }>`
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