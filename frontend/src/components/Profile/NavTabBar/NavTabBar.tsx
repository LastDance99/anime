import React from "react";
import { Link } from "react-router-dom";
import { NavTabBarWrapper, Tab, TabBox } from "./NavTabBar.styled";

type NavTabBarProps = {
  user: {
    id: number;
  };
};

export default function NavTabBar({ user }: NavTabBarProps) {
  return (
    <NavTabBarWrapper>
      <TabBox>
        <Tab as={Link} to={`/profile/${user.id}`}>개요</Tab>
        <Tab as={Link} to={`/profile/${user.id}/myboard`}>게시글</Tab>
        <Tab as={Link} to={`/profile/${user.id}/mygallery`}>갤러리</Tab>
        <Tab as={Link} to={`/profile/${user.id}/myanilist`}>애니리스트</Tab>
      </TabBox>
    </NavTabBarWrapper>
  );
}