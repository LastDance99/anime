import React, { useState } from "react";
import styled from "styled-components";
import { changePassword } from "../../api/settings";
import { useTranslation } from "react-i18next";

type Props = {
  onClose: () => void;
};

export default function PasswordModal({ onClose }: Props) {
  const { t } = useTranslation();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [nextConfirm, setNextConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    setError(null);
    if (!current || !next || !nextConfirm) {
      setError(t("password_modal.error_required"));
      return;
    }

    try {
      await changePassword({
        current_password: current,
        new_password: next,
        new_password2: nextConfirm,
      });
      setSuccess(true);
      setTimeout(onClose, 1000);
    } catch (err: any) {
      const data = err.response?.data;
      if (data?.current_password) {
        setError(t("password_modal.error_current", { msg: data.current_password }));
      } else if (data?.new_password) {
        setError(t("password_modal.error_new", { msg: data.new_password }));
      } else if (data?.new_password2) {
        setError(t("password_modal.error_confirm", { msg: data.new_password2 }));
      } else if (data?.non_field_errors) {
        setError(data.non_field_errors.join(" "));
      } else {
        setError(t("password_modal.error_general"));
      }
    }
  };

  return (
    <Overlay>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <h3>{t("password_modal.title")}</h3>

        <Label>{t("password_modal.current")}</Label>
        <Input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} />

        <Label>{t("password_modal.new")}</Label>
        <Input type="password" value={next} onChange={(e) => setNext(e.target.value)} />

        <Label>{t("password_modal.confirm")}</Label>
        <Input type="password" value={nextConfirm} onChange={(e) => setNextConfirm(e.target.value)} />

        {error && <Warning>{error}</Warning>}
        {success && <Success>{t("password_modal.success")}</Success>}

        <ButtonGroup>
          <Button onClick={onClose}>{t("common.cancel")}</Button>
          <Button onClick={handleSave}>{t("common.save")}</Button>
        </ButtonGroup>
      </ModalBox>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  width: 320px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  margin-top: 10px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  background-color: #f9c2d2;
  cursor: pointer;

  &:hover {
    background-color: #f7aac1;
  }
`;

const Warning = styled.div`
  font-size: 0.85rem;
  color: red;
  margin-top: 4px;
`;

const Success = styled.div`
  font-size: 0.85rem;
  color: green;
  margin-top: 4px;
`;