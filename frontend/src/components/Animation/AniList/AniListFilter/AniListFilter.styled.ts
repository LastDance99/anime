import styled from "styled-components";

// 바깥 컨테이너
export const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 32px;
`;

// 총 작품수 텍스트
export const TotalText = styled.div`
  font-size: 1.01rem;
  font-weight: 600;
  color: #222;
  b {
    font-weight: 700;
    font-size: 1.04em;
  }
`;

// 오른쪽 정렬 드롭다운 버튼
export const SortBox = styled.button`
position: relative;
  display: flex;
  align-items: center;
  background: none;
  border: none;
  font-size: 1rem;
  color: #aaa;
  cursor: pointer;
  font-weight: 500;
  transition: color 0.14s;
  &:hover {
    color: #d75a85;
  }
`;

// 정렬 라벨
export const SortLabel = styled.span`
  margin-right: 4px;
`;

// 아이콘
export const SortIcon = styled.span`
  display: flex;
  align-items: center;
`;

export const SortDropdown = styled.ul`
  position: absolute;
  right: 0;
  top: 28px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 3px 18px rgba(0,0,0,0.09);
  padding: 5px 0;
  z-index: 10;
  min-width: 90px;
`;

export const SortOption = styled.li`
  padding: 7px 16px;
  font-size: 1rem;
  color: #222;
  cursor: pointer;
  &:hover {
    background: #fff0f5;
    color: #d75a85;
  }
`;