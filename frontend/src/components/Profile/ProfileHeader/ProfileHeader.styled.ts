import styled from "styled-components";
import { Settings } from "lucide-react";

// 헤더 전체 래퍼
export const HeaderWrapper = styled.header<{ $show?: boolean }>`
  width: 100vw; // 전체 뷰포트 기준
  min-width: 360px;
  height: 60px;
  // background: transparent;   // 투명
  background: rgba(252, 238, 245, 0.3);
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

// 내부 컨테이너 (가운데 영역)
export const HeaderInner = styled.div`
  width: 1280px;
  height: 100px;
  display: flex;
  align-items: center;
`;

// 로고
export const Logo = styled.img`
  height: 50px;
  margin:0px 12px;
`;

// 네비게이션
export const Nav = styled.nav`
  height: 100px;
  display: flex;
  align-items: center;
  margin: 0 auto; // 오른쪽으로 밀기
`;

export const NavList = styled.ul`
  display: flex;
  gap: 40px;
  list-style: none;
`;

export const NavItem = styled.li`
  font-size: 14px;
  font-family: 'Cafe24Ssurround', sans-serif;
  color: #222;  // 흰색 텍스트
  cursor: pointer;
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
    background: #fff;
  }
`;

export const BottomBtn = styled.button`
  width: 60px;
  height: 30px;
  background: none;
  border: none;
  font-size: 14px;
  font-family: 'Cafe24SsurroundAir', sans-serif;
  color: #222;
  cursor: pointer;
  &:hover {
    background: #fff;
  }
`;

export const GearIcon = styled(Settings)`
  color: #222;
`;