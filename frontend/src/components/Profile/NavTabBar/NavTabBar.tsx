import React from "react";
import { Link } from "react-router-dom";
import { NavTabBarWrapper, Tab, TabBox } from "./NavTabBar.styled";

export default function NavTabBar() {
  return (
    <NavTabBarWrapper>
      <TabBox>
        <Tab as={Link} to='/profile/:nickname'>개요</Tab>
        <Tab as={Link} to='/profile/:nickname/myboard'>게시글</Tab>
        <Tab as={Link} to='/profile/:nickname/mygallery'>갤러리</Tab>
        <Tab as={Link} to='/profile/:nickname/myanilist'>애니리스트</Tab>
      </TabBox>
    </NavTabBarWrapper>
  );
}