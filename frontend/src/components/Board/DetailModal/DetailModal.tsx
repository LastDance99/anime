import { useEffect } from "react";
import { Overlay, ModalBox, Content, Left, Right, Header, CloseButton } from './DetailModal.styled';
import DetailContent from './DetailContent/DetailContent';
import CommentBox from './CommentBox/CommentBox';

type Props = {
  type: 'post' | 'gallery';
  id: number;
  onClose: () => void;
  onDeleteSuccess?: (deletedId: number) => void; // ✅ 추가
};

export default function DetailModal({ type, id, onClose, onDeleteSuccess }: Props) {
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
            <DetailContent key={id} id={id} onDeleteSuccess={onDeleteSuccess} />
          </Left>
          <Right>
            <CommentBox contentType={type} contentId={id} />
          </Right>
        </Content>
      </ModalBox>
    </Overlay>
  );
}