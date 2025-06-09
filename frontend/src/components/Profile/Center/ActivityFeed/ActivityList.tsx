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
import { SectionTitle } from "./ActivityList.styled";

dayjs.extend(relativeTime);
dayjs.locale("ko");


export default function ActivityList({ list }: { list: Activity[] }) {
  return (
    <div>
      <SectionTitle>내 활동</SectionTitle>
      {list.map(item => {
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
    </div>
  );
}
