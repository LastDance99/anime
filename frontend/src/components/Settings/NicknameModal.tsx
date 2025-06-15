import React, { useState } from "react";
import styled from "styled-components";

type Props = {
  currentNickname: string;
  onSave: (nickname: string) => void;
  onClose: () => void;
};

export default function NicknameModal({ currentNickname, onSave, onClose }: Props) {
  const [value, setValue] = useState(currentNickname);

  return (
    <Overlay>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>닉네임 변경</Title>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={20}
        />
        <ButtonGroup>
          <Button onClick={onClose}>취소</Button>
          <Button onClick={() => onSave(value)}>확인</Button>
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
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
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