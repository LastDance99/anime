export type OriginalType = "" | "만화" | "라노벨" | "비디오게임" | "오리지널";
export type SortType = "" | "favorite" | "latest" | "oldest" | "score";

export interface AniListFilters {
  year: number;
  genre: string;
  season: string;
  status: string;
  format: string;
  keyword: string;
  original: OriginalType;  // ← 추가 (optional 권장)
  sort: SortType;          // ← 추가 (optional 권장)
};