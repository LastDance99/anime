import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;    /* 수직 중앙정렬 */
  justify-content: center; /* 수평 중앙정렬 */
`;

export const MainBox = styled.div`
  width: 1280px;
  height: 715px;
  display: flex;
  margin-top: 40px;
  flex-direction: row;
  gap: 12px;
  overflow: hidden;
`;