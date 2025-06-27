import React, { useState } from "react";
import {
  IntroductionBox,
  ProfileButton,
  IntroTextArea,
  IntroParagraph,
} from "./Introduction.styled";
import { updateAbout } from "../../../../api/profile";
import { useAuth } from "../../../../contexts/AuthContext";

interface Props {
  about: string;
  userId: number; // ⭐️ 현재 프로필의 유저 ID
}

export default function Introduction({ about, userId }: Props) {
  const { currentUser } = useAuth(); // ⭐️ 로그인한 사용자
  const isMine = currentUser?.id === userId;

  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(about);

  console.log("currentUser", currentUser);
  console.log("userId", userId);
  console.log("isMine", currentUser?.id === userId);

  const handleSave = async () => {
    try {
      await updateAbout({ about: value });
      setEditing(false);
    } catch (err) {
      console.error("소개글 저장 실패:", err);
      alert("소개글 저장에 실패했어요.");
    }
  };

  return (
    <IntroductionBox>
      {editing ? (
        <>
          <IntroTextArea
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="자기소개를 입력해 주세요."
            maxLength={200}
            rows={7}
          />
          <ProfileButton onClick={handleSave}>저장</ProfileButton>
        </>
      ) : (
        <>
          <IntroParagraph>{value || "자기소개가 없습니다."}</IntroParagraph>
          {isMine && (
            <ProfileButton onClick={() => setEditing(true)}>수정</ProfileButton>
          )}
        </>
      )}
    </IntroductionBox>
  );
}