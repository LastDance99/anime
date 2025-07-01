import styled from "styled-components";

export const ModalWrap = styled.div`
  width: 480px;
  margin: 32px auto 0 auto;
  background: ${({ theme }) => theme.colors.background};
  border: 1.5px solid ${({ theme }) => theme.colors.bordermain};
  border-radius: 18px;
  box-shadow: 0 3px 16px rgba(255, 182, 193, 0.07);
  padding: 28px 28px 22px 28px;
  font-family: ${({ theme }) => theme.fonts.cafe24};
  position: fixed;
  left: 50%;
  top: 12%;
  transform: translate(-50%, 0);
  z-index: 999;
  transition: box-shadow 0.15s;

  ${({ theme }) => theme.media.mobile} {
    width: 98vw;
    min-width: 0;
    padding: 14px 5px 16px 5px;
    margin: 12px auto 0 auto;
  }
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 18px;
  right: 22px;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.subtext};
  font-size: 1.2rem;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.cafe24};
`;

export const Title = styled.h3`
  margin: 0 0 14px 0;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-family: ${({ theme }) => theme.fonts.cafe24};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.Weights.bold};
`;

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;