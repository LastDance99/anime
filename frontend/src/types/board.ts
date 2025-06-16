export interface BoardItem {
  id: number;
  category: string;
  board_type: string;
  title: string;
  content: string;
  views: number;
  comment_count: number;
  like_count: number;
  images: string[];
  created_at: string;
  updated_at?: string | null;
  author: {
    id: number;
    nickname: string;
    profile_image?: string;
  };
}