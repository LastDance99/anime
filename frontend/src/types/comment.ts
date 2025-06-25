export interface BoardComment {
  id: number;
  post: number; // post_id → post (백엔드 실제 필드 확인)
  content: string;
  parent_id?: number | null;
  tagged_nickname?: string;
  is_deleted: boolean;
  created_at: string;
  like_count: number;
  liked?: boolean; // 로그인유저가 좋아요 눌렀는지
  replies?: BoardComment[];
  // ↓ 이 두 줄 반드시 추가!
  author_nickname: string;
  author_profile_image: string;
}