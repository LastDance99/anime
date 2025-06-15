import type { Comment } from "../types/comment";

export const dummyComments: Comment[] = [
  {
    id: 1,
    postId: 1,
    authorId: 2,
    nickname: "이개발",
    profileImage: "/images/eximg.gif",
    content: "킴카사디안 님 글 잘 읽었습니다! 많은 도움이 됐어요.",
    createdAt: "2025-06-16T09:00:00Z",
    isDeleted: false,
    likeCount: 5,
    liked: false,
  },
  {
    id: 2,
    postId: 1,
    authorId: 3,
    nickname: "파쿠만",
    profileImage: "/images/eximg.gif",
    content: "이개발 > 맞아요 ㅋㅋ 저도 공감했어요!",
    taggedNickname: "이개발",
    createdAt: "2025-06-16T09:15:00Z",
    isDeleted: false,
    likeCount: 2,
    liked: true,
  },
];