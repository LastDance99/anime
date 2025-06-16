export interface AnimeItem {
  id: number;
  title: string;
  image_url: string;
  genres: string[];
  genre_kor: string[];
  season: string;
  year: number;
  broadcast: string;
  rating: number;
  popularity: number;
  format: string;
  original: string;
  added_at: string;
}

export interface AnimeFilter {
  genre: string[];
  season: string;
  year:  number | string; // string이면 string, 혼용이면 number | string
  broadcast: string;
  keyword: string;
}

export interface UserAnimeItem extends AnimeItem {
  is_favorite: boolean;
  added_at: string;
  my_rating: number;
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
}