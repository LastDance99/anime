import React, { useState } from "react";
import {
  IntroductionBox,
  ProfileButton,
  IntroTextArea,
  IntroParagraph,
} from "./Introduction.styled";
import { updateAbout } from "../../../../api/profile";

interface Props {
  about: string;
  userId: number;
  isMyPage: boolean;
}

export default function Introduction({ about, userId, isMyPage }: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(about);

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
          {isMyPage && (
            <ProfileButton onClick={() => setEditing(true)}>수정</ProfileButton>
          )}
        </>
      )}
    </IntroductionBox>
  );
}