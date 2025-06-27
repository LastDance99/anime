export interface AnimeItem {
  id: number;
  title: string;
  anime_id: number;

  // 메인 포스터(커버) 이미지 (API마다 다를 수 있음, 순서대로 fallback)
  cover_image_xl?: string;
  cover_image_l?: string;
  cover_image_m?: string;
  image_url?: string;      // 기존 방식 호환 (가능하면 위에 걸 우선)
  imgUrl?: string;         // 기타 케이스도 호환

  // 배너(상단 대형) 이미지
  banner_image?: string;

  // 장르 (한국어/기타언어)
  genres?: string[];
  genre_kor?: string[];

  // 시즌/연도/방영상태 등
  season?: string;
  year?: number | string;
  broadcast?: string;

  // 평점/인기
  rating?: number;
  avg_rating?: number;     // API에 따라 avg_rating, rating 둘 다 가능
  average_rating?: number; // 상세조회에서 평균평점 필드

  popularity?: number;

  // 타입(분류)
  format?: string;
  original?: string;
  source?: string;         // 원작 정보(소설, 만화 등)

  // 등록일 등
  added_at?: string;

  // 줄거리(설명)
  description?: string;

  // 제작사(스튜디오) - 문자열 or 객체배열(상세조회 참고)
  studio?: string;
  studios?: any[];         // 상세 조회 등에서 [{node:{name, ...}}] 구조일 수도

  status?: string;
  duration?: string;

  // 화수
  episodes?: string | number;

  // 상세조회용 필드(예시)
  start_date?: string;     // 2024-05-18 등

  // 리스트에 추가되었는지 여부를 나타내는 필드 추가
  isAdded?: boolean;

  // 리스트에 추가된 수
  total_animelist_users?: number;

  // 최애의 애니
  is_favorite: boolean;
}

export interface AnimeFilter {
  genre: string[];
  season: string;
  year: number | string;
  broadcast: string;
  keyword: string;
}

export interface UserAnimeItem extends AnimeItem {
  is_favorite: boolean;
  my_rating?: number;
  added_at: string;
}

export interface AnimeReview {
  id: number;
  anime_id: number;
  user: {
    id: number;
    nickname: string;
    profile_image?: string;
  };
  rating: number;
  content: string;
  created_at: string;

  like_count: number;
  liked_by_user: boolean;
  is_liked_by_me?: boolean;
}