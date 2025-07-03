import React, { useEffect, useRef, useState } from "react";
import MyAniListFilter from "../../components/MyAnimation/MyAniListFilter/MyAniListFilter";
import MyAniList from "../../components/MyAnimation/MyAniList/MyAniList";
import AnimeDetailModal from "../../components/AnimeDetailModal/AnimeDetailModal";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import type { AnimeItem } from "../../types/anime";
import type { AniListFilters } from "../../types/AniListFilters";
import { getUserContent, getFavoriteAnimes, toggleFavoriteAnime } from "../../api/profile";
import { removeAnimeFromList, addAnimeList, getAnimeDetail } from "../../api/anime";
import { useOutletContext } from "react-router-dom";
import { PageWrapper, MainLayout } from "./MyAniListPage.styled";
import type { User } from "../../types/user";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";

const MyAniListPage = () => {
  const { t } = useTranslation();
  const { user } = useOutletContext<{ user: User }>();
  const { currentUser } = useAuth();

  const [filters, setFilters] = useState<AniListFilters>({
    year: 0, genre: "", season: "", status: "",
    format: "", keyword: "", original: "", sort: "",
  });

  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [selectedAnime, setSelectedAnime] = useState<null | (AnimeItem & {
    isAdded: boolean;
    isFavorite: boolean;
  })>(null);

  const [myAnimeList, setMyAnimeList] = useState<AnimeItem[]>([]);
  const [myFavoriteAnimeIds, setMyFavoriteAnimeIds] = useState<number[]>([]);

  const pageRef = useRef(1);
  const isFetchingRef = useRef(false);

  const fetchAnimeList = async (pageNum: number, reset = false) => {
    if (isFetchingRef.current) return;
    try {
      isFetchingRef.current = true;
      const res = await getUserContent({
        userId: user.id,
        type: "anime",
        q: filters.keyword,
        year: filters.year ? String(filters.year) : undefined,
        genres: filters.genre,
        season: filters.season,
        status: filters.status,
        media_format: filters.format,
        source: filters.original,
        ordering: filters.sort,
        page: pageNum,
      });
      if (reset) {
        setAnimeList(res.results);
        pageRef.current = 1;
      } else {
        setAnimeList((prev) => [...prev, ...res.results]);
      }
      setTotalCount(res.count);
      setHasMore(!!res.next);
    } catch (err) {
      console.error("애니 리스트 불러오기 실패", err);
    } finally {
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    fetchAnimeList(1, true);
  }, [user.id, filters]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= docHeight - 100 && hasMore && !isFetchingRef.current) {
        const nextPage = pageRef.current + 1;
        fetchAnimeList(nextPage);
        pageRef.current = nextPage;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  const fetchMyAnimeData = async () => {
    if (!currentUser) return;
    try {
      const [listRes, favRes] = await Promise.all([
        getUserContent({ userId: currentUser.id, type: "anime" }),
        getFavoriteAnimes(currentUser.id)
      ]);
      setMyAnimeList(listRes.results);
      setMyFavoriteAnimeIds(favRes.map((a: AnimeItem) => a.id));
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        alert(t("anime.session_expired"));
      }
    }
  };

  useEffect(() => {
    fetchMyAnimeData();
  }, [currentUser]);

  const handleAnimeClick = async (anime: AnimeItem) => {
    if (!currentUser) {
      alert(t("anime.login_required"));
      return;
    }
    await fetchMyAnimeData();
    try {
      const animeId = anime.anime_id || anime.id;
      const detail = await getAnimeDetail(animeId);

      const isInMyList = myAnimeList.some(a => (a.anime_id || a.id) === animeId);
      const isFavorite = myFavoriteAnimeIds.includes(animeId);

      setSelectedAnime({
        ...detail,
        isAdded: isInMyList,
        isFavorite,
      });
    } catch (err) {
      console.error("상세 불러오기 실패", err);
      alert(t("anime.detail_fetch_failed"));
    }
  };

  const handleToggle = async (anime: AnimeItem) => {
    const animeId = anime.anime_id || anime.id;
    const isAlreadyAdded = animeList.some((item) => (item.anime_id || item.id) === animeId);
    try {
      if (isAlreadyAdded) {
        await removeAnimeFromList(animeId);
        setAnimeList(prev => prev.filter(a => (a.anime_id || a.id) !== animeId));
      } else {
        await addAnimeList(animeId);
        const detail = await getAnimeDetail(animeId);
        setAnimeList(prev => [...prev, detail]);
      }
    } catch (err: any) {
      console.error("토글 실패:", err);
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        console.warn("이미 삭제된 항목입니다:", animeId);
      } else {
        alert(t("anime.toggle_error"));
      }
    }
  };

  const handleToggleFavorite = async (anime: AnimeItem) => {
    const animeId = anime.anime_id || anime.id;
    const isNowFavorite = !animeList.some(a => (a.anime_id || a.id) === animeId && a.is_favorite);
    const isInMyList = animeList.some(a => (a.anime_id || a.id) === animeId);
    if (!isInMyList) {
      alert(t("anime.favorite_require_list"));
      return;
    }
    try {
      await toggleFavoriteAnime(animeId, isNowFavorite);
      setAnimeList(prev =>
        prev.map(a =>
          (a.anime_id || a.id) === animeId
            ? { ...a, is_favorite: isNowFavorite }
            : a
        )
      );
    } catch (err) {
      console.error("즐겨찾기 토글 실패", err);
    }
  };

  return (
    <PageWrapper>
      <MainLayout>
        <MyAniListFilter filters={filters} setFilters={setFilters} />
        <MyAniList
          list={animeList.map((item) => ({
            ...item,
            is_favorite: item.is_favorite,
            added_at: item.added_at ?? "",
          }))}
          onAnimeClick={handleAnimeClick}
          myAnimeList={animeList}
          onAdd={handleToggle}
          onRemove={handleToggle}
          onToggleFavorite={handleToggleFavorite}
          totalCount={totalCount}
          isMyPage={currentUser && user ? currentUser.id === user.id : false}
        />
        {selectedAnime && currentUser && (
          <AnimeDetailModal
            anime={selectedAnime}
            onClose={() => setSelectedAnime(null)}
            isAdded={selectedAnime.isAdded}
            onToggle={() => handleToggle(selectedAnime)}
            user={currentUser}
          />
        )}
      </MainLayout>
    </PageWrapper>
  );
};

export default MyAniListPage;