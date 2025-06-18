import styled from "styled-components";

// 리스트 전체 감싸는 박스
export const ListWrapper = styled.div`
  width: 100%;
  max-width: 740px;
  border-radius: 14px;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 카드들을 감싸는 컨테이너
export const AniListContainer = styled.div`
  width: 100%;
  max-width: 740px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

// 리스트 개수 표시 텍스트
export const ListCountText = styled.div`
  font-weight: ${({ theme }) => theme.Weights.bold};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: 20px;

  span {
    color: #ff5e85; // 포인트 컬러 테마에 넣을 수 있음 (e.g. theme.colors.highlight)
  }
`;

// 헤더 라인
export const ListHeader = styled.div`
  width: 100%;
  max-width: 740px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.background};
  margin-bottom: 4px;
`;

// 헤더 컬럼 (텍스트 컬러 통일)
export const HeaderCol = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.Weights.medium};
  color: ${({ theme }) => theme.colors.subtext};
`;

// 각 줄
export const AniListRow = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 24px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background: transparent;
  &:last-child {
    border-bottom: none;
  }
`;