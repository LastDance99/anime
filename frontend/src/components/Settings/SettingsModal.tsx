import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import SettingsPage from "../../pages/SettingsPage/SettingsPage";
import type { User } from "../../types/user";
import {
  getUserSettings,
  updateAccount,
  updateLanguage,
  updateImage,
  deleteImage,
} from "../../api/settings";
import NicknameModal from "./NicknameModal";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

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
  const [timeLeftText, setTimeLeftText] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getUserSettings();
        setTempUser(convertUserToTempUser(data));
        setUser(data);
        if (data.nickname_changed_at) {
          const next = dayjs(data.nickname_changed_at).add(30, "day");
          const now = dayjs();
          const diff = next.diff(now);
          if (diff > 0) {
            const d = dayjs.duration(diff);
            const days = Math.floor(d.asDays());
            const hours = d.hours();
            const minutes = d.minutes();
            const text =
              days > 0
                ? t("time.left_full", {
                    days,
                    hours,
                    minutes,
                    dLabel: t("time.d"),
                    hLabel: t("time.h"),
                    mLabel: t("time.m"),
                  })
                : hours > 0
                ? t("time.left_hour_min", {
                    hours,
                    minutes,
                    hLabel: t("time.h"),
                    mLabel: t("time.m"),
                  })
                : t("time.left_min", {
                    minutes,
                    mLabel: t("time.m"),
                  });

            setTimeLeftText(text);
          }
        }
      } catch (err) {
        console.error(t("settings.loadError"), err);
      } finally {
        setLoading(false);
      }
    })();
  }, [t]);

  useEffect(() => {
    const changed =
      user.nickname !== tempUser.nickname ||
      user.language !== tempUser.language ||
      user.profile_image !== tempUser.profile_image ||
      user.background_image !== tempUser.background_image ||
      user.myroom_image !== tempUser.myroom_image;
    setHasChanges(changed);
  }, [user, tempUser]);

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
      if (user.profile_image && tempUser.profile_image === null) {
        await deleteImage("profile_image");
      }
      if (user.background_image && tempUser.background_image === null) {
        await deleteImage("background_image");
      }
      if (user.myroom_image && tempUser.myroom_image === null) {
        await deleteImage("myroom_image");
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

      setUser(tempUser as User);
      if (onSaved) onSaved(tempUser as User);
      setJustSaved(true);
      onClose();
    } catch (err: any) {
      console.error(t("settings.saveError"), err);
      alert(t("settings.unknownError"));
    }
  };

  const handleTryClose = () => {
    if (hasChanges && !justSaved) {
      const confirmed = window.confirm(t("settings.unsavedChanges"));
      if (!confirmed) return;
    }
    setTempUser(convertUserToTempUser(user));
    onClose();
  };

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
          hasChanges={hasChanges}
        />
      </ModalBox>

      {isNicknameModalOpen && (
        <NicknameModal
          currentNickname={tempUser.nickname}
          onSave={(newNickname) => {
            setTempUser((prev) => ({ ...prev, nickname: newNickname }));
            setNicknameModalOpen(false);
          }}
          onClose={() => setNicknameModalOpen(false)}
          timeLeftText={timeLeftText}
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