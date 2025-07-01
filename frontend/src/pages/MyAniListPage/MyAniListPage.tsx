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

const MyAniListPage = () => {
  const { user } = useOutletContext<{ user: User }>();
  const { currentUser } = useAuth();

  const [filters, setFilters] = useState<AniListFilters>({
    year: 0, genre: "", season: "", status: "",
    format: "", keyword: "", original: "", sort: "",
  });

  // 🟢 리스트: 프로필 주인 기준!
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // 상세 모달 상태
  const [selectedAnime, setSelectedAnime] = useState<null | (AnimeItem & {
    isAdded: boolean;
    isFavorite: boolean;
  })>(null);

  // 현재 로그인한 사용자의 "내 리스트/최애"
  const [myAnimeList, setMyAnimeList] = useState<AnimeItem[]>([]);
  const [myFavoriteAnimeIds, setMyFavoriteAnimeIds] = useState<number[]>([]);

  const pageRef = useRef(1);
  const isFetchingRef = useRef(false);

  // ⭐️ 1. 프로필 주인 기준 리스트/최애 fetch (리스트 화면용)
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

  // ⭐️ 2. 내 리스트/내 최애를 로그인 유저 기준으로 fetch (상세 모달용)
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
        alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
      }
    }
  };

  useEffect(() => {
    fetchMyAnimeData();
  }, [currentUser]);

  // ✅ 상세 모달 열기: 항상 내 기준!
  const handleAnimeClick = async (anime: AnimeItem) => {
    if (!currentUser) {
      alert("로그인 후 이용 가능합니다!");
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
      alert("애니메이션 상세 정보를 불러올 수 없습니다.");
    }
  };

  // 리스트에서 토글(추가/삭제)는 프로필 주인 것만 동작!
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
        alert("리스트 토글 중 오류가 발생했습니다.");
      }
    }
  };

  // 최애 토글도 프로필 주인 것만
  const handleToggleFavorite = async (anime: AnimeItem) => {
    const animeId = anime.anime_id || anime.id;
    const isNowFavorite = !animeList.some(a => (a.anime_id || a.id) === animeId && a.is_favorite);
    const isInMyList = animeList.some(a => (a.anime_id || a.id) === animeId);
    if (!isInMyList) {
      alert("이 애니는 내 리스트에 추가되어 있지 않아 최애로 등록할 수 없습니다.");
      return;
    }
    try {
      await toggleFavoriteAnime(animeId, isNowFavorite);
      // 리스트 갱신
      fetchAnimeList(pageRef.current, true);
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