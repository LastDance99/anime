import React, { useState } from "react";
import {
  Section,
  SubTitle,
  Row,
  Label,
  Text,
  LangSelect,
} from "./AccountSettings.styled";
import ChangeButton from "../ChangeButton/ChangeButton";
import type { TempUser } from "../../../types/user";
import NicknameModal from "../NicknameModal";
import PasswordModal from "../PasswordModal";
import { useTranslation } from "react-i18next";

type Props = {
  user: TempUser;
  setUser: (user: TempUser) => void;
  setSubModalOpen: (open: boolean) => void;
  onClose: () => void;
  onChangeNickname: () => void;
};

export default function AccountSettings({
  user,
  setUser,
  setSubModalOpen,
  onClose,
  onChangeNickname,
}: Props) {
  const { t } = useTranslation();
  const [nicknameModalOpen, setNicknameModalOpen] = useState(false);
  const [pwModalOpen, setPwModalOpen] = useState(false);

  const openNicknameModal = () => {
    setNicknameModalOpen(true);
    setSubModalOpen(true);
  };

  const closeNicknameModal = () => {
    setNicknameModalOpen(false);
    setSubModalOpen(false);
  };

  const openPwModal = () => {
    setPwModalOpen(true);
    setSubModalOpen(true);
  };

  const closePwModal = () => {
    setPwModalOpen(false);
    setSubModalOpen(false);
  };

  const handlePasswordSave = (newPassword: string) => {
    setUser({ ...user, password: newPassword });
    closePwModal();
  };

  return (
    <Section>
      <SubTitle>{t("account.title")}</SubTitle>

      <Row>
        <Label>{t("account.email")}</Label>
        <Text>{user.email}</Text>
      </Row>

      <Row>
        <Label>{t("account.password")}</Label>
        <Text>********</Text>
        <ChangeButton label={t("account.change_password")} onClick={openPwModal} />
        {pwModalOpen && (
          <PasswordModal
            // currentPassword={user.password}
            onSave={handlePasswordSave}
            onClose={closePwModal}
          />
        )}
      </Row>

      <Row>
        <Label>{t("account.nickname")}</Label>
        <Text>{user.nickname}</Text>
        <ChangeButton label={t("account.change_nickname")} onClick={openNicknameModal} />
        {nicknameModalOpen && (
          <NicknameModal
            currentNickname={user.nickname}
            onSave={(newNick) => {
              setUser({ ...user, nickname: newNick });
              closeNicknameModal();
            }}
            onClose={closeNicknameModal}
          />
        )}
      </Row>

      <Row>
        <Label>{t("account.language")}</Label>
        <LangSelect
          value={user.language}
          onChange={(e) =>
            setUser({ ...user, language: e.target.value as "ko" | "en" | "es" })
          }
        >
          <option value="ko">{t("language.ko")}</option>
          <option value="en">{t("language.en")}</option>
          <option value="es">{t("language.es")}</option>
        </LangSelect>
      </Row>
    </Section>
  );
}