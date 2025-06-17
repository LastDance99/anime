import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SettingsPage from "../../pages/SettingsPage/SettingsPage";
import type { User } from "../../types/user";

type SettingsModalProps = {
  user: User;
  setUser: (user: User) => void;
  onClose: () => void;
};

export default function SettingsModal({
  user,
  setUser,
  onClose,
}: SettingsModalProps) {
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [tempUser, setTempUser] = useState(user);
  const [justSaved, setJustSaved] = useState(false); // ⭐

  const hasChanges = JSON.stringify(user) !== JSON.stringify(tempUser);

  // user가 변경될 때 tempUser도 동기화
  useEffect(() => {
    setTempUser(user);
  }, [user]);

  // 저장 후, justSaved 플래그 세우기
  const handleSave = () => {
    const confirmed = window.confirm("설정을 저장하시겠습니까?");
    if (!confirmed) return;
    setUser(tempUser);
    setJustSaved(true); // ⭐ 저장됨 표시
    onClose();
  };

  // 닫기 시, justSaved면 무조건 닫음 (경고 스킵)
  const handleTryClose = () => {
    if (!justSaved && hasChanges) {
      const confirmed = window.confirm("저장하지 않은 변경사항이 있습니다. 닫으시겠습니까?");
      if (!confirmed) return;
    }
    onClose();
  };

  // justSaved는 닫힌 뒤 1회성으로만 쓰게 리셋
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

  return (
    <Overlay onClick={handleTryClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <SettingsPage
          user={user}
          setUser={setUser}
          tempUser={tempUser}
          setTempUser={setTempUser}
          setSubModalOpen={setIsSubModalOpen}
          onSave={handleSave}      // ⭐ 콜백으로 저장
          onClose={handleTryClose} // 닫기
        />
      </ModalBox>
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

  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE, Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;