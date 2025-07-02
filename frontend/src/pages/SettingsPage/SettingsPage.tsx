import React from "react";
import { useTranslation } from "react-i18next";
import AccountSettings from "../../components/Settings/AccountSettings/AccountSettings";
import ImageSettings from "../../components/Settings/ImageSettings/ImageSettings";
import {
  Wrapper,
  Title,
  Divider,
  BottomBar,
  ActionButton,
} from "./SettingsPage.styled";
import type { User, TempUser } from "../../types/user";

type SettingsPageProps = {
  user: User;
  setUser: (user: User) => void;
  tempUser: TempUser;
  setTempUser: (user: TempUser) => void;
  setSubModalOpen: (open: boolean) => void;
  onSave: () => void;
  onClose: () => void;
  onChangeNickname: () => void;
  setProfileFile: (file: File | null) => void;
  setBgFile: (file: File | null) => void;
  setRoomFile: (file: File | null) => void;
};

export default function SettingsPage({
  user,
  setUser,
  tempUser,
  setTempUser,
  setSubModalOpen,
  onSave,
  onClose,
  onChangeNickname,
  setProfileFile,
  setBgFile,
  setRoomFile,
}: SettingsPageProps) {
  const { t } = useTranslation();
  const hasChanges = JSON.stringify(user) !== JSON.stringify(tempUser);

  const handleTryClose = () => {
    if (hasChanges) {
      const confirmed = window.confirm(t("settings.unsavedConfirm"));
      if (!confirmed) return;
    }
    onClose();
  };

  return (
    <Wrapper onClick={(e) => e.stopPropagation()}>
      <Title>{t("settings.title")}</Title>
      <AccountSettings
        user={tempUser}
        setUser={setTempUser}
        setSubModalOpen={setSubModalOpen}
        onClose={handleTryClose}
        onChangeNickname={onChangeNickname}
      />
      <Divider />
      <ImageSettings
        user={tempUser}
        setUser={setTempUser}
        setProfileFile={setProfileFile}
        setBgFile={setBgFile}
        setRoomFile={setRoomFile}
      />
      <BottomBar>
        <ActionButton onClick={onSave}>{t("common.save")}</ActionButton>
        <ActionButton onClick={handleTryClose}>{t("common.close")}</ActionButton>
      </BottomBar>
    </Wrapper>
  );
}