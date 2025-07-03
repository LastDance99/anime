import React, { useEffect, useState, useRef  } from "react";
import styled from "styled-components";
import SettingsPage from "../../pages/SettingsPage/SettingsPage";
import type { User } from "../../types/user";
import {
  getUserSettings,
  updateAccount,
  updateLanguage,
  updateImage,
} from "../../api/settings";
import { checkNickname } from "../../api/auth";
import NicknameModal from "./NicknameModal";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

type TempUser = Omit<User, "profile_image" | "background_image" | "myroom_image"> & {
  profile_image: string | File | null;
  background_image: string | File | null;
  myroom_image: string | File | null;
};

const convertUserToTempUser = (user: User): TempUser => ({
  ...user,
  profile_image: user.profile_image ?? null,
  background_image: user.background_image ?? null,
  myroom_image: user.myroom_image ?? null,
});

type SettingsModalProps = {
  user: User;
  setUser: (user: User) => void;
  onClose: () => void;
  onSaved?: (updatedUser: User) => void;
};

export default function SettingsModal({
  user,
  setUser,
  onClose,
  onSaved,
}: SettingsModalProps) {
  const { t } = useTranslation();

  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [isNicknameModalOpen, setNicknameModalOpen] = useState(false);
  const [tempUser, setTempUser] = useState<TempUser>(convertUserToTempUser(user));
  const [justSaved, setJustSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [bgFile, setBgFile] = useState<File | null>(null);
  const [roomFile, setRoomFile] = useState<File | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const changed =
      user.nickname !== tempUser.nickname ||
      user.language !== tempUser.language ||
      profileFile !== null ||
      bgFile !== null ||
      roomFile !== null;
    setHasChanges(changed);
  }, [user, tempUser, profileFile, bgFile, roomFile]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getUserSettings();
        setTempUser(convertUserToTempUser(data));
      } catch (err) {
        console.error(t("settings.loadError"), err);
      } finally {
        setLoading(false);
      }
    })();
  }, [t]);

  const handleSave = async () => {
    const confirmed = window.confirm(t("settings.confirmSave"));
    if (!confirmed) return;

    try {
      if (user.nickname !== tempUser.nickname) {
        await updateAccount({ nickname: tempUser.nickname });
      }

      if (
        user.language !== tempUser.language &&
        ["ko", "en", "es"].includes(tempUser.language ?? "")
      ) {
        await updateLanguage({
          language: tempUser.language as "ko" | "en" | "es",
        });
        i18n.changeLanguage(tempUser.language as "ko" | "en" | "es");
      }

      const formData = new FormData();
      if (profileFile) formData.append("profile_image", profileFile);
      if (bgFile) formData.append("background_image", bgFile);
      if (roomFile) formData.append("myroom_image", roomFile);

      if (
        formData.has("profile_image") ||
        formData.has("background_image") ||
        formData.has("myroom_image")
      ) {
        await updateImage(formData);
      }

      setUser(tempUser as User); // 현재 상태 반영
      if (onSaved) onSaved(tempUser as User); // ✅ 변경된 부분: 상위 Layout에게 전달
      setJustSaved(true);
      onClose();
    } catch (err: any) {
      console.error(t("settings.saveError"), err);
      if (err.response) {
        alert(err.response.data.detail || JSON.stringify(err.response.data));
      } else if (err.request) {
        alert(t("settings.noResponse"));
      } else {
        alert(t("settings.unknownError"));
      }
    }
  };

  const hasChangesRef = useRef(hasChanges);
  useEffect(() => {
    hasChangesRef.current = hasChanges;
  }, [hasChanges]);

  const justSavedRef = useRef(justSaved);
  useEffect(() => {
    justSavedRef.current = justSaved;
  }, [justSaved]);

  const handleTryClose = () => {
    // 항상 최신 값을 사용!
    if (hasChangesRef.current && !justSavedRef.current) {
      const confirmed = window.confirm(t("settings.unsavedChanges"));
      if (!confirmed) return;
    }
    onClose();
  };

  const handleNicknameChange = async (newNickname: string) => {
    if (newNickname === user.nickname) return;
    try {
      await checkNickname(newNickname);
      setTempUser((prev) => ({ ...prev, nickname: newNickname }));
      setNicknameModalOpen(false);
    } catch (err: any) {
      const msg =
        err.response?.data?.nickname?.[0] ||
        err.response?.data?.detail ||
        t("settings.nicknameCheckFail");
      alert(msg);
    }
  };

  useEffect(() => {
    if (!isSubModalOpen && justSaved) {
      setJustSaved(false);
    }
  }, [isSubModalOpen, justSaved]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubModalOpen) {
        handleTryClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [hasChanges, onClose, isSubModalOpen, justSaved]);

  if (loading) return null;

  return (
    <Overlay onClick={handleTryClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <SettingsPage
          user={user}
          setUser={setUser}
          tempUser={tempUser}
          setTempUser={setTempUser}
          setSubModalOpen={setIsSubModalOpen}
          onSave={handleSave}
          onClose={handleTryClose}
          onChangeNickname={() => setNicknameModalOpen(true)}
          setProfileFile={setProfileFile}
          setBgFile={setBgFile}
          setRoomFile={setRoomFile}
        />
      </ModalBox>

      {isNicknameModalOpen && (
        <NicknameModal
          currentNickname={tempUser.nickname}
          onSave={handleNicknameChange}
          onClose={() => setNicknameModalOpen(false)}
        />
      )}
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  width: 800px;
  height: 850px;
  background-color: #fdebf1;
  border-radius: 24px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  padding: 32px;
  font-family: 'Cafe24Ssurround', 'Quicksand', sans-serif;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;