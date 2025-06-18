import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const Modal = styled.div`
  width: 800px;
  max-height: 90vh;
  background: ${({ theme }) => theme.colors.background};
  overflow-y: auto;
  position: relative;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);

  /* WebKit 기반 브라우저 */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Firefox */
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

export const Content = styled.div``;

export const ReviewBoxGroup = styled.div`
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
`;