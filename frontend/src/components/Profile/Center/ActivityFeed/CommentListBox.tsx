import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useTranslation } from "react-i18next";
dayjs.extend(relativeTime);

import type { BoardComment } from "../../../../types/comment";
import {
  ListBox, CommentItem, Profile, CommentContent, Nickname,
  Text, CommentMeta, ReplyList, ReplyItem,
} from "./CommentListBox.styled";

// 답글(2뎁스) 렌더링
function RenderReplies(replies: BoardComment[], t: any) {
  return (
    <ReplyList>
      {replies.map((r) => (
        <ReplyItem key={r.id}>
          <Profile
            src={r.author_profile_image || "/images/default-profile.png"}
            alt={r.author_nickname}
          />
          <CommentContent>
            <Nickname>{r.author_nickname}</Nickname>
            <Text
              className={r.is_deleted ? "deleted" : ""}
              dangerouslySetInnerHTML={{
                __html: r.is_deleted ? t("comment.deleted") : r.content,
              }}
            />
            <CommentMeta>
              {dayjs(r.created_at).fromNow()}
            </CommentMeta>
          </CommentContent>
        </ReplyItem>
      ))}
    </ReplyList>
  );
}

type Props = { comments: BoardComment[] };

export default function CommentListBox({ comments }: Props) {
  const { t } = useTranslation();

  if (comments.length === 0) {
    return (
      <ListBox>
        <div style={{ padding: "28px", color: "#bbb", textAlign: "center" }}>
          {t("comment.no_comments")}
        </div>
      </ListBox>
    );
  }

  return (
    <ListBox>
      {comments.map((c) => (
        <CommentItem key={c.id}>
          <Profile
            src={c.author_profile_image || "/images/default-profile.png"}
            alt={c.author_nickname}
          />
          <CommentContent>
            <Nickname>{c.author_nickname}</Nickname>
            <Text
              className={c.is_deleted ? "deleted" : ""}
              dangerouslySetInnerHTML={{
                __html: c.is_deleted ? t("comment.deleted") : c.content,
              }}
            />
            <CommentMeta>
              {t("comment.like_count", { count: c.like_count })} | {dayjs(c.created_at).fromNow()}
            </CommentMeta>
            {c.replies.length > 0 && RenderReplies(c.replies, t)}
          </CommentContent>
        </CommentItem>
      ))}
    </ListBox>
  );
}