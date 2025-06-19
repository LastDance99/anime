import React, { useState } from "react";
import styled from "styled-components";
import { changePassword } from "../../api/auth";

type Props = {
  currentPassword: string;
  onSave: (newPassword: string) => void;
  onClose: () => void;
};

export default function PasswordModal({ onClose }: Props) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [nextConfirm, setNextConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    setError(null);
    if (!current || !next || !nextConfirm) {
      setError("모든 항목을 입력해주세요.");
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
        setError(`현재 비밀번호 오류: ${data.current_password}`);
      } else if (data?.new_password) {
        setError(`새 비밀번호 오류: ${data.new_password}`);
      } else if (data?.new_password2) {
        setError(`비밀번호 확인 오류: ${data.new_password2}`);
      } else if (data?.non_field_errors) {
        setError(data.non_field_errors.join(" "));
      } else {
        setError("비밀번호 변경에 실패했습니다.");
      }
    }
  };

  return (
    <Overlay>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <h3>비밀번호 변경</h3>

        <Label>현재 비밀번호</Label>
        <Input
          type="password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
        />

        <Label>새 비밀번호</Label>
        <Input
          type="password"
          value={next}
          onChange={(e) => setNext(e.target.value)}
        />

        <Label>새 비밀번호 확인</Label>
        <Input
          type="password"
          value={nextConfirm}
          onChange={(e) => setNextConfirm(e.target.value)}
        />

        {error && <Warning>{error}</Warning>}
        {success && <Success>비밀번호가 변경되었습니다.</Success>}

        <ButtonGroup>
          <Button onClick={onClose}>취소</Button>
          <Button onClick={handleSave}>저장</Button>
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