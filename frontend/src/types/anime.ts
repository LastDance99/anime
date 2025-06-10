export interface AnimeItem {
  id: number;
  imgUrl: string;
  title: string;
  genres: string[];   // 영어 장르 코드
  genreKor: string[]; // 한글 장르명
  season: string;     // '봄', '여름', '가을', '겨울'
  year: string;       // '24년 1분기' 등
  broadcast: string;  // '방영중', '방영 종료', '방영 예정'
}

export interface AnimeFilter {
  genre: string;
  season: string;
  year: string;
  broadcast: string;
  keyword: string;
}