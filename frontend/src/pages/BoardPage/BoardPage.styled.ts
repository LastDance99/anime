import styled from "styled-components";

export const Section = styled.div`
  width: 100%;
  height: 100%;
  // background: #FCEEF5;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  min-width: 360px;  /* 모바일 대응 */
  // aspect-ratio: 16 / 9;
  margin: 0 auto;
  display: flex;
  align-items: center;    /* 수직 중앙정렬 */
  justify-content: center; /* 수평 중앙정렬 */
  padding-top: 80px;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  width: 100%;
`;

export const BoardSectionBox = styled.div`
  width: 930px;
  // max-height: 920px;
  background: #fff;
  border: 1px solid #FFB6C1;
`;

export const BoardHeader = styled.header`
  width: 100%;
  height: 50px;
  padding: 10px 20px;
  border-bottom: 1px solid #FFB6C1;
  margin-bottom: 40px;
  font-size: 20px;
  font-weight: 500;
  font-family: 'UhBee Se_hyun', sans-serif;
`;

export const BoardSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

export const TabSortWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SortWrite = styled.div`
  display: flex;
`;

export const SidebarSection = styled.aside`
  width: 340px;
  max-height: 920px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const PageSearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
`;
