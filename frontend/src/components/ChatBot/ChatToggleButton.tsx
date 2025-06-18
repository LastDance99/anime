import React from "react";
import styled from "styled-components";
import { MessageCircle } from "lucide-react";

type Props = {
  onClick: () => void;
};

export default function ChatToggleButton({ onClick }: Props) {
  return (
    <Button onClick={onClick} aria-label="챗봇 열기/닫기">
      <MessageCircle size={22} />
    </Button>
  );
}

const Button = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 99;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.bordermain};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }

  svg {
    pointer-events: none;
  }
`;