import React, { useState, useEffect, useMemo, useCallback } from "react";
import type { AnimeItem, AnimeReview } from "../../types/anime";
import {
  Overlay,
  Modal,
  Content,
  ReviewBoxGroup,
} from "./AnimeDetailModal.styled";
import Header from "./Header/Header";
import InfoSection from "./InfoSection/InfoSection";
import RatingSection from "./RatingSection/RatingSection";
import ReviewInputBox from "./ReviewInputBox/ReviewInputBox";
import ReviewList from "./ReviewList/ReviewList";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import {
  getAnimeReviews,
  addAnimeReview,
  updateAnimeReview,
  deleteAnimeReview,
} from "../../api/anime";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type Props = {
  anime: AnimeItem & { isAdded?: boolean; added_count?: number }; // added_count 추가
  onClose: () => void;
  isAdded: boolean;
  onToggle: () => void;
  user: {
    id: number | string;
    nickname: string;
    profile_image?: string;
  };
  onDelete?: () => void;
};

export default function AnimeDetailModal({
  anime,
  onClose,
  isAdded,
  onToggle,
  user,
  onDelete,
}: Props) {
  const myUserId = Number(user.id);
  const [reviews, setReviews] = useState<AnimeReview[]>([]);
  const [myRating, setMyRating] = useState(0);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [editedRating, setEditedRating] = useState(0);
  const [reviewInput, setReviewInput] = useState("");
  const [hasMyReview, setHasMyReview] = useState(false);

  // 평균 평점 계산
  const avgRating = useMemo(
    () =>
      reviews.length === 0
        ? 0
        : reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length,
    [reviews]
  );

  // 내 리뷰 찾기
  function findMyReview(reviews: AnimeReview[]) {
    for (const r of reviews) {
      if (Number(r.user?.id) === myUserId) return r;
    }
    return null;
  }

  // **fetchReviews 함수로 따로 빼서 재사용**
  const fetchReviews = useCallback(async () => {
    try {
      const data = await getAnimeReviews(anime.id);
      setReviews(data.results);
      const myReview = findMyReview(data.results);
      if (myReview) {
        setMyRating(myReview.rating);
        setHasMyReview(true);
      } else {
        setMyRating(0);
        setHasMyReview(false);
      }
    } catch (err) {
      setReviews([]);
      setMyRating(0);
      setHasMyReview(false);
    }
  }, [anime.id, myUserId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // 리뷰 등록
  const handleAddReview = async (content: string) => {
    const rating = parseInt(String(myRating), 10);

    if (!content.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }
    if (isNaN(rating) || rating < 1 || rating > 5) {
      alert("별점을 1~5 사이로 선택해주세요.");
      return;
    }
    if (hasMyReview) {
      alert("이미 리뷰를 작성하셨습니다.");
      return;
    }

    try {
      await addAnimeReview(anime.id, { content, rating });
      setReviewInput("");
      // 성공시 서버 동기화 (최신 데이터 fetch)
      fetchReviews();
    } catch (err: any) {
      const message = err.response?.data || err.message || "알 수 없는 오류";
      alert("리뷰 작성 실패:\n" + JSON.stringify(message, null, 2));
    }
  };

  // 리뷰 등록 버튼
  const handleSubmitReview = async () => {
    if (!reviewInput.trim()) {
      alert("내용을 입력하세요.");
      return;
    }
    if (myRating === 0) {
      alert("먼저 평점을 선택해주세요.");
      return;
    }
    await handleAddReview(reviewInput);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewInput(e.target.value);
  };

  // 리뷰 삭제
  const handleDelete = async (id: number) => {
    try {
      await deleteAnimeReview(anime.id, id);
      // 성공시 서버 동기화
      fetchReviews();
    } catch (err) {
      console.error("리뷰 삭제 실패:", err);
    }
  };

  // 리뷰 수정
  const handleEditStart = (review: AnimeReview) => {
    setEditingReviewId(review.id);
    setEditedContent(review.content);
    setEditedRating(review.rating);
  };

  const handleEditCancel = () => {
    setEditingReviewId(null);
    setEditedContent("");
    setEditedRating(0);
  };

  const handleEditSubmit = async (id: number) => {
    if (!editedContent.trim()) {
      alert("수정할 내용을 입력하세요.");
      return;
    }
    try {
      await updateAnimeReview(anime.id, id, {
        content: editedContent.trim(),
        rating: editedRating,
      });
      setEditingReviewId(null);
      setEditedContent("");
      setEditedRating(0);
      // 내 리뷰 수정시 서버 동기화
      fetchReviews();
    } catch (err) {
      console.error("리뷰 수정 실패:", err);
    }
  };

  // 별점 변경은 내 리뷰 없는 상태(작성 전)에만 허용
  const handleChangeMyRating = (rating: number) => {
    if (!hasMyReview) setMyRating(rating);
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header image_url={anime.banner_image} onClose={onClose} />
        <Content>
          <InfoSection
            anime={anime}
            onAddList={onToggle}
            isAdded={anime.isAdded ?? isAdded}
            onDelete={onDelete}
          />
          <RatingSection
            myRating={myRating}
            onChangeMyRating={handleChangeMyRating}
            avgRating={avgRating}
            // **진짜 '내 리스트 추가된 수' 필드 사용!**
            listCount={anime.total_animelist_users ?? 0}
          />
          <ReviewBoxGroup>
            {!hasMyReview && (
              <ReviewInputBox
                value={reviewInput}
                onChange={handleInputChange}
                onSubmit={handleSubmitReview}
              />
            )}
            <ReviewList
              animeId={anime.id}
              reviews={reviews}
              myUserId={myUserId}
              editingReviewId={editingReviewId}
              editedContent={editedContent}
              editedRating={editedRating}
              onEditStart={handleEditStart}
              onEditCancel={handleEditCancel}
              onEditSubmit={handleEditSubmit}
              setEditedContent={setEditedContent}
              setEditedRating={setEditedRating}
              onDelete={handleDelete}
            />
          </ReviewBoxGroup>
        </Content>
      </Modal>
    </Overlay>
  );
}