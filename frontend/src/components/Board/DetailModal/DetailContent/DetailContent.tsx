import { useEffect, useState } from "react";
import { boardList } from "../../../../data/boardList";
import type { BoardItem } from "../../../../types/board";
import {
  Wrapper,
  CategoryText,
  TitleText,
  UserRow,
  Profile,
  UserInfo,
  Nickname,
  Meta,
  ContentBox,
  ScrollableContent,
  FooterRow,
  MoreLink,
  IconButtons,
  IconBtn,
  MainImage,
} from "./DetailContent.styled";
import { ThumbsUp } from "lucide-react";

export default function DetailContent({ id }: { id: number }) {
  const [item, setItem] = useState<BoardItem | null>(null);

  // 좋아요 상태 (실제로는 유저 별로 관리해야 하지만, 지금은 간단히)
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const target = boardList.find(b => b.id === id);
    setItem(target ?? null);
    setLiked(false);
    setLikeCount(target?.likes ?? 0);
  }, [id]);

  if (!item) return <div>게시글을 불러올 수 없습니다.</div>;

  const isGallery = item.boardType === "gallery";

  // 좋아요 토글
  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(prev => prev - 1);
    } else {
      setLiked(true);
      setLikeCount(prev => prev + 1);
    }
    // 실제로는 API 호출 필요!
  };

  return (
    <Wrapper>
      <CategoryText $type={item.boardType === "gallery" ? "gallery" : "board"}>
        {item.category}
      </CategoryText>
      <TitleText>{item.title}</TitleText>

      <UserRow>
        <Profile src={item.authorProfileImage} />
        <UserInfo>
          <Nickname>{item.nickname}</Nickname>
          <Meta>
            작성 {item.time} · 조회수 {item.views} · 댓글 {item.comment}
          </Meta>
        </UserInfo>
      </UserRow>

      <ContentBox>
        <ScrollableContent>
          {item.images && item.images.length > 0 &&
            item.images.map((src, i) => (
              <MainImage
                key={i}
                src={src}
                alt={`img-${i}`}
              />
            ))}
          <pre>{item.content}</pre>
        </ScrollableContent>
      </ContentBox>

      <FooterRow>
        <MoreLink>
          {item.nickname}님의 다른 {isGallery ? "갤러리" : "게시글"} &gt;
        </MoreLink>
        <IconButtons>
          <IconBtn $liked={liked} onClick={handleLike} aria-label="좋아요" role="button" as="button">
            <ThumbsUp size={18} />
            {likeCount}
          </IconBtn>
        </IconButtons>
      </FooterRow>
    </Wrapper>
  );
}