import React, { useState, useMemo } from "react";
import type { AnimeItem, AnimeReview } from "../../types/anime";
import { ANIME_REVIEWS } from "../../data/animeReviews";
import { Overlay, Modal, Content } from "./AnimeDetailModal.styled";
import Header from "./Header/Header";
import InfoSection from "./InfoSection/InfoSection";
import RatingSection from "./RatingSection/RatingSection";
import ReviewInputBox from "./ReviewInputBox/ReviewInputBox";
import ReviewList from "./ReviewList/ReviewList";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.locale("ko");

const MY_USER_ID = 1;

type Props = {
  anime: AnimeItem;
  onClose: () => void;
};

export default function AnimeDetailModal({ anime, onClose }: Props) {
  // --- 상태 관리
  const initialReviews = ANIME_REVIEWS.filter(r => r.anime_id === anime.id);
  const [reviews, setReviews] = useState<AnimeReview[]>(initialReviews);

  const [myRating, setMyRating] = useState(0);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState("");

  // ⭐ 추가: 리뷰 입력 상태
  const [reviewInput, setReviewInput] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  // 평균 평점
  const avgRating = useMemo(() =>
    reviews.length === 0 ? 0 : reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  , [reviews]);

  // 리뷰 등록
  const handleAddReview = (content: string, rating: number) => {
    const newReview: AnimeReview = {
      id: Date.now(),
      anime_id: anime.id,
      user: {
        id: MY_USER_ID,
        nickname: "임시유저",
        profile_image: "/images/default_profile.png",
      },
      rating,
      content,
      created_at: new Date().toISOString(),
    };
    setReviews(prev => [newReview, ...prev]);
    setMyRating(rating);
  };

  // 입력박스 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewInput(e.target.value);
  };
  const handleRatingChange = (val: number) => {
    setReviewRating(val);
  };
  const handleSubmitReview = () => {
    if (!reviewInput.trim() || reviewRating === 0) return;
    handleAddReview(reviewInput, reviewRating);
    setReviewInput("");
    setReviewRating(0);
  };

  // 리뷰 삭제
  const handleDelete = (id: number) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  // 리뷰 수정 시작
  const handleEditStart = (review: AnimeReview) => {
    setEditingReviewId(review.id);
    setEditedContent(review.content);
  };

  // 리뷰 수정 취소
  const handleEditCancel = () => {
    setEditingReviewId(null);
    setEditedContent("");
  };

  // 리뷰 수정 완료
  const handleEditSubmit = (id: number) => {
    if (!editedContent.trim()) return;
    setReviews(prev =>
      prev.map(r =>
        r.id === id ? { ...r, content: editedContent.trim(), created_at: new Date().toISOString() } : r
      )
    );
    setEditingReviewId(null);
    setEditedContent("");
  };

  // 내 평점 선택
  const handleChangeMyRating = (rating: number) => {
    setMyRating(rating);
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={e => e.stopPropagation()}>
        <Header image_url={anime.image_url} onClose={onClose} />
        <Content>
          <InfoSection anime={anime} />
          <RatingSection
            myRating={myRating}
            onChangeMyRating={handleChangeMyRating}
            avgRating={avgRating}
            listCount={reviews.length}
          />
          <ReviewInputBox
            value={reviewInput}
            onChange={handleInputChange}
            onSubmit={handleSubmitReview}
            rating={reviewRating}
            onRatingChange={handleRatingChange}
          />
          <ReviewList
            reviews={reviews}
            myUserId={MY_USER_ID}
            editingReviewId={editingReviewId}
            editedContent={editedContent}
            onEditStart={handleEditStart}
            onEditCancel={handleEditCancel}
            onEditSubmit={handleEditSubmit}
            setEditedContent={setEditedContent}
            onDelete={handleDelete}
          />
        </Content>
      </Modal>
    </Overlay>
  );
}