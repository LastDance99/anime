export interface AnimeItem {
  id: number;
  imgUrl: string;
  title: string;
  genres: string[];   // 영어 장르 코드
  genreKor: string[]; // 한글 장르명
  season: string;     // '봄', '여름', '가을', '겨울'
  year: number;       // '24년 1분기' 등
  broadcast: string;  // '방영중', '방영 종료', '방영 예정'4
  rating: number;      // ← number 타입!
  popularity: number;  // ← number 타입!
  format: string;      // ← 추가
  original: string;    // ← 추가
  addedAt: string;     // ← 추가
}

export interface AnimeFilter {
  genre: string[];
  season: string;
  year: number | string; 
  broadcast: string;
  keyword: string;
}

export type UserAnimeItem = AnimeItem & {
  is_favorite: boolean;
  addedAt: string;
  my_rating: number;
};