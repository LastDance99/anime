import type { User } from "../types/user";

export const mockUsers: User[] = [
  {
    avatar: "/images/eximg.gif",
    name: "킴카사디안",
    email: "kim@example.com",
    likes: 345,
    intro: "코딩 좋아요!",
    points: 1024,
  },
  {
    avatar: "/images/eximg.gif",
    name: "이개발",
    email: "lee@example.com",
    likes: 199,
    intro: "프론트엔드 개발자입니다.",
    points: 2048,
  },
  // ...원하는 만큼 추가
];