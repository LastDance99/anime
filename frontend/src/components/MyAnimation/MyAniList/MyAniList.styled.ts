import styled from "styled-components";


// 리스트 전체 감싸는 박스 (배경색 삭제)
export const ListWrapper = styled.div`
  width: 100%;
  max-width: 740px;
  border-radius: 14px;
  background: transparent;  // 배경색 제거
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 카드들을 감싸는 컨테이너 (리스트)
export const AniListContainer = styled.div`
  width: 100%;
  max-width: 740px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ListCountText = styled.div`
  font-weight: 700;
  font-size: 1.08rem;
  margin-bottom: 20px;
  span {
    color: #ff5e85;
  }
`;

// 헤더 라인 (폰트, align, 크기)
export const ListHeader = styled.div`
  width: 100%;
  max-width: 740px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #fff;
  margin-bottom: 4px;
`;

// 컬럼 (폰트 크기 통일)
export const HeaderCol = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.subtext};
`;

// 카드 한 줄 스타일 (헤더와 컬럼 정렬 통일)
export const AniListRow = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 24px;
  font-size: 12px;
  background: transparent;
  &:last-child {
    border-bottom: none;
  }
`;