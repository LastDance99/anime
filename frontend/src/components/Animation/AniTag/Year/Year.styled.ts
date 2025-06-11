import styled from "styled-components";

export const YearSection = styled.section`
  width: 180px;
  margin-bottom: 24px;
  border-bottom: 1px solid #f99;
  padding-bottom: 20px;
`;

export const YearTitle = styled.div`
  font-size: 16px;
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

export const YearToggleButton = styled.button`
  margin: 12px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  min-height: 28px;
  &:hover .toggle-line {
    border-color: #fdafd8;
  }
`;

export const ToggleLine = styled.span`
  flex: 1;
  border-bottom: 1.5px solid #f99;
  margin: 0 10px;
  transition: border-color 0.15s;
  height: 0;
`;