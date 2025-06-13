import styled from "styled-components";

// 필터 전체 컨테이너 (좌측 구역)
export const FilterContainer = styled.div`
  width: 100%;
  min-width: 180px;
  max-width: 180px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

// 각 필터 그룹 (장르/계절/상태/연도)
export const FilterGroup = styled.div`
  padding: 0;
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

// 라벨 (장르/계절 등)
export const FilterLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.cafe24};
  font-weight: ${({ theme }) => theme.Weights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

// 검색창
export const FilterSearchBox = styled.div`
  display: flex;
  justify-content: center;
`;