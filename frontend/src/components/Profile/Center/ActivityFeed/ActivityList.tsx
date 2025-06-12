import React, { useState } from "react";
import ActivityListAddCard from "./ActivityListAddCard";
import ActivityListDelCard from "./ActivityListDelCard";
import ActivityPostCard from "./ActivityPostCard";
import ActivityCommentCard from "./ActivityCommentCard";
import ActivityReviewAddCard from "./ActivityReviewAddCard";
import ActivityReviewDelCard from "./ActivityReviewDelCard";
import type { Activity } from "../../../../types/activity";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { SectionTitle, LoadMoreButton, ToggleLine } from "./ActivityList.styled";

dayjs.extend(relativeTime);
dayjs.locale("ko");


export default function ActivityList({ list }: { list: Activity[] }) {
  // 20개씩 보여줄 개수 상태
  const [visibleCount, setVisibleCount] = useState(20);

  // 보여줄 리스트만 잘라내기
  const visibleList = list.slice(0, visibleCount);

  // 더보기 버튼 조건
  const showLoadMore = list.length > visibleCount;

  const handleLoadMore = () => setVisibleCount((prev) => prev + 20);

  return (
    <div>
      <SectionTitle>내 활동</SectionTitle>
      {visibleList.map(item => {
        switch(item.type) {
          case "list_add":   return <ActivityListAddCard {...item} key={item.id} />;
          case "list_del":   return <ActivityListDelCard {...item} key={item.id} />;
          case "post":       return <ActivityPostCard {...item} key={item.id} />;
          case "comment":    return <ActivityCommentCard {...item} key={item.id} />;
          case "review_add": return <ActivityReviewAddCard {...item} key={item.id} />;
          case "review_del": return <ActivityReviewDelCard {...item} key={item.id} />;
          default:           return null;
        }
      })}
      {/* 더보기 버튼은 조건일 때만 노출 */}
      {showLoadMore && (
        <LoadMoreButton onClick={handleLoadMore} aria-label="더보기">
          <ToggleLine className="toggle-line" />
          {/* 아래 화살표 */}
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <polyline points="5,8 10,13 15,8" stroke="#d75a85" strokeWidth="2.1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <ToggleLine className="toggle-line" />
        </LoadMoreButton>
      )}
    </div>
  );
}
