import React from "react";
import { NavTabBarWrapper, Tab, TabBox } from "./NavTabBar.styled";

export default function NavTabBar() {
  return (
    <NavTabBarWrapper>
      <TabBox>
        <Tab>개요</Tab>
        <Tab>게시글</Tab>
        <Tab>갤러리</Tab>
        <Tab>애니리스트</Tab>
      </TabBox>
    </NavTabBarWrapper>
  );
}