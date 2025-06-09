import React, { useState } from "react";
import { IntroductionBox, ProfileButton, IntroTextArea, IntroParagraph } from "./Introduction.styled";

export default function Introduction({ about }: { about: string }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(about);

  const handleSave = () => {
    setEditing(false);
    // TODO: API 저장
    console.log("저장된 intro:", value);
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
          <IntroParagraph>{value}</IntroParagraph>
          <ProfileButton onClick={() => setEditing(true)}>수정</ProfileButton>
        </>
      )}
    </IntroductionBox>
  );
}