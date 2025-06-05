import { Link } from "react-router-dom";
import {
  HeaderWrapper,
  HeaderInner,
  Logo,
  Nav,
  NavList,
  NavItem
} from "./MainHeader.styled";

export default function Header() {
  return (
    <HeaderWrapper>
      <HeaderInner>
        <Logo src="/logos/sublog.png" alt="AnTada 로고" />
        <Nav>
          <NavList>
            <NavItem as={Link} to='/profile'>프로필</NavItem>
            <NavItem as={Link} to='/mainpage'>전체 게시판</NavItem>
            <NavItem as={Link} to='/mainpage'>애니</NavItem>
          </NavList>
        </Nav>
      </HeaderInner>
    </HeaderWrapper>
  );
}