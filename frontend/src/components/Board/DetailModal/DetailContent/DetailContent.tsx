import { useEffect, useState } from "react";
import { getBoardPostDetail } from "../../../../api/board";
import { toggleBoardPostLike } from "../../../../api/board";
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
  HtmlContent,
} from "./DetailContent.styled";
import { ThumbsUp } from "lucide-react";
import DOMPurify from "dompurify";

export default function DetailContent({ id }: { id: number }) {
  const [item, setItem] = useState<BoardItem | null>(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBoardPostDetail(id);
        setItem(data);
        setLiked(data.liked ?? false); // 서버 응답에 liked 필드가 있다면
        setLikeCount(data.like_count ?? 0);
      } catch (err) {
        console.error("게시글 상세 조회 실패", err);
        setItem(null);
      }
    }
    fetchData();
  }, [id]);

  if (!item) return <div>게시글을 불러올 수 없습니다.</div>;

  const isGallery = item.board_type === "gallery";

  const handleLike = async () => {
  try {
    const res = await toggleBoardPostLike(id);
    setLiked(res.liked); // 서버가 true/false 반환한다고 가정
    setLikeCount(res.like_count); // 서버가 최신 좋아요 수 반환한다고 가정
  } catch (err) {
    console.error("좋아요 처리 실패", err);
  }
};

  return (
    <Wrapper>
      <CategoryText $type={isGallery ? "gallery" : "board"}>
        {item.category}
      </CategoryText>
      <TitleText>{item.title}</TitleText>

      <UserRow>
        <Profile src={item.author.profile_image || "/default_profile.png"} />
        <UserInfo>
          <Nickname>{item.author.nickname}</Nickname>
          <Meta>
            작성일 {item.created_at} · 조회수 {item.views} · 댓글{" "}
            {item.comment_count}
          </Meta>
        </UserInfo>
      </UserRow>

      <ContentBox>
        <ScrollableContent>
          {item.images?.length > 0 &&
            item.images.map((src, i) => (
              <MainImage key={i} src={src} alt={`img-${i}`} />
            ))}

          <HtmlContent
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(item.content),
            }}
          />
        </ScrollableContent>
      </ContentBox>

      <FooterRow>
        <MoreLink>
          {item.author.nickname}님의 다른{" "}
          {isGallery ? "갤러리" : "게시글"} &gt;
        </MoreLink>
        <IconButtons>
          <IconBtn
            $liked={liked}
            onClick={handleLike}
            aria-label="좋아요"
            role="button"
            as="button"
          >
            <ThumbsUp size={18} />
            {likeCount}
          </IconBtn>
        </IconButtons>
      </FooterRow>
    </Wrapper>
  );
}