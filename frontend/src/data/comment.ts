import type { BoardComment } from "../types/comment";

export const dummyComments: BoardComment[] = [
  {
    id: 1,
    post_id: 1,
    content: "킴카사디안 님 글 잘 읽었습니다! 많은 도움이 됐어요.",
    is_deleted: false,
    created_at: "2025-06-16T09:00:00Z",
    like_count: 5,
    liked: false,
    author: {
      id: 2,
      nickname: "이개발",
      profile_image: "/images/eximg.gif",
    }
  },
  {
    id: 2,
    post_id: 1,
    content: "이개발 > 맞아요 ㅋㅋ 저도 공감했어요!",
    tagged_nickname: "이개발",
    is_deleted: false,
    created_at: "2025-06-16T09:15:00Z",
    like_count: 2,
    liked: true,
    author: {
      id: 3,
      nickname: "파쿠만",
      profile_image: "/images/eximg.gif",
    }
  },
];