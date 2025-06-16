import type { Activity } from './activity';

export interface User {
  id: number;
  email: string;
  nickname: string;
  gender?: string;
  profile_image?: string;
  background_image?: string;
  myroom_image?: string;
  about?: string;
  language?: string;
  created_at: string;
  updated_at?: string;
  point?: number; // 실제로 필요하면 백엔드에 요청
  postCount?: number;
  commentCount?: number;
  attendance?: number;
  activity?: Activity[];
}

export interface ProfileComment {
  id: number;
  user_id: number;    // 프로필 주인
  author_id: number;  // 댓글 단 사람
  content: string;
  created_at: string;
  author?: User;
}

export interface ProfileCardProps {
  user: User;
}