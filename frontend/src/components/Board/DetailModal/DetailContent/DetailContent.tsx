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
import { useTranslation } from "react-i18next";

export default function DetailContent({
  id,
  onDeleteSuccess,
}: {
  id: number;
  onDeleteSuccess?: (deletedId: number) => void;
}) {
  const [item, setItem] = useState<BoardItem | null>(null);
  const [liked, setLiked] = useState<boolean | null>(null);
  const [likeCount, setLikeCount] = useState<number | null>(null);

  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const data = await getBoardPostDetail(id);
      setItem(data);
    } catch (err) {
      console.error("게시글 상세 조회 실패", err);
      setItem(null);
    }
  };

  useEffect(() => {
    if (item) {
      setLiked(item.is_liked ?? false);
      setLikeCount(item.like_count ?? 0);
    }
  }, [item]);

  if (!item) return <div>{t("board.detail.load_fail")}</div>;

  const isGallery = item.board_type === "gallery";
  const authorNickname = item.author_nickname ?? t("board.detail.unknown_author");
  const profileImage = getFullImageUrl(item.author_profile_image);
  const isAuthor = currentUser?.id === item.author.id;
  const authorId = item.author.id;

  const handleLike = async () => {
    if (isAuthor || liked === null || likeCount === null) return;

    const prevLiked = liked;
    const prevCount = likeCount;

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

  const handleEdit = () => navigate(`/board/edit/${id}`);

  const handleDelete = async () => {
    if (!window.confirm(t("board.detail.confirm_delete"))) return;
    try {
      await deleteBoardPost(id);
      alert(t("board.detail.deleted"));
      onDeleteSuccess?.(id);
    } catch (err) {
      console.error("삭제 실패", err);
      alert(t("board.detail.delete_fail"));
    }
  };

  const handleProfileClick = () => navigate(`/profile/${authorId}`);

  const handleMoreClick = () => {
    const target = isGallery ? "mygallery" : "myboard";
    navigate(`/profile/${authorId}/${target}`);
  };

  return (
    <Wrapper>
      <CategoryText $type={isGallery ? "gallery" : "board"}>
        {isGallery ? t("board.detail.gallery") : t("board.detail.post")}
      </CategoryText>
      <TitleText>{item.title}</TitleText>

      <UserRow>
        <Profile
          src={profileImage || "/default_profile.png"}
          alt={`${authorNickname}님의 프로필 이미지`}
          onClick={handleProfileClick}
          style={{ cursor: "pointer" }}
          onError={(e) => {
            if (!e.currentTarget.src.includes("/default_profile.png")) {
              e.currentTarget.src = "/default_profile.png";
            }
          }}
        />
        <UserInfo>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Nickname onClick={handleProfileClick} style={{ cursor: "pointer" }}>
              {authorNickname}
            </Nickname>
            {isAuthor && (
              <>
                <button onClick={handleEdit}>{t("board.detail.edit")}</button>
                <button onClick={handleDelete}>{t("board.detail.delete")}</button>
              </>
            )}
          </div>
          <Meta>
            {t("board.detail.date")} {item.created_at} · {t("board.detail.views")} {item.views}
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
        <MoreLink onClick={handleMoreClick}>
          {t("board.detail.more_posts", {
            nickname: authorNickname,
            type: isGallery ? t("board.detail.gallery") : t("board.detail.post"),
          })}
        </MoreLink>
        <IconButtons>
          <IconBtn
            $liked={liked ?? false}
            onClick={handleLike}
            aria-label={t("board.detail.like")}
            role="button"
            as="button"
            disabled={isAuthor || liked === null}
            style={{
              opacity: isAuthor || liked === null ? 0.5 : 1,
              cursor: isAuthor || liked === null ? "not-allowed" : "pointer",
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