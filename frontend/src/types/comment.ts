export interface BoardComment {
  id: number;
  post_id: number;
  content: string;
  parent_id?: number;
  tagged_nickname?: string;
  is_deleted: boolean;
  created_at: string;
  author: {
    id: number;
    nickname: string;
    profile_image?: string;
  };
  like_count: number;
  liked?: boolean; // 로그인유저가 좋아요 눌렀는지
}