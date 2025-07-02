import React, { useState, useMemo, useEffect } from "react";
import type { AnimeReview } from "../../../types/anime";
import {
  List,
  Item,
  Content,
  EditBtn,
  DeleteBtn,
  ReviewTopBar,
  ReviewCount,
  LikeBtn,
  LikeCount,
  SortSelectBox,
  SortSelect,
  ReviewRow,
  ReviewerImg,
  ReviewerInfo,
  ReviewerName,
  RatingStars,
  ReviewTime,
} from "./ReviewList.styled";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Star as StarFull, StarHalf, ThumbsUp } from "lucide-react";
import { likeAnimeReview } from "../../../api/anime";
import { useTranslation } from "react-i18next";

dayjs.extend(relativeTime);

function renderStars(score: number) {
  return Array.from({ length: 5 }).map((_, i) => {
    const leftVal = i + 1;
    const rightVal = i + 1;
    if (score >= rightVal) {
      return <StarFull key={i} fill="#F8A0BC" width={20} height={20} strokeWidth={2.2} />;
    } else if (score >= leftVal) {
      return <StarHalf key={i} fill="#F8A0BC" width={20} height={20} strokeWidth={2.2} />;
    } else {
      return <StarFull key={i} fill="#fff" width={20} height={20} strokeWidth={2.2} />;
    }
  });
}

function getLikesFromReviews(reviews: AnimeReview[]) {
  const obj: Record<number, { count: number; liked: boolean }> = {};
  reviews.forEach((review) => {
    if (review && typeof review.id === "number") {
      obj[review.id] = {
        count: review.like_count ?? 0,
        liked: review.liked_by_user ?? review.is_liked_by_me ?? false,
      };
    }
  });
  return obj;
}

type Props = {
  animeId: number;
  reviews: AnimeReview[];
  myUserId: number;
  editingReviewId: number | null;
  editedContent: string;
  editedRating: number;
  onEditStart: (review: AnimeReview) => void;
  onEditCancel: () => void;
  onEditSubmit: (reviewId: number) => void;
  setEditedContent: (val: string) => void;
  setEditedRating: (value: number) => void;
  onDelete: (reviewId: number) => void;
};

export default function ReviewList({
  animeId,
  reviews,
  myUserId,
  editingReviewId,
  editedContent,
  editedRating,
  onEditStart,
  onEditCancel,
  onEditSubmit,
  setEditedContent,
  setEditedRating,
  onDelete,
}: Props) {
  const { t } = useTranslation();
  const [sortType, setSortType] = useState<"latest" | "oldest" | "like">("latest");
  const [animatedRating, setAnimatedRating] = useState(editedRating);
  const [likes, setLikes] = useState(() => getLikesFromReviews(reviews));

  const SORT_OPTIONS = [
    { label: t("review.sort_latest"), value: "latest" },
    { label: t("review.sort_oldest"), value: "oldest" },
    { label: t("review.sort_like"), value: "like" },
  ];

  useEffect(() => {
    setLikes(getLikesFromReviews(reviews));
  }, [reviews]);

  useEffect(() => {
    let frame: number;
    const duration = 300;
    const start = performance.now();
    const from = animatedRating;
    const to = editedRating;

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = from + (to - from) * progress;
      setAnimatedRating(parseFloat(value.toFixed(2)));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [editedRating]);

  const handleToggleLike = async (reviewId: number) => {
    try {
      const updated = await likeAnimeReview(animeId, reviewId);
      setLikes((prev) => ({
        ...prev,
        [reviewId]: {
          count: updated.like_count,
          liked: updated.liked_by_user,
        },
      }));
    } catch (err: any) {
      console.error("🛑 likeAnimeReview error:", err.response?.data || err.message);
    }
  };

  const sortedReviews = useMemo(() => {
    const filtered = reviews.filter((r): r is AnimeReview => !!r && typeof r.id === "number");
    const myReview = filtered.find(r => r.user?.id === myUserId);
    const others = filtered.filter(r => r.user?.id !== myUserId);

    let sorted = [...others];
    if (sortType === "latest")
      sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    if (sortType === "oldest")
      sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    if (sortType === "like")
      sorted.sort((a, b) => (likes[b.id]?.count || 0) - (likes[a.id]?.count || 0));

    return myReview ? [myReview, ...sorted] : sorted;
  }, [reviews, sortType, likes, myUserId]);

  return (
    <>
      <ReviewTopBar>
        <ReviewCount>
          {reviews.length === 0
            ? t("review.count_empty")
            : t("review.count", { count: reviews.length })}
        </ReviewCount>
        <SortSelectBox>
          <SortSelect value={sortType} onChange={e => setSortType(e.target.value as any)}>
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </SortSelect>
        </SortSelectBox>
      </ReviewTopBar>

      {sortedReviews.length === 0 ? (
        <List style={{ padding: "32px 0", color: "#aaa" }}>{t("review.empty")}</List>
      ) : (
        <List>
          {sortedReviews.map((r) => {
            const isEditing = editingReviewId === r.id;
            const isMyReview = r.user?.id === myUserId;
            const { count, liked } = likes[r.id] || { count: 0, liked: false };

            return (
              <Item key={r.id}>
                <ReviewRow>
                  {r.user?.profile_image && <ReviewerImg src={r.user.profile_image} alt="유저" />}
                  <ReviewerInfo>
                    <ReviewerName>{r.user?.nickname || t("common.unknown")}</ReviewerName>
                    <RatingStars>{renderStars(r.rating)}</RatingStars>
                    <ReviewTime>{dayjs(r.created_at).fromNow()}</ReviewTime>
                    {isMyReview && !isEditing && (
                      <>
                        <EditBtn onClick={() => onEditStart(r)}>{t("common.edit")}</EditBtn>
                        <DeleteBtn onClick={() => {
                          if (window.confirm(t("review.confirm_delete"))) {
                            onDelete(r.id);
                          }
                        }}>
                          {t("common.delete")}
                        </DeleteBtn>
                      </>
                    )}
                  </ReviewerInfo>
                </ReviewRow>

                {isEditing ? (
                  <>
                    <textarea
                      value={editedContent}
                      onChange={e => setEditedContent(e.target.value)}
                      rows={3}
                      style={{ width: "100%", margin: "6px 0", borderRadius: 6, border: "1px solid #F8A0BC", padding: 8, resize: "vertical" }}
                    />
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <span style={{ fontSize: 14 }}>{t("review.edit_rating")}</span>
                      <span style={{ fontWeight: 600, fontSize: 15, marginRight: 6 }}>{animatedRating.toFixed(1)}</span>
                      <RatingStars>
                        {[1, 2, 3, 4, 5].map(i => {
                          const isActive = i <= editedRating;
                          return (
                            <span
                              key={i}
                              onClick={() => setEditedRating(i)}
                              style={{
                                cursor: "pointer",
                                transform: isActive ? "scale(1.15)" : "scale(1)",
                                filter: isActive ? "drop-shadow(0 0 6px #f8a0bc55)" : "none",
                                transition: "transform 0.18s ease, filter 0.18s",
                                marginRight: 1,
                              }}
                            >
                              <StarFull
                                fill={isActive ? "#F8A0BC" : "#fff"}
                                stroke="#F8A0BC"
                                width={20}
                                height={20}
                                strokeWidth={2.2}
                              />
                            </span>
                          );
                        })}
                      </RatingStars>
                      <EditBtn
                        as="button"
                        onClick={() => {
                          if (window.confirm(t("review.confirm_edit"))) {
                            onEditSubmit(r.id);
                          }
                        }}
                      >
                        {t("common.done")}
                      </EditBtn>
                      <DeleteBtn 
                        as="button"
                        onClick={() => {
                          if (window.confirm(t("review.confirm_cancel"))) {
                            onEditCancel();
                          }
                        }}
                      >
                        {t("common.cancel")}
                      </DeleteBtn>
                    </div>
                  </>
                ) : (
                  <Content>{r.content}</Content>
                )}

                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: 4 }}>
                  <LikeBtn
                    onClick={() => !isMyReview && handleToggleLike(r.id)}
                    style={{
                      cursor: isMyReview ? "not-allowed" : "pointer",
                      opacity: isMyReview ? 0.4 : 1,
                    }}
                    title={isMyReview ? t("review.like_disabled") : t("review.like_hint")}
                  >
                    <ThumbsUp
                      size={16}
                      color={liked ? "#ED7CB8" : "#F8A0BC"}
                      fill={liked ? "#F8A0BC" : "none"}
                      style={{ verticalAlign: "middle", transition: "color 0.18s, fill 0.18s" }}
                    />
                    <LikeCount style={{ color: liked ? "#ed7cb8" : "#bbb" }}>
                      {count === 0 ? "0" : count}
                    </LikeCount>
                  </LikeBtn>
                </div>
              </Item>
            );
          })}
        </List>
      )}
    </>
  );
}