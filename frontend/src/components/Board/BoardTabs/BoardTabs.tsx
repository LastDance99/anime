import React from "react";
import { TabBar, Tab, LikeIcon } from "./BoardTabs.styled";
import { useTranslation } from "react-i18next";

type TabType = "all" | "post" | "gallery" | "thirty" | "ten";

const BoardTabs: React.FC<{
  selected: TabType;
  onChange: (value: TabType) => void;
}> = ({ selected, onChange }) => {
  const { t } = useTranslation();

  const tabs = [
    { label: t("tabs.all"), value: "all" },
    { label: t("tabs.post"), value: "post" },
    { label: t("tabs.gallery"), value: "gallery" },
    { label: t("tabs.thirty"), value: "thirty", icon: <LikeIcon /> },
    { label: t("tabs.ten"), value: "ten", icon: <LikeIcon /> }
  ];

  return (
    <TabBar>
      {tabs.map((tab) => (
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
};

export default BoardTabs;