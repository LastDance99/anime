import styled from "styled-components";
import React from "react";

export const StyledAniListFlex   = styled.main`
  display: flex;
  flex-wrap: wrap;
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

export const AniListFlex = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'main'>>(
  function AniListFlex(props, ref) {
    return <StyledAniListFlex ref={ref} {...props} />;
  }
);