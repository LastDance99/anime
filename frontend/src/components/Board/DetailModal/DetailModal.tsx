import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next"; // 추가!
import { Overlay, ModalBox, Content, Left, Right, Header, CloseButton } from './DetailModal.styled';
import DetailContent from './DetailContent/DetailContent';
import CommentBox from './CommentBox/CommentBox';

type Props = {
  type: 'post' | 'gallery';
  id: number;
  onClose: () => void;
  onDeleteSuccess?: (deletedId: number) => void;
};

export default function DetailModal({ type, id, onClose, onDeleteSuccess }: Props) {
  const [isNotice, setIsNotice] = useState<boolean | null>(null);
  const { t } = useTranslation(); // 추가

  // DetailContent에서 is_notice 콜백 전달
  const handleIsNotice = useCallback((value: boolean) => {
    setIsNotice(value);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={e => e.stopPropagation()}>
        <Header>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </Header>
        <Content>
          <Left>
            {/* onIsNotice 콜백 전달 */}
            <DetailContent key={id} id={id} onDeleteSuccess={onDeleteSuccess} onIsNotice={handleIsNotice} />
          </Left>
          <Right>
            {isNotice === null ? null : isNotice ? (
              <div style={{
                padding: "28px 0",
                color: "#FF5722",
                fontWeight: 600,
                textAlign: "center",
              }}>
                {t("board.notice_no_comment")}
              </div>
            ) : (
              <CommentBox contentType={type} contentId={id} />
            )}
          </Right>
        </Content>
      </ModalBox>
    </Overlay>
  );
}