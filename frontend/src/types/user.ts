import type { Activity } from './activity';

export interface User {
  id: number;
  email: string;
  password: string;
  nickname: string;
  gender: string;
  profile_image: string;
  background_image: string;
  myroom_image: string;
  about: string;      // 자기소개(소개글)
  language: string;
  created_at: string; // ISO 문자열 (예: 2024-06-08T12:34:56Z)
  updated_at: string;
  point: number;      // 포인트
  postCount?: number; // 작성한 게시글 수
  commentCount?: number; // 작성한 댓글 수
  attendance?: number; // 출석일 수
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