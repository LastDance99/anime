import styled from "styled-components";

export const FilterSidebarContainer = styled.div`
  width: 100%;
  max-width: 240px;
  padding: 20px;
  overflow-y: auto; /* 세로 스크롤 */
  /* 스크롤바 숨기기 (크로스 브라우저) */
  scrollbar-width: none;       /* Firefox */
  -ms-overflow-style: none;    /* IE, Edge */
  &::-webkit-scrollbar {
    display: none;             /* Chrome, Safari, Opera */
  }

  ${({ theme }) => theme.media.qhd} {
    max-height: 1100px
  }

  ${({ theme }) => theme.media.fhd} {
    max-height: 900px
  }
`;