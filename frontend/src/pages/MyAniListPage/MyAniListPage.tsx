import React, { useState } from "react";
import MyAniListFilter from "../../components/MyAnimation/MyAniListFilter/MyAniListFilter";
import MyAniList from "../../components/MyAnimation/MyAniList/MyAniList";
import ChatBot from "../../components/ChatBot/ChatBot";
import AnimeDetailModal from "../../components/AnimeDetailModal/AnimeDetailModal"; // 추가!
import type { AnimeItem } from "../../types/anime"; // 추가!
import type { AniListFilters } from "../../types/AniListFilters";
import { PageWrapper, MainLayout } from "./MyAniListPage.styled";

export default function MyAniListPage() {
  const [filters, setFilters] = useState<AniListFilters>({
    year: 0,
    genre: "",
    season: "",
    status: "",
    format: "",
    keyword: "",
    original: "",
    sort: "",
  });

  // ⭐️ 선택된 애니 상태 추가!
  const [selectedAnime, setSelectedAnime] = useState<AnimeItem | null>(null);

  return (
    <PageWrapper>
      <MainLayout>
        <MyAniListFilter filters={filters} setFilters={setFilters} />
        {/* 
          1. onAnimeClick prop으로 카드 클릭시 setSelectedAnime 실행 
          2. selectedAnime이 있으면 AnimeDetailModal 띄움
        */}
        <MyAniList filters={filters} onAnimeClick={setSelectedAnime} />
        {selectedAnime && (
          <AnimeDetailModal
            anime={selectedAnime}
            onClose={() => setSelectedAnime(null)}
          />
        )}
      </MainLayout>    
    </PageWrapper>
  );
}