import React, { useState, useEffect, useMemo } from "react";
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
  rateAnime,
} from "../../api/anime";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type Props = {
  anime: AnimeItem & { isAdded?: boolean };
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

  // 내 리뷰 찾기 디버그 함수
  function findMyReview(reviews: AnimeReview[]) {
    for (const r of reviews) {
      const reviewUserId = Number(r.user?.id);
      // 디버깅 로그
      console.log("[DEBUG] reviewUserId:", reviewUserId, "myUserId:", myUserId, "user=", r.user);
      if (reviewUserId === myUserId) return r;
    }
    return null;
  }

  // 리뷰 fetch, 내 리뷰 판별
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAnimeReviews(anime.id);
        setReviews(data.results);

        // 내 리뷰 찾기 디버깅
        const myReview = findMyReview(data.results);
        if (myReview) {
          console.log("[DEBUG] 내 리뷰 발견! 평점:", myReview.rating, "닉네임:", myReview.user?.nickname);
          setMyRating(myReview.rating);
          setHasMyReview(true);
        } else {
          console.log("[DEBUG] 내 리뷰 없음, 평점 0으로 초기화");
          setMyRating(0);
          setHasMyReview(false);
        }
      } catch (err) {
        console.error("리뷰 불러오기 실패:", err);
        setReviews([]);
        setMyRating(0);
        setHasMyReview(false);
      }
    };
    fetchReviews();
  }, [anime.id, myUserId]);

  // 리뷰 등록 (리뷰 user 필드 보정 및 로그)
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
      const newReview = await addAnimeReview(anime.id, {
        content,
        rating,
      });

      // user 필드 없으면 직접 내 user 정보로 보정!
      if (!newReview.user) {
        console.warn("[DEBUG] newReview.user가 undefined! 직접 user 할당", user);
        newReview.user = { ...user, id: myUserId };
      }
      // user id 타입이 이상하면 강제 변환
      newReview.user.id = Number(newReview.user.id);

      setReviews((prev) => [newReview, ...prev]);
      setHasMyReview(true);
      setMyRating(newReview.rating);
      setReviewInput("");
      console.log("[DEBUG] 리뷰 등록 후, 내 평점:", newReview.rating, "닉네임:", newReview.user.nickname);
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

  // 리뷰 삭제 (성공시만 상태 변경)
  const handleDelete = async (id: number) => {
    try {
      await deleteAnimeReview(anime.id, id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
      // 내 리뷰 삭제시 상태 초기화
      const deleted = reviews.find((r) => r.id === id);
      if (Number(deleted?.user?.id) === myUserId) {
        setHasMyReview(false);
        setMyRating(0);
      }
      console.log("[DEBUG] 리뷰 삭제, id:", id, "내 id:", myUserId);
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
      const updated = await updateAnimeReview(anime.id, id, {
        content: editedContent.trim(),
        rating: editedRating,
      });
      // user 정보 보정
      if (!updated.user) updated.user = { ...user, id: myUserId };
      updated.user.id = Number(updated.user.id);

      setReviews((prev) => prev.map((r) => (r.id === id ? updated : r)));
      setEditingReviewId(null);
      setEditedContent("");
      setEditedRating(0);
      // 내 리뷰 수정시 평점 반영
      if (Number(updated.user?.id) === myUserId) setMyRating(updated.rating);

      console.log("[DEBUG] 리뷰 수정 완료, 내 평점:", updated.rating);
    } catch (err) {
      console.error("리뷰 수정 실패:", err);
    }
  };

  // 별점 변경은 내 리뷰 없는 상태(작성 전)에만 허용, 별점만 등록하고 싶으면 여기서 따로 처리
  const handleChangeMyRating = (rating: number) => {
    // 별점만 등록, 리뷰 없는 상태면 임시로 상태만 변경(입력 UX 개선용)
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
            listCount={reviews.length}
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