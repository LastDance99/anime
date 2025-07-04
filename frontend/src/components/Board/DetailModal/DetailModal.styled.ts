import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBox = styled.div`
  width: 90%;
  height: 90%;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Header = styled.div`
  height: 48px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.subcolor};
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.subtext};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

export const Left = styled.div`
  flex: 3;
  padding: 24px;
  overflow-y: auto;
  border-right: 1px solid ${({ theme }) => theme.colors.subcolor};
`;

export const Right = styled.div`
  flex: 2;
  padding: 24px;
  overflow-y: auto;
`;