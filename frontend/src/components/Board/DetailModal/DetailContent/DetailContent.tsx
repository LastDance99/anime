import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getBoardPostDetail,
  addBoardPostLike,
  removeBoardPostLike,
  deleteBoardPost,
} from "../../../../api/board";
import type { BoardItem } from "../../../../types/board";
import { getFullImageUrl } from "../../../../utils/getFullImageUrl";
import { useAuth } from "../../../../contexts/AuthContext";
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
  HtmlContent,
} from "./DetailContent.styled";
import { ThumbsUp } from "lucide-react";
import DOMPurify from "dompurify";

export default function DetailContent({ id }: { id: number }) {
  const [item, setItem] = useState<BoardItem | null>(null);
  const [liked, setLiked] = useState<boolean | null>(null);
  const [likeCount, setLikeCount] = useState<number | null>(null);

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const data = await getBoardPostDetail(id);
      console.log("📦 상세 데이터:", data); // ← 여기서 is_liked: false 라면 백엔드 문제 확정
      setItem(data);
    } catch (err) {
      console.error("게시글 상세 조회 실패", err);
      setItem(null);
    }
  };

  // 🔁 item이 바뀌면 liked/likeCount 동기화
  useEffect(() => {
    if (item) {
      setLiked(item.is_liked ?? false);
      setLikeCount(item.like_count ?? 0);
    }
  }, [item]);

  if (!item) return <div>게시글을 불러올 수 없습니다.</div>;

  const isGallery = item.board_type === "gallery";
  const authorNickname = item.author_nickname ?? "알 수 없음";
  const profileImage = getFullImageUrl(item.author_profile_image);
  const isAuthor = currentUser?.nickname === authorNickname;

  const handleLike = async () => {
    if (isAuthor || liked === null || likeCount === null) return;

    const prevLiked = liked;
    const prevCount = likeCount;

    // Optimistic UI
    setLiked(!prevLiked);
    setLikeCount(prevLiked ? prevCount - 1 : prevCount + 1);

    try {
      let res;
      if (!prevLiked) {
        res = await addBoardPostLike(id);
      } else {
        res = await removeBoardPostLike(id);
      }

      setLiked(res.is_liked ?? !prevLiked);
      setLikeCount(
        typeof res.like_count === "number"
          ? res.like_count
          : prevLiked
          ? prevCount - 1
          : prevCount + 1
      );
    } catch (err) {
      console.error("좋아요 처리 실패", err);
      setLiked(prevLiked);
      setLikeCount(prevCount);
    }
  };

  const handleEdit = () => {
    navigate(`/board/edit/${id}`);
  };

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteBoardPost(id);
      alert("삭제되었습니다.");
      navigate("/board");
    } catch (err) {
      console.error("삭제 실패", err);
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <Wrapper>
      <CategoryText $type={isGallery ? "gallery" : "board"}>
        {isGallery ? "갤러리" : "게시글"}
      </CategoryText>
      <TitleText>{item.title}</TitleText>

      <UserRow>
        <Profile
          src={profileImage || "/default_profile.png"}
          alt={`${authorNickname}님의 프로필 이미지`}
          onError={(e) => {
            if (!e.currentTarget.src.includes("/default_profile.png")) {
              e.currentTarget.src = "/default_profile.png";
            }
          }}
        />
        <UserInfo>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Nickname>{authorNickname}</Nickname>
            {isAuthor && (
              <>
                <button
                  onClick={handleEdit}
                  style={{
                    fontSize: "12px",
                    padding: "2px 6px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    background: "#f4f4f4",
                    cursor: "pointer",
                  }}
                >
                  수정
                </button>
                <button
                  onClick={handleDelete}
                  style={{
                    fontSize: "12px",
                    padding: "2px 6px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    background: "#fdf0f0",
                    cursor: "pointer",
                  }}
                >
                  삭제
                </button>
              </>
            )}
          </div>
          <Meta>
            작성일 {item.created_at} · 조회수 {item.views}
          </Meta>
        </UserInfo>
      </UserRow>

      <ContentBox>
        <ScrollableContent>
          <HtmlContent
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(item.content, {
                ADD_TAGS: ["iframe"],
                ADD_ATTR: [
                  "allow",
                  "allowfullscreen",
                  "frameborder",
                  "scrolling",
                  "src",
                  "height",
                  "width",
                ],
              }),
            }}
          />
        </ScrollableContent>
      </ContentBox>

      <FooterRow>
        <MoreLink>
          {authorNickname}님의 다른 {isGallery ? "갤러리" : "게시글"} &gt;
        </MoreLink>
        <IconButtons>
          <IconBtn
            $liked={liked ?? false}
            onClick={handleLike}
            aria-label="좋아요"
            role="button"
            as="button"
            disabled={isAuthor || liked === null}
            style={{
              opacity: isAuthor || liked === null ? 0.5 : 1,
              cursor: isAuthor || liked === null ? "not-allowed" : "pointer",
              fontSize: "14px",
              padding: "4px 6px",
            }}
          >
            <ThumbsUp size={16} />
            {likeCount ?? 0}
          </IconBtn>
        </IconButtons>
      </FooterRow>
    </Wrapper>
  );
}