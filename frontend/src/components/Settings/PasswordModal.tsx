import React, { useState } from "react";
import styled from "styled-components";

type Props = {
  currentPassword: string;
  onClose: () => void;
  onSave: (newPassword: string) => void;
};

export default function PasswordModal({ currentPassword, onClose, onSave }: Props) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [valid, setValid] = useState<boolean | null>(null);

  const handleBlur = () => {
    if (current === "") {
      setValid(null);
    } else {
      setValid(current === currentPassword);
    }
  };

  const handleSave = () => {
    if (!valid) {
      alert("현재 비밀번호가 올바르지 않습니다.");
      return;
    }
    if (!next.trim()) {
      alert("새 비밀번호를 입력해주세요.");
      return;
    }

    onSave(next);
    onClose();
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
          onBlur={handleBlur}
        />
        {valid === false && <Warning>현재 비밀번호가 일치하지 않습니다.</Warning>}
        {valid === true && <Success>비밀번호 확인 완료 ✅</Success>}

        <Label>새 비밀번호</Label>
        <Input
          type="password"
          value={next}
          onChange={(e) => setNext(e.target.value)}
        />

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