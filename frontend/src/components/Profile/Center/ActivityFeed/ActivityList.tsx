import React, { useEffect, useState, useMemo } from "react";
import {
  SectionTitle,
  LoadMoreButton,
  ToggleLine,
  Wrapper,
  EndText,
} from "./ActivityList.styled";
import { ChevronDown } from "lucide-react";
import type { Activity } from "../../../../types/activity";
import {
  getUserActivities
} from "../../../../api/profile";
import ActivityListAddCard from "./ActivityListAddCard";
import ActivityListDelCard from "./ActivityListDelCard";
import ActivityPostCard from "./ActivityPostCard";
import ActivityCommentCard from "./ActivityCommentCard";
import ActivityReviewAddCard from "./ActivityReviewAddCard";
import ActivityReviewDelCard from "./ActivityReviewDelCard";

export default function ActivityList({ userId }: { userId: number }) {
  const [activityList, setActivityList] = useState<Activity[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(`/api/profiles/${userId}/activity/?page=1`);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("list_add 활동", activityList.filter(a => a.type === "list_add"));
  }, [activityList]);

  const fetchActivities = async () => {
    if (!nextUrl || isLoading) return;
    setIsLoading(true);
    try {
      const res = await getUserActivities(nextUrl);
      setActivityList(prev => [...prev, ...res.results]);
      setNextUrl(res.next);
    } catch (err) {
      console.error("활동 목록 로딩 실패:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities(); // 첫 페이지만 자동 로딩
  }, []);

  // const filteredActivities = useMemo(() => {
  //   const seenComments = new Set<string>();
  //   return activityList.filter(item => {
  //     if (item.type !== "comment") return true;
  //     const key = item.post_title;
  //     if (seenComments.has(key)) return false;
  //     seenComments.add(key);
  //     return true;
  //   });
  // }, [activityList]);

  return (
    <Wrapper>
      <SectionTitle>내 활동</SectionTitle>

      {activityList.map((item) => {
        const commonProps = { key: item.id, created_at: item.created_at };
        switch (item.type) {
          case "anime_add":
            return <ActivityListAddCard {...commonProps} anime_title={item.anime_title} anime_img={item.anime_img} />;
          case "anime_remove":
            return <ActivityListDelCard {...commonProps} anime_title={item.anime_title} anime_img={item.anime_img} />;
          case "post":
            return (
              <ActivityPostCard
                {...commonProps}
                nickname={item.nickname}
                profile_image={item.profile_image}
                post_title={item.post_title}
                content={item.content}
                like_count={item.like_count}
                comment_count={item.comment_count}
                thumbnail={item.thumbnail}
              />
            );
          case "comment":
            return (
              <ActivityCommentCard
                {...commonProps}
                post_title={item.post_title}
                comment={item.comment}
                post_author_nickname={item.post_author_nickname}
                post_author_profile_image={item.post_author_profile_image}
                like_count={item.like_count}
                comment_count={item.comment_count}
                thumbnail={item.thumbnail}
              />
            );
          case "review_add":
            return <ActivityReviewAddCard {...commonProps} anime_title={item.anime_title} anime_img={item.anime_img} review={item.review} />;
          case "review_del":
            return <ActivityReviewDelCard {...commonProps} anime_title={item.anime_title} anime_img={item.anime_img} review={item.review} />;
          default:
            return null;
        }
      })}

      {nextUrl ? (
        <LoadMoreButton onClick={fetchActivities} disabled={isLoading}>
          <ToggleLine />
          <ChevronDown size={20} />
          <ToggleLine />
        </LoadMoreButton>
      ) : (
        <LoadMoreButton disabled>
          <ToggleLine />
          <EndText>더 이상 없음</EndText>
          <ToggleLine />
        </LoadMoreButton>
      )}
    </Wrapper>
  );
}
