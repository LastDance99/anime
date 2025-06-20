import React, { useState, useMemo } from "react";
import type { AnimeItem, AnimeReview } from "../../types/anime";
import { ANIME_REVIEWS } from "../../data/animeReviews";
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
dayjs.extend(relativeTime);
dayjs.locale("ko");

const MY_USER_ID = 1;

type Props = {
  anime: AnimeItem;
  onClose: () => void;
};

export default function AnimeDetailModal({ anime, onClose }: Props) {
  const initialReviews = ANIME_REVIEWS.filter(r => r.anime_id === anime.id);
  const [reviews, setReviews] = useState<AnimeReview[]>(initialReviews);

  const [myAnimeList, setMyAnimeList] = useState<AnimeItem[]>([]);
  const isAdded = myAnimeList.some(item => item.id === anime.id);

  const [addedUserCount, setAddedUserCount] = useState(0);

  const handleToggleList = () => {
    if (isAdded) {
      setMyAnimeList(prev => prev.filter(item => item.id !== anime.id));
      setAddedUserCount(prev => Math.max(prev - 1, 0));
    } else {
      setMyAnimeList(prev => [...prev, anime]);
      setAddedUserCount(prev => prev + 1);
    }
  };

  const [myRating, setMyRating] = useState(0);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [editedRating, setEditedRating] = useState(0);
  const [reviewInput, setReviewInput] = useState("");

  const avgRating = useMemo(
    () =>
      reviews.length === 0
        ? 0
        : reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length,
    [reviews]
  );

  const handleAddReview = (content: string) => {
    const newReview: AnimeReview = {
      id: Date.now(),
      anime_id: anime.id,
      user: {
        id: MY_USER_ID,
        nickname: "임시유저",
        profile_image: "/images/default_profile.png",
      },
      rating: myRating,
      content,
      created_at: new Date().toISOString(),
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewInput(e.target.value);
  };

  const handleSubmitReview = () => {
    if (!reviewInput.trim()) return;
    if (myRating === 0) {
      alert("먼저 평점을 선택해주세요.");
      return;
    }
    handleAddReview(reviewInput);
    setReviewInput("");
  };

  const handleDelete = (id: number) => {
    setReviews(prev => prev.filter(r => r.id !== id));
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

  const handleEditSubmit = (id: number) => {
    if (!editedContent.trim()) return;
    setReviews(prev =>
      prev.map(r =>
        r.id === id
          ? {
              ...r,
              content: editedContent.trim(),
              rating: editedRating,
              created_at: new Date().toISOString(),
            }
          : r
      )
    );
    setEditingReviewId(null);
    setEditedContent("");
    setEditedRating(0);
  };

  const handleChangeMyRating = (rating: number) => {
    setMyRating(rating);
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={e => e.stopPropagation()}>
        {/* ⭐️ 여기를 anime.banner_image로! */}
        <Header image_url={anime.banner_image} onClose={onClose} />
        <Content>
          <InfoSection
            anime={anime}
            onAddList={handleToggleList}
            isAdded={isAdded}
          />
          <RatingSection
            myRating={myRating}
            onChangeMyRating={handleChangeMyRating}
            avgRating={avgRating}
            listCount={addedUserCount}
          />

          <ReviewBoxGroup>
            <ReviewInputBox
              value={reviewInput}
              onChange={handleInputChange}
              onSubmit={handleSubmitReview}
            />
            <ReviewList
              reviews={reviews}
              myUserId={MY_USER_ID}
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