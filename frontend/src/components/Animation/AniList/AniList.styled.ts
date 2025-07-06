import styled from "styled-components";

export const AniListWrapper = styled.div`
  max-width: 680px; // 화면에서 적당한 너비
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  ${({ theme }) => theme.media.qhd} {
    max-height: 1100px
  }

  ${({ theme }) => theme.media.fhd} {
    max-height: 900px
  }
`;