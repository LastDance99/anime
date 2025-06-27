import React, { useEffect, useRef, useState } from "react";
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
    year: 0, genre: "", season: "", status: "",
    format: "", keyword: "", original: "", sort: "",
  });

  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<(AnimeItem & { isAdded: boolean }) | null>(null);
  const [myAnimeList, setMyAnimeList] = useState<AnimeItem[]>([]);
  const [favoriteAnimeIds, setFavoriteAnimeIds] = useState<number[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const pageRef = useRef(1);
  const isFetchingRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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
        format: filters.format,
        source: filters.original,
        order: filters.sort,
        page: pageNum,
      });

      if (reset) {
        setAnimeList(res.results);
        setMyAnimeList(res.results);
        pageRef.current = 1;
      } else {
        setAnimeList((prev) => [...prev, ...res.results]);
        setMyAnimeList((prev) => [...prev, ...res.results]);
      }

      setTotalCount(res.count);
      setHasMore(!!res.next);
    } catch (err) {
      console.error("애니 리스트 불러오기 실패", err);
    } finally {
      isFetchingRef.current = false;
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
    fetchAnimeList(1, true);
    fetchFavorites();
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
    const animeId = anime.anime_id || anime.id;
    const isNowFavorite = !favoriteAnimeIds.includes(animeId);

    const isInMyList = myAnimeList.some(
      (a) => (a.anime_id || a.id) === animeId
    );

    if (!isInMyList) {
      alert("이 애니는 내 리스트에 추가되어 있지 않아 최애로 등록할 수 없습니다.");
      return;
    }

    try {
      await toggleFavoriteAnime(animeId, isNowFavorite);
      setFavoriteAnimeIds((prev) =>
        isNowFavorite
          ? [...prev, animeId]
          : prev.filter((id) => id !== animeId)
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
        <MyAniList
          list={animeList.map((item) => ({
            ...item,
            is_favorite: favoriteAnimeIds.includes(item.anime_id || item.id),
            added_at: item.added_at ?? "",
          }))}
          onAnimeClick={handleAnimeClick}
          myAnimeList={myAnimeList}
          onAdd={handleToggle}
          onRemove={handleToggle}
          onToggleFavorite={handleToggleFavorite}
          totalCount={totalCount}
        />
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