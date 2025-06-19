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
      <SubTitle>계정</SubTitle>

      <Row>
        <Label>이메일</Label>
        <Text>{user.email}</Text>
      </Row>

      <Row>
        <Label>비밀번호</Label>
        <Text>********</Text>
        <ChangeButton label="비밀번호 변경" onClick={openPwModal} />
        {pwModalOpen && (
          <PasswordModal
            currentPassword={user.password}
            onSave={handlePasswordSave}
            onClose={closePwModal}
          />
        )}
      </Row>

      <Row>
        <Label>닉네임</Label>
        <Text>{user.nickname}</Text>
        <ChangeButton label="닉네임 변경" onClick={openNicknameModal} />
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
        <Label>언어</Label>
        <LangSelect
          value={user.language}
          onChange={(e) =>
            setUser({ ...user, language: e.target.value as "ko" | "en" })
          }
        >
          <option value="ko">한국어</option>
          <option value="en">English</option>
        </LangSelect>
      </Row>
    </Section>
  );
}