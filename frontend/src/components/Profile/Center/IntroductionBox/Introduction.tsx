import React, { useState } from "react";
import {
  IntroductionBox,
  ProfileButton,
  IntroTextArea,
  IntroParagraph,
} from "./Introduction.styled";
import { updateAbout } from "../../../../api/profile";
import { useTranslation } from "react-i18next";

interface Props {
  about: string;
  userId: number;
  isMyPage: boolean;
}

export default function Introduction({ about, userId, isMyPage }: Props) {
  const { t } = useTranslation();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(about);

  const handleSave = async () => {
    try {
      await updateAbout({ about: value });
      setEditing(false);
    } catch (err) {
      console.error("소개글 저장 실패:", err);
      alert(t("profile.intro_save_failed"));
    }
  };

  return (
    <IntroductionBox>
      {editing ? (
        <>
          <IntroTextArea
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={t("profile.intro_placeholder")}
            maxLength={200}
            rows={7}
          />
          <ProfileButton onClick={handleSave}>
            {t("common.save")}
          </ProfileButton>
        </>
      ) : (
        <>
          <IntroParagraph>
            {value || t("profile.intro_empty")}
          </IntroParagraph>
          {isMyPage && (
            <ProfileButton onClick={() => setEditing(true)}>
              {t("common.edit")}
            </ProfileButton>
          )}
        </>
      )}
    </IntroductionBox>
  );
}