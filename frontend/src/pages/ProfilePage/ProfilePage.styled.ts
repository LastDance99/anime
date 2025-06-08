import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column; // 세로 방향 정렬
  align-items: center;    /* 수직 중앙정렬 */
  justify-content: center; /* 수평 중앙정렬 */
  background: #FCEEF5;
`;

export const MainBox = styled.div`
  width: 1280px;
  display: flex;
  flex-direction: row;
  gap: 12px;
`;