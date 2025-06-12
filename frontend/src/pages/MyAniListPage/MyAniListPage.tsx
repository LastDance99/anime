import React, { useState } from "react";
import MyAniListFilter from "../../components/MyAniList/MyAniListFilter/MyAniListFilter";
import MyAniList from "../../components/MyAniList/MyAniList/MyAniList";
import type { AniListFilters } from "../../types/AniListFilters";

export default function MyAniListPage() {
  // 1. 필터 상태 관리
  const [filters, setFilters] = useState<AniListFilters>({
    year: 0,
    genre: "",
    season: "",
    status: "",
    format: "",
  });

  return (
    <div>
      {/* 2. 필터 컴포넌트에 필터 상태와 변경함수 전달 */}
      <MyAniListFilter filters={filters} setFilters={setFilters} />

      {/* 3. 리스트 컴포넌트에 filters 전달 */}
      <MyAniList filters={filters} />
    </div>
  );
}