import React, { useState } from "react";
import styled from "styled-components";
import { checkNickname } from "../../api/auth";
import { useTranslation } from "react-i18next";

type Props = {
  currentNickname: string;
  onSave: (nickname: string) => void;
  onClose: () => void;
  timeLeftText: string | null; // ✅ 다국어 지원된 시간 문자열
};

export default function NicknameModal({
  currentNickname,
  onSave,
  onClose,
  timeLeftText,
}: Props) {
  const { t } = useTranslation();
  const [value, setValue] = useState(currentNickname);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (value === currentNickname) {
      return onClose(); // 변경 없음 -> 바로 닫기
    }

    try {
      await checkNickname(value);
      setError("");
      onSave(value); // 저장 → 모달 닫힘은 부모에서
    } catch (err: any) {
      const data = err.response?.data;
      const msg =
        data?.nickname?.[0] || data?.message || t("nickname_modal.error");
      setError(msg);
    }
  };

  return (
    <Overlay>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>
          {timeLeftText
            ? t("nickname_modal.time_limit", { time: timeLeftText })
            : t("nickname_modal.title")}
        </Title>

        <Input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError("");
          }}
          maxLength={20}
          disabled={!!timeLeftText}
        />
        {error && <ErrorMsg>{error}</ErrorMsg>}

        <ButtonGroup>
          <Button onClick={onClose}>{t("common.cancel")}</Button>
          <Button onClick={handleSubmit} disabled={!!timeLeftText}>
            {t("common.confirm")}
          </Button>
        </ButtonGroup>
      </Modal>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: #fff;
  padding: 24px 32px;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  min-width: 300px;
`;

const Title = styled.h3`
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 13px;
  margin-bottom: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button<{ disabled?: boolean }>`
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  background-color: ${({ disabled }) => (disabled ? "#ddd" : "#f9c2d2")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ddd" : "#f7aac1")};
  }
`;
