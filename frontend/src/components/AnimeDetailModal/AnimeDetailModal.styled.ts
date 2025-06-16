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
  background: white;
  border-radius: 12px;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`;

export const Content = styled.div`
  padding: 24px;
`;