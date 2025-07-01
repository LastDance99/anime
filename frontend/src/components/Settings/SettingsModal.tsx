import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SettingsPage from "../../pages/SettingsPage/SettingsPage";
import type { User } from "../../types/user";
import {
  getUserSettings,
  updateAccount,
  updateLanguage,
  deleteImage,
  updateImage,
} from "../../api/settings";
import { checkNickname } from "../../api/auth";
import axios from "../../lib/axios";
import NicknameModal from "./NicknameModal";

// TempUser 타입 정의
type TempUser = Omit<User, 'profile_image' | 'background_image' | 'myroom_image'> & {
  profile_image: string | File | null;
  background_image: string | File | null;
  myroom_image: string | File | null;
};

// 변환 함수
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
  onSaved?: () => void;
};

export default function SettingsModal({ user, setUser, onClose, onSaved }: SettingsModalProps) {
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
    // 이미지도 값이 달라졌는지 직접 비교!
    const changed =
      user.nickname !== tempUser.nickname ||
      user.language !== tempUser.language ||
      profileFile !== null ||
      bgFile !== null ||
      roomFile !== null ||
      // 이미지 비교: File이거나, string이거나, null이거나
      (typeof user.profile_image === "string"
        ? user.profile_image !== (typeof tempUser.profile_image === "string" ? tempUser.profile_image : null)
        : user.profile_image !== tempUser.profile_image) ||
      (typeof user.background_image === "string"
        ? user.background_image !== (typeof tempUser.background_image === "string" ? tempUser.background_image : null)
        : user.background_image !== tempUser.background_image) ||
      (typeof user.myroom_image === "string"
        ? user.myroom_image !== (typeof tempUser.myroom_image === "string" ? tempUser.myroom_image : null)
        : user.myroom_image !== tempUser.myroom_image);

    setHasChanges(changed);
  }, [user, tempUser, profileFile, bgFile, roomFile]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getUserSettings();
        setTempUser(convertUserToTempUser(data));
      } catch (err) {
        console.error("설정 로드 실패", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async () => {
    const confirmed = window.confirm("설정을 저장하시겠습니까?");
    if (!confirmed) return;

    try {
      if (user.nickname !== tempUser.nickname) {
        await updateAccount({ nickname: tempUser.nickname });
      }

      if (user.language !== tempUser.language) {
        await updateLanguage({ language: tempUser.language });
      }

      const formData = new FormData();
      if (profileFile) formData.append("profile_image", profileFile);
      if (bgFile) formData.append("background_image", bgFile);
      if (roomFile) formData.append("myroom_image", roomFile);

      // ✅ 디버깅: FormData 내용 출력
      for (let [key, value] of formData.entries()) {
        console.log(`[FormData] ${key}:`, value);
        console.log(` - is File:`, value instanceof File);
        if (value instanceof File) {
          console.log(` - name: ${value.name}`);
          console.log(` - type: ${value.type}`);
          console.log(` - size: ${value.size}`);
        }
      }

      if (formData.has("profile_image") || formData.has("background_image") || formData.has("myroom_image")) {
        await updateImage(formData);
      }

      setUser(tempUser as User);
      setJustSaved(true);
      onClose();
      if (onSaved) {
        console.log("🟣 onSaved 호출!!");
        onSaved();
      }
    } catch (err: any) {
      console.error("설정 저장 실패:", err);
      if (err.response) {
        console.error("응답 오류:", err.response.data);
        alert(err.response.data.detail || JSON.stringify(err.response.data));
      } else if (err.request) {
        alert("서버로부터 응답이 없습니다.");
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const handleTryClose = () => {
    if (hasChanges && !justSaved) {
      const confirmed = window.confirm("저장하지 않은 변경사항이 있습니다. 닫으시겠습니까?");
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
      const msg = err.response?.data?.nickname?.[0] || err.response?.data?.detail || "닉네임 확인 실패";
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