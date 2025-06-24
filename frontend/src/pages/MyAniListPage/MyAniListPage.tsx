import React, { useEffect, useState } from "react";
import MyAniListFilter from "../../components/MyAnimation/MyAniListFilter/MyAniListFilter";
import MyAniList from "../../components/MyAnimation/MyAniList/MyAniList";
import AnimeDetailModal from "../../components/AnimeDetailModal/AnimeDetailModal";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import type { AnimeItem } from "../../types/anime";
import type { AniListFilters } from "../../types/AniListFilters";
import { getUserContent } from "../../api/profile";
import { removeAnimeFromList, addAnimeList, getAnimeDetail } from "../../api/anime";
import { getFavoriteAnimes, toggleFavoriteAnime } from "../../api/profile";
import { useOutletContext } from "react-router-dom";
import { PageWrapper, MainLayout } from "./MyAniListPage.styled";
import type { User } from "../../types/user";
import axios from "axios";

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
  const [selectedAnime, setSelectedAnime] = useState<(AnimeItem & { isAdded: boolean }) | null>(null);
  const [myAnimeList, setMyAnimeList] = useState<AnimeItem[]>([]);
  const [favoriteAnimeIds, setFavoriteAnimeIds] = useState<number[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchAnimeList = async () => {
    try {
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
    } catch (err) {
      console.error("애니 리스트 불러오기 실패", err);
    }
  };

  const fetchFavorites = async () => {
    try {
      const res = await getFavoriteAnimes(user.id);
      setFavoriteAnimeIds(res.map((a: AnimeItem) => a.id));
    } catch (err) {
      console.error("최애 애니 리스트 불러오기 실패", err);
    }
  };

  useEffect(() => {
    fetchAnimeList();
    fetchFavorites();
  }, [user.id, filters]);

  const handleToggle = async (anime: AnimeItem) => {
    const animeId = anime.anime_id || anime.id;
    const isAlreadyAdded = myAnimeList.some((item) => item.anime_id === animeId || item.id === animeId);

    try {
      if (isAlreadyAdded) {
        await removeAnimeFromList(animeId);
        setMyAnimeList((prev) => prev.filter((a) => (a.anime_id || a.id) !== animeId));
        setAnimeList((prev) => prev.filter((a) => (a.anime_id || a.id) !== animeId));
      } else {
        await addAnimeList(animeId);
        const detail = await getAnimeDetail(animeId);
        setMyAnimeList((prev) => [...prev, detail]);
        setAnimeList((prev) => [...prev, detail]);
      }

      setSelectedAnime((prev) =>
        prev && (prev.anime_id || prev.id) === animeId
          ? { ...prev, isAdded: !isAlreadyAdded }
          : prev
      );
    } catch (err: any) {
      console.error("토글 실패:", err);
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        console.warn("이미 삭제된 항목입니다:", animeId);
      } else {
        alert("리스트 토글 중 오류가 발생했습니다.");
      }
    }
  };

  const handleToggleFavorite = async (anime: AnimeItem) => {
    try {
      await toggleFavoriteAnime(anime.id);
      setFavoriteAnimeIds((prev) =>
        prev.includes(anime.id)
          ? prev.filter((id) => id !== anime.id)
          : [...prev, anime.id]
      );
    } catch (err) {
      console.error("즐겨찾기 토글 실패", err);
    }
  };

  const handleAnimeClick = async (anime: AnimeItem) => {
    try {
      const animeId = anime.anime_id || anime.id;
      const detail = await getAnimeDetail(animeId);
      const isInMyList = myAnimeList.some((a) => a.id === animeId || a.anime_id === animeId);
      setSelectedAnime({ ...detail, isAdded: isInMyList });
    } catch (err) {
      console.error("상세 불러오기 실패", err);
      alert("애니메이션 상세 정보를 불러올 수 없습니다.");
    }
  };

  return (
    <PageWrapper>
      <MainLayout>
        <MyAniListFilter filters={filters} setFilters={setFilters} />
        {isRefreshing ? (
          <LoadingSpinner />
        ) : (
          <MyAniList
            list={animeList.map((item) => ({
              ...item,
              is_favorite: favoriteAnimeIds.includes(item.id),
              added_at: item.added_at ?? "",
            }))}
            onAnimeClick={handleAnimeClick}
            myAnimeList={myAnimeList}
            onAdd={handleToggle}
            onRemove={handleToggle}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
        {selectedAnime && (
          <AnimeDetailModal
            anime={selectedAnime}
            onClose={() => setSelectedAnime(null)}
            isAdded={selectedAnime.isAdded ?? false}
            onToggle={() => handleToggle(selectedAnime)}
            user={user}
          />
        )}
      </MainLayout>
    </PageWrapper>
  );
};

export default MyAniListPage;