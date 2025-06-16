export interface GalleryItem {
  id: number;
  title: string;
  images: string[]; // 게시글에 연결된 이미지들 (최소 1개 보장)
  author: {
    id: number;
    nickname: string;
    profile_image?: string;
  };
  views: number;
  comment_count: number;
  like_count: number;
  created_at: string;
  updated_at?: string;
}