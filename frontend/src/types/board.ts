export interface BoardAuthor {
  id: number;
  nickname: string;
  profile_image?: string;
}

export interface BoardItem {
  id: number;
  category: string;
  board_type: string;
  title: string;
  content: string;
  views: number;
  comment_count: number;
  like_count: number;
  images?: string[]; // thumbnail만 쓸 거면 생략 가능a
  thumbnail?: string; // 썸네일 필드
  created_at: string;
  updated_at?: string | null;
  author: BoardAuthor;
  // author 객체가 아니라, 닉네임만 별도로
  author_nickname: string;
  author_profile_image?: string;
  // 나중에 프로필 이미지도 쓰고 싶으면 아래 필드 추가
  is_liked?: boolean;
  // author_profile_image?: string;

  // 공지글 수정 관련
  is_notice: boolean;
}