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
dayjs.extend(relativeTime);

type Props = {
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

const SORT_OPTIONS = [
  { label: "최신순", value: "latest" },
  { label: "오래된순", value: "oldest" },
  { label: "따봉순", value: "like" },
];

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

function initializeLikes(reviews: AnimeReview[], myUserId: number) {
  return reviews.reduce((acc, review) => {
    acc[review.id] = { count: 0, liked: false };
    return acc;
  }, {} as Record<number, { count: number; liked: boolean }>);
}

export default function ReviewList({
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
  const [likes, setLikes] = useState<Record<number, { count: number; liked: boolean }>>(
    () => initializeLikes(reviews, myUserId)
  );

  const [sortType, setSortType] = useState<"latest" | "oldest" | "like">("latest");

  const [animatedRating, setAnimatedRating] = useState(editedRating);

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

  const handleToggleLike = (reviewId: number) => {
    setLikes(prev => {
      const prevData = prev[reviewId] || { count: 0, liked: false };
      return {
        ...prev,
        [reviewId]: {
          count: prevData.liked ? prevData.count - 1 : prevData.count + 1,
          liked: !prevData.liked,
        },
      };
    });
  };

  const sortedReviews = useMemo(() => {
    let arr = [...reviews];
    if (sortType === "latest") arr.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    else if (sortType === "oldest") arr.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    else if (sortType === "like") arr.sort((a, b) => (likes[b.id]?.count || 0) - (likes[a.id]?.count || 0));
    return arr;
  }, [reviews, sortType, likes]);

  return (
    <>
      <ReviewTopBar>
        <ReviewCount>리뷰 <b>({reviews.length === 0 ? "---" : reviews.length})</b></ReviewCount>
        <SortSelectBox>
          <SortSelect value={sortType} onChange={e => setSortType(e.target.value as any)}>
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </SortSelect>
        </SortSelectBox>
      </ReviewTopBar>
      {reviews.length === 0 ? (
        <List style={{ padding: "32px 0", color: "#aaa" }}>아직 등록된 리뷰가 없습니다.</List>
      ) : (
        <List>
          {sortedReviews.map((r) => {
            const isEditing = editingReviewId === r.id;
            const isMyReview = r.user.id === myUserId;
            const { count, liked } = likes[r.id] || { count: 0, liked: false };
            return (
              <Item key={r.id}>
                <ReviewRow>
                  {r.user.profile_image && <ReviewerImg src={r.user.profile_image} alt="유저" />}
                  <ReviewerInfo>
                    <ReviewerName>{r.user.nickname}</ReviewerName>
                    <RatingStars>{renderStars(r.rating)}</RatingStars>
                    <ReviewTime>{dayjs(r.created_at).fromNow()}</ReviewTime>
                    {isMyReview && !isEditing && (
                      <>
                        <EditBtn onClick={() => onEditStart(r)}>수정</EditBtn>
                        <DeleteBtn onClick={() => onDelete(r.id)}>삭제</DeleteBtn>
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
                      <span style={{ fontSize: 14 }}>수정할 별점:</span>
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
                                display: "inline-block",
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
                      <EditBtn as="button" onClick={() => onEditSubmit(r.id)}>완료</EditBtn>
                      <DeleteBtn as="button" onClick={onEditCancel}>취소</DeleteBtn>
                    </div>
                  </>
                ) : (
                  <Content>{r.content}</Content>
                )}
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: 4 }}>
                  <LikeBtn onClick={() => handleToggleLike(r.id)}>
                    <ThumbsUp
                      size={16}
                      color={liked ? "#ED7CB8" : "#F8A0BC"}
                      fill={liked ? "#F8A0BC" : "none"}
                      style={{ verticalAlign: "middle", transition: "color 0.18s, fill 0.18s" }}
                    />
                    <LikeCount style={{ color: liked ? "#ed7cb8" : "#bbb" }}>{count === 0 ? "0" : count}</LikeCount>
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
