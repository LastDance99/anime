import { useMemo } from "react";
import type { AnimeItem } from "../types/anime";

// 제외할 장르 리스트
const BLOCKED_GENRES = ["에로", "헨타이", "Hentai ", "Ecchi"];

export function useGenreFilteredAnimeList(
  animeList: AnimeItem[],
  blockedGenres: string[] = BLOCKED_GENRES
) {
  return useMemo(() => {
    // ✅ animeList가 배열이 아닐 경우 빈 배열 반환
    if (!Array.isArray(animeList)) return [];

    return animeList.filter(
      anime =>
        !(anime.genres || []).some(genre =>
          blockedGenres.includes(genre)
        )
    );
  }, [animeList, blockedGenres.join(",")]);
}