import type { AnimeReview } from '../types/anime'

export const ANIME_REVIEWS: AnimeReview[] = [
  {
    id: 1,
    anime_id: 1,
    user: {
      id: 3,
      nickname: "냥타입",
      profile_image: "/images/user1.png"
    },
    rating: 4.5,
    content: "이 애니 정말 잘 만들었어요! 세계관 몰입감 최고.",
    created_at: "2025-06-16T12:00:00Z"
  },
  {
    id: 2,
    anime_id: 1,
    user: {
      id: 1,
      nickname: "파랑곰",
      profile_image: "/images/user2.png"
    },
    rating: 5.0,
    content: "진짜 인생 애니... 이건 봐야 합니다.",
    created_at: "2025-06-17T09:30:00Z"
  },
  {
    id: 3,
    anime_id: 1,
    user: {
      id: 2,
      nickname: "우즈마끼",
      profile_image: "/images/user3.png"
    },
    rating: 4.0,
    content: "나루토 성장 보는 재미가 있죠.",
    created_at: "2025-06-14T22:45:00Z"
  }
];