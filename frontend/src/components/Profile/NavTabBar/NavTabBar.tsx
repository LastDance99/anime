import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavTabBarWrapper, Tab, TabBox } from "./NavTabBar.styled";

type NavTabBarProps = {
  user: {
    id: number;
  };
};

export default function NavTabBar({ user }: NavTabBarProps) {
  const { t } = useTranslation();

  return (
    <NavTabBarWrapper>
      <TabBox>
        <Tab as={Link} to={`/profile/${user.id}`}>
          {t("profile.tab.overview")}
        </Tab>
        <Tab as={Link} to={`/profile/${user.id}/myboard`}>
          {t("profile.tab.posts")}
        </Tab>
        <Tab as={Link} to={`/profile/${user.id}/mygallery`}>
          {t("profile.tab.gallery")}
        </Tab>
        <Tab as={Link} to={`/profile/${user.id}/myanilist`}>
          {t("profile.tab.anime_list")}
        </Tab>
      </TabBox>
    </NavTabBarWrapper>
  );
}