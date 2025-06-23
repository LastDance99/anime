import React, { useEffect, useState } from "react";
import MyAniListFilter from "../../components/MyAnimation/MyAniListFilter/MyAniListFilter";
import MyAniList from "../../components/MyAnimation/MyAniList/MyAniList";
import AnimeDetailModal from "../../components/AnimeDetailModal/AnimeDetailModal";
import type { AnimeItem } from "../../types/anime";
import type { AniListFilters } from "../../types/AniListFilters";
import { getUserContent } from "../../api/profile";
import { removeAnimeFromList, toggleAnimeList } from "../../api/anime";
import { useOutletContext } from "react-router-dom";
import { PageWrapper, MainLayout } from "./MyAniListPage.styled";
import type { User } from "../../types/user";

const MyAniListPage = () => {
  const { user } = useOutletContext<{ user: User }>();

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

  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<AnimeItem | null>(null);
  const [myAnimeList, setMyAnimeList] = useState<AnimeItem[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getUserContent({
        userId: user.id,
        type: "anime",
        q: filters.keyword,
        year: filters.year ? String(filters.year) : undefined,
        genres: filters.genre,
        season: filters.season,
        status: filters.status,
        format: filters.format,
        source: filters.original,
        order: filters.sort,
        page: 1,
      });
      setAnimeList(res.results);
      setMyAnimeList(res.results);
    };
    fetch();
  }, [user.id, filters]);

  const handleToggle = async (anime: AnimeItem) => {
    const isAlreadyAdded = myAnimeList.some((a) => a.id === anime.id);
    try {
      if (isAlreadyAdded) {
        await removeAnimeFromList(anime.id);
        setMyAnimeList((prev) => prev.filter((a) => a.id !== anime.id));
      } else {
        await toggleAnimeList(anime.id);
        setMyAnimeList((prev) => [...prev, anime]);
      }
    } catch (e) {
      console.error("리스트 토글 실패", e);
    }
  };

  const handleDelete = async (anime: AnimeItem) => {
    try {
      await removeAnimeFromList(anime.id);
      setMyAnimeList((prev) => prev.filter((a) => a.id !== anime.id));
      setAnimeList((prev) => prev.filter((a) => a.id !== anime.id));
    } catch (err) {
      console.error("애니 삭제 실패", err);
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <PageWrapper>
      <MainLayout>
        <MyAniListFilter filters={filters} setFilters={setFilters} />
        <MyAniList
          list={animeList.map((item) => ({
            ...item,
            is_favorite: false,
            added_at: item.added_at ?? "",
          }))}
          onAnimeClick={setSelectedAnime}
          myAnimeList={myAnimeList}
          onDelete={handleDelete}
        />
        {selectedAnime && (
          <AnimeDetailModal
            anime={selectedAnime}
            onClose={() => setSelectedAnime(null)}
            isAdded={myAnimeList.some((a) => a.id === selectedAnime.id)}
            onToggle={() => handleToggle(selectedAnime)}
            onDelete={() => handleDelete(selectedAnime)}
            user={user}
          />
        )}
      </MainLayout>
    </PageWrapper>
  );
};

export default MyAniListPage;