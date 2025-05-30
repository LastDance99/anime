import styled from "styled-components";

// 헤더 전체 래퍼
export const HeaderWrapper = styled.header`
  width: 100%;
  height: 100px;
  background: transparent;   // 투명!
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute; // 필요시 (배경 위에 띄우려면)
  top: 0;
  left: 0;
  z-index: 10;
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
  height: 80px;
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

