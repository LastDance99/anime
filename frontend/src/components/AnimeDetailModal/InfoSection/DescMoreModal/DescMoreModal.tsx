import React, { useEffect, useRef } from "react";
import styled from "styled-components";

interface DescMoreModalProps {
  description: string;
  onClose: () => void;
}

export default function DescMoreModal({ description, onClose }: DescMoreModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // ESC로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // 오버레이(밖) 클릭 시 닫기
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Modal ref={modalRef}>
        <CloseBtn onClick={onClose}>×</CloseBtn>
        {/* ✨ 핵심 변경 부분! */}
        <FullDesc dangerouslySetInnerHTML={{ __html: description }} />
      </Modal>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(32, 28, 30, 0.2);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: 38px 32px 32px 32px;
  border-radius: 8px;
  max-width: 480px;
  box-shadow: 0 2px 24px rgba(0, 0, 0, 0.13);
  position: relative;
`;

const FullDesc = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: #534a5a;
  white-space: pre-line;
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 6px;
  font-size: 1.5rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.subtext};
  cursor: pointer;
`;