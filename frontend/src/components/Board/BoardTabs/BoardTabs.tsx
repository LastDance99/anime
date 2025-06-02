import React, { useState } from "react";
import { TabBar, Tab, LikeIcon } from "./BoardTabs.styled";

const tabs = [
  { label: "전체", value: "all" },
  { label: "게시글", value: "post" },
  { label: "갤러리", value: "gallery" },
  { label: "30추", value: "thirty", icon: <LikeIcon />},
  { label: "10추", value: "ten", icon: <LikeIcon /> }
];

const BoardTabs: React.FC = () => {
  const [selected, setSelected] = useState("all");
  return (
    <TabBar>
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          selected={selected === tab.value}
          onClick={() => setSelected(tab.value)}
        >
          {tab.icon} {tab.label}
        </Tab>
      ))}
    </TabBar>
  );
};

export default BoardTabs;
