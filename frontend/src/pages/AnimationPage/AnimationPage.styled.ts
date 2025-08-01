import styled from "styled-components";

export const Section = styled.div`
  width: 100%;
  height: 100%;
  // background: #FCEEF5;

  ${({ theme }) => theme.media.qhd} {
    padding-top: 180px;
  }

  ${({ theme }) => theme.media.fhd} {
    padding-top: 80px;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  min-width: 360px;  /* 모바일 대응 */
  max-height: 970px;
  // aspect-ratio: 16 / 9;
  margin: 0 auto;
  display: flex;
  align-items: center;    /* 수직 중앙정렬 */
  justify-content: center; /* 수평 중앙정렬 */
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  width: 100%;
`;

export const AnimeSectionBox = styled.div`
  width: 930px;
  // max-height: 100%;
  background: #fff;
  border: 1px solid #FFB6C1;
`;

export const AnimeHeader = styled.header`
  width: 100%;
  height: 50px;
  padding: 10px 20px;
  border-bottom: 1px solid #FFB6C1;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 500;
  font-family: 'UhBee Se_hyun', sans-serif;
`;

export const AnimeListBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

export const SidebarSection = styled.aside`
  width: 340px;
  max-height: 920px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;