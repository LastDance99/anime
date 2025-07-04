export interface BoardComment {
  id: number;
  post: number;
  content: string;
  parent_id: number | null;
  tagged_nickname?: string | null;
  is_deleted: boolean;
  created_at: string;
  like_count: number;
  liked: boolean;
  replies: BoardComment[];
  author_id: number;
  author_nickname: string;
  author_profile_image: string | null;
}