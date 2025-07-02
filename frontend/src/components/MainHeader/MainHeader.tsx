import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";

import {
  HeaderWrapper,
  HeaderInner,
  Logo,
  Nav,
  NavList,
  NavItem
} from "./MainHeader.styled";

export default function Header({ show = true }) {
  const { currentUser } = useAuth();
  const { t } = useTranslation();

  return (
    <HeaderWrapper $show={show}>
      <HeaderInner>
        <Logo src="/logos/sublog.png" alt="AnTada 로고" />
        <Nav>
          <NavList>
            {currentUser && (
              <NavItem as={Link} to={`/profile/${currentUser.id}`}>
                {t("header.profile")}
              </NavItem>
            )}
            <NavItem as={Link} to="/board">
              {t("header.board")}
            </NavItem>
            <NavItem as={Link} to="/anime">
              {t("header.anime")}
            </NavItem>
          </NavList>
        </Nav>
      </HeaderInner>
    </HeaderWrapper>
  );
}