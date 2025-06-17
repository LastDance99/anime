import React from "react";
import AccountSettings from "../../components/Settings/AccountSettings/AccountSettings";
import ImageSettings from "../../components/Settings/ImageSettings/ImageSettings";
import {
  Wrapper,
  Title,
  Divider,
  BottomBar,
  ActionButton,
} from "./SettingsPage.styled";
import type { User } from "../../types/user";

type SettingsPageProps = {
  user: User;
  setUser: (user: User) => void;
  tempUser: User;
  setTempUser: (user: User) => void;
  setSubModalOpen: (open: boolean) => void;
  onSave: () => void;
  onClose: () => void;
};

export default function SettingsPage({
  user,
  setUser,
  tempUser,
  setTempUser,
  setSubModalOpen,
  onSave,
  onClose,
}: SettingsPageProps) {
  const hasChanges = JSON.stringify(user) !== JSON.stringify(tempUser);

  const handleTryClose = () => {
    if (hasChanges) {
      const confirmed = window.confirm("저장하지 않은 변경사항이 있습니다. 닫으시겠습니까?");
      if (!confirmed) return;
    }
    onClose();
  };

  return (
    <Wrapper onClick={(e) => e.stopPropagation()}>
      <Title>설정</Title>
      <AccountSettings
        user={tempUser}
        setUser={setTempUser}
        setSubModalOpen={setSubModalOpen}
        onClose={handleTryClose}
      />
      <Divider />
      <ImageSettings user={tempUser} setUser={setTempUser} />
      <BottomBar>
        <ActionButton onClick={onSave}>저장</ActionButton>
        <ActionButton onClick={onClose}>닫기</ActionButton>
      </BottomBar>
    </Wrapper>
  );
}