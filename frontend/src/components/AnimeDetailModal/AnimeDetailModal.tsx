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
import CharactersInfo from "./CharactersInfo/CharactersInfo";
import { useTranslation } from "react-i18next";

import {
  getAnimeReviews,
  addAnimeReview,
  updateAnimeReview,
  deleteAnimeReview,
} from "../../api/anime";

interface Props {
  anime: AnimeItem & { isAdded?: boolean; added_count?: number };
  onClose: () => void;
  isAdded: boolean;
  onToggle: () => void;
  user: {
    id: number | string;
    nickname: string;
    profile_image?: string;
  };
  onDelete?: () => void;
}

export default function AnimeDetailModal({
  anime,
  onClose,
  isAdded,
  onToggle,
  user,
  onDelete,
}: Props) {
  const { t } = useTranslation();
  const myUserId = Number(user.id);
  const [reviews, setReviews] = useState<AnimeReview[]>([]);
  const [myRating, setMyRating] = useState(0);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [editedRating, setEditedRating] = useState(0);
  const [reviewInput, setReviewInput] = useState("");
  const [hasMyReview, setHasMyReview] = useState(false);

  const avgRating = useMemo(
    () =>
      reviews.length === 0
        ? 0
        : reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length,
    [reviews]
  );

  const findMyReview = (reviews: AnimeReview[]) => {
    return reviews.find((r) => Number(r.user?.id) === myUserId) || null;
  };

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
    } catch {
      setReviews([]);
      setMyRating(0);
      setHasMyReview(false);
    }
  }, [anime.id, myUserId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleAddReview = async (content: string) => {
    const rating = parseInt(String(myRating), 10);
    if (!content.trim()) {
      alert(t("review.error.no_content"));
      return;
    }
    if (isNaN(rating) || rating < 1 || rating > 5) {
      alert(t("review.error.invalid_rating"));
      return;
    }
    if (hasMyReview) {
      alert(t("review.error.already"));
      return;
    }
    try {
      await addAnimeReview(anime.id, { content, rating });
      setReviewInput("");
      fetchReviews();
    } catch (err: any) {
      const message = err.response?.data || err.message || "Unknown Error";
      alert(t("review.error.submit") + "\n" + JSON.stringify(message, null, 2));
    }
  };

  const handleSubmitReview = async () => {
    if (!reviewInput.trim()) {
      alert(t("review.error.no_content"));
      return;
    }
    if (myRating === 0) {
      alert(t("review.error.no_rating"));
      return;
    }
    await handleAddReview(reviewInput);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewInput(e.target.value);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAnimeReview(anime.id, id);
      fetchReviews();
    } catch (err) {
      console.error("리뷰 삭제 실패:", err);
    }
  };

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
      alert(t("review.error.no_content"));
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
      fetchReviews();
    } catch (err) {
      console.error("리뷰 수정 실패:", err);
    }
  };

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
          {anime.characters && anime.characters.length > 0 && (
            <CharactersInfo characters={anime.characters} />
          )}
          <RatingSection
            myRating={myRating}
            onChangeMyRating={handleChangeMyRating}
            avgRating={avgRating}
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