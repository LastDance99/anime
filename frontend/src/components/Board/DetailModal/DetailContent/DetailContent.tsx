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
  NoticeBadge,
} from "./DetailContent.styled";
import { ThumbsUp } from "lucide-react";
import DOMPurify from "dompurify";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import "dayjs/locale/en";
import "dayjs/locale/es";

dayjs.extend(relativeTime);

const DEFAULT_PROFILE_IMG = import.meta.env.VITE_DEFAULT_PROFILE_IMG;

type Props = {
  id: number;
  onDeleteSuccess?: (deletedId: number) => void;
  onIsNotice?: (isNotice: boolean) => void;
};

export default function DetailContent({
  id,
  onDeleteSuccess,
  onIsNotice,
}: Props) {
  const [item, setItem] = useState<BoardItem | null>(null);
  const [liked, setLiked] = useState<boolean | null>(null);
  const [likeCount, setLikeCount] = useState<number | null>(null);

  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // 언어에 맞게 dayjs locale 적용
  useEffect(() => {
    dayjs.locale(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    fetchData();
    return () => onIsNotice?.(false);
    // eslint-disable-next-line
  }, [id]);

  const fetchData = async () => {
    try {
      const data = await getBoardPostDetail(id);
      setItem(data);
      onIsNotice?.(!!data.is_notice);
    } catch (err) {
      console.error("게시글 상세 조회 실패", err);
      setItem(null);
      onIsNotice?.(false);
    }
  };

  useEffect(() => {
    if (item) {
      setLiked(item.is_liked ?? false);
      setLikeCount(item.like_count ?? 0);
    }
  }, [item]);

  if (!item) return <div>{t("board.detail.load_fail")}</div>;

  const isNotice = item.is_notice;
  const isGallery = item.board_type === "gallery";
  const authorNickname = item.author_nickname ?? t("board.detail.unknown_author");
  const profileImage = getFullImageUrl(item.author_profile_image);
  const isAuthor = currentUser?.id === item.author.id;
  const authorId = item.author.id;

  const handleLike = async () => {
    if (isAuthor || liked === null || likeCount === null || isNotice) return;

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
    <Wrapper $isNotice={isNotice}>
      <CategoryText $type={isNotice ? "notice" : isGallery ? "gallery" : "board"}>
        {isNotice
          ? t("board.detail.notice") // 예: "공지"
          : isGallery
          ? t("board.detail.gallery") // 예: "갤러리"
          : t("board.detail.post") // 예: "게시글"
        }
      </CategoryText>

      <TitleText>
        {isNotice && (
          <NoticeBadge>
            {t("board.detail.notice")}
          </NoticeBadge>
        )}
        {item.title}
      </TitleText>

      <UserRow>
        <Profile
          src={profileImage || DEFAULT_PROFILE_IMG}
          alt={`${authorNickname}님의 프로필 이미지`}
          onClick={handleProfileClick}
          style={{ cursor: "pointer" }}
          onError={e => {
            if (e.currentTarget.src !== DEFAULT_PROFILE_IMG) {
              e.currentTarget.src = DEFAULT_PROFILE_IMG;
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
            {t("board.detail.date")} {dayjs(item.created_at).fromNow()} · {t("board.detail.view_count")} {item.views}
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
          {t("board.detail.more", {
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
            disabled={isAuthor || liked === null || isNotice}
            style={{
              opacity: isAuthor || liked === null || isNotice ? 0.5 : 1,
              cursor: isAuthor || liked === null || isNotice ? "not-allowed" : "pointer",
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