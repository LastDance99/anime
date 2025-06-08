// NavTabBar.styled.ts
import styled from "styled-components";

export const NavTabBarWrapper = styled.nav`
  width: 100%;
  background: #FFB6C1;
  display: flex;
  justify-content: center;
`;

export const TabBox = styled.div`
  width: 100%;
  max-width: 1280px;
  display: flex;
  justify-content: left;
  align-items: center;
  min-height: 40px;
`;

export const Tab = styled.div`
  padding: 0 28px;
  font-size: 14px;
  font-weight: 600;
  color: #222;
  cursor: pointer;
  height: 40px;
  display: flex;
  align-items: center;

  &:hover {
  color: #ff5da2;
  }
`;
