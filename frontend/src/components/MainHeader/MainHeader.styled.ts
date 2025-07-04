import styled from "styled-components";

// 헤더 전체 래퍼
export const HeaderWrapper = styled.header<{ $show?: boolean }>`
  width: 100vw;
  min-width: 360px;
  height: 60px;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  transition: transform 0.35s cubic-bezier(.47,1.64,.41,.8);
  transform: ${({ $show }) => ($show === false ? "translateY(-100%)" : "translateY(0)")};
`;

// 내부 컨테이너
export const HeaderInner = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// 로고
export const Logo = styled.img`
  height: 50px;
`;

// 네비게이션
export const Nav = styled.nav`
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

export const NavList = styled.ul`
  display: flex;
  gap: 40px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const NavItem = styled.li`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.cafe24};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.subtext};
  }
`;