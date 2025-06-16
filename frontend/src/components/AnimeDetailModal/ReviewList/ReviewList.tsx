import React, { useState, useMemo } from "react";
import type { AnimeReview } from "../../../types/anime";
import {
  List,
  Item,
  Reviewer,
  Meta,
  Content,
  EditBtn,
  DeleteBtn,
  SortTabGroup,
  SortTab,
} from "./ReviewList.styled";
import dayjs from "dayjs";

type Props = {
  reviews: AnimeReview[];
  myUserId: number;
  editingReviewId: number | null;
  editedContent: string;
  onEditStart: (review: AnimeReview) => void;
  onEditCancel: () => void;
  onEditSubmit: (reviewId: number) => void;
  setEditedContent: (val: string) => void;
  onDelete: (reviewId: number) => void;
};

export default function ReviewList({
  reviews,
  myUserId,
  editingReviewId,
  editedContent,
  onEditStart,
  onEditCancel,
  onEditSubmit,
  setEditedContent,
  onDelete,
}: Props) {
  const [sortType, setSortType] = useState<"latest" | "high" | "low">("latest");

  const sortedReviews = useMemo(() => {
    return [...reviews].sort((a, b) => {
      if (sortType === "latest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (sortType === "high") return b.rating - a.rating;
      if (sortType === "low") return a.rating - b.rating;
      return 0;
    });
  }, [reviews, sortType]);

  if (reviews.length === 0)
    return <List style={{ padding: "32px 0", color: "#aaa" }}>아직 등록된 리뷰가 없습니다.</List>;

  return (
    <>
      <SortTabGroup>
        <SortTab selected={sortType === "latest"} onClick={() => setSortType("latest")}>최신순</SortTab>
        <SortTab selected={sortType === "high"} onClick={() => setSortType("high")}>별점 높은순</SortTab>
        <SortTab selected={sortType === "low"} onClick={() => setSortType("low")}>별점 낮은순</SortTab>
      </SortTabGroup>
      <List>
        {sortedReviews.map((r) => {
          const isEditing = editingReviewId === r.id;
          const isMyReview = r.user.id === myUserId;
          return (
            <Item key={r.id}>
              <Reviewer>
                {r.user.profile_image && (
                  <img
                    src={r.user.profile_image}
                    alt="유저"
                    width={22}
                    height={22}
                    style={{ borderRadius: "50%", marginRight: 7 }}
                  />
                )}
                <span>{r.user.nickname}</span>
              </Reviewer>
              <Meta>
                <span style={{ color: "#FFCB45", fontWeight: 700 }}>★ {r.rating}</span>
                <span style={{ marginLeft: 10, color: "#bbb", fontSize: 13 }}>
                  {dayjs(r.created_at).format("YYYY.MM.DD HH:mm")}
                </span>
                {isMyReview && !isEditing && (
                  <>
                    <EditBtn onClick={() => onEditStart(r)}>수정</EditBtn>
                    <DeleteBtn onClick={() => onDelete(r.id)}>삭제</DeleteBtn>
                  </>
                )}
              </Meta>
              {isEditing ? (
                <>
                  <textarea
                    value={editedContent}
                    onChange={e => setEditedContent(e.target.value)}
                    rows={3}
                    style={{ width: "100%", margin: "6px 0" }}
                  />
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => onEditSubmit(r.id)}>완료</button>
                    <button onClick={onEditCancel}>취소</button>
                  </div>
                </>
              ) : (
                <Content>{r.content}</Content>
              )}
            </Item>
          );
        })}
      </List>
    </>
  );
}