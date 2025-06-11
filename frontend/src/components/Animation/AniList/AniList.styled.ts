import styled from "styled-components";

export const AniListWrapper = styled.div`
  max-width: 680px; // 화면에서 적당한 너비
  width: 100%;
  height: 100%;
  max-height: 800px; // 최대 높이 설정
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const AniListFlex = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  align-content: flex-start;
  gap: 10px;

  overflow-y: auto;       // 세로 스크롤 활성화

  /* 크롬/엣지/사파리용 스크롤바 숨김 */
  &::-webkit-scrollbar {
    display: none;
  }
  /* 파이어폭스용 스크롤바 숨김 */
  scrollbar-width: none;
`;