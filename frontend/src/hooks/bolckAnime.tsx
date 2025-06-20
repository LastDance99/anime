import { useMemo } from "react";
import type { AnimeItem } from "../types/anime";

// 제외할 장르 리스트(여기만 바꿔서 자유롭게 확장)
const BLOCKED_GENRES = ["에로", "헨타이", "Hentai ", "Ecchi"];

/**
 * animeList: AnimeItem[]  전체 애니메이션 데이터
 * blockedGenres: string[]  (옵션) 제외할 장르 리스트 (기본값 위에서 정의)
 */
export function useGenreFilteredAnimeList(
  animeList: AnimeItem[],
  blockedGenres: string[] = BLOCKED_GENRES
) {
  // useMemo로 불필요한 렌더 최적화
  return useMemo(
    () =>
      animeList.filter(
        anime =>
          !(anime.genres || []).some(genre => blockedGenres.includes(genre))
      ),
    [animeList, blockedGenres.join(",")] // blockedGenres가 바뀌어도 다시 동작!
  );
}