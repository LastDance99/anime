import React from "react";
import { TabBar, Tab, LikeIcon } from "./BoardTabs.styled";

type TabType = "all" | "post" | "gallery" | "thirty" | "ten";

const tabs = [
  { label: "전체", value: "all" },
  { label: "게시글", value: "post" },
  { label: "갤러리", value: "gallery" },
  { label: "30추", value: "thirty", icon: <LikeIcon /> },
  { label: "10추", value: "ten", icon: <LikeIcon /> }
];

type Props = {
  selected: TabType;
  onChange: (value: TabType) => void;
};

const BoardTabs: React.FC<Props> = ({ selected, onChange }) => (
  <TabBar>
    {tabs.map(tab => (
      <Tab
        key={tab.value}
        selected={selected === tab.value}
        onClick={() => onChange(tab.value as TabType)}
      >
        {tab.icon} {tab.label}
      </Tab>
    ))}
  </TabBar>
);

export default BoardTabs;