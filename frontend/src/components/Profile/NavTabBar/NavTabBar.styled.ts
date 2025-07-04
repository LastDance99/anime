import styled from "styled-components";

export const NavTabBarWrapper = styled.nav`
  width: 100%;
  background: ${({ theme }) => theme.colors.bordermain};
  display: flex;
  justify-content: center;
`;

export const TabBox = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 40px;
`;

export const Tab = styled.div`
  padding: 0 28px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.Weights.bold};
  font-family: ${({ theme }) => theme.fonts.cafe24};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  height: 40px;
  display: flex;
  align-items: center;
  transition: color 0.2s;

  &:hover {
    color: #fff;
  }
`;