import styled from "styled-components";

// 전체 페이지 래퍼
export const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px 0 20px 0;
`;

// 메인 콘텐츠 영역 (필터 + 리스트)
export const MainLayout = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 1280px;
  align-items: flex-start;
  margin-top: 40px;
  /* 모바일 대응 */
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
`;