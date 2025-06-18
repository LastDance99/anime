import styled from "styled-components";
import { Settings } from "lucide-react";

export const HeaderWrapper = styled.header<{ $show?: boolean }>`
  width: 100vw;
  min-width: 360px;
  height: 60px;
  background: ${({ theme }) => theme.colors.primary}4D; // 투명도 추가
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  transition: transform 0.35s cubic-bezier(.47,1.64,.41,.8);
  transform: ${({ $show }) => ($show === false ? "translateY(-100%)" : "translateY(0)")};
`;

export const HeaderInner = styled.div`
  width: 1280px;
  height: 100px;
  display: flex;
  align-items: center;
`;

export const Logo = styled.img`
  height: 50px;
  margin: 0 12px;
`;

export const Nav = styled.nav`
  height: 100px;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

export const NavList = styled.ul`
  display: flex;
  gap: 40px;
  list-style: none;
`;

export const NavItem = styled.li`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.cafe24};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.bordermain};
  }
`;

export const Iconbox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  transition: background 0.15s;
  margin-right: 10px;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;

export const BottomBtn = styled.button`
  width: 60px;
  height: 30px;
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;

export const GearIcon = styled(Settings)`
  color: ${({ theme }) => theme.colors.text};
`;