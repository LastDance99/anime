import React, { useEffect, useState, useRef, useMemo } from "react";
import FilterSidebar from "../../components/Animation/AniTag/FilterSidebar";
import AniList from "../../components/Animation/AniList/AniList";
import AnimeProfile from "../../components/Animation/ProfileCard/ProfileCard";
import AnimeDetailModal from "../../components/AnimeDetailModal/AnimeDetailModal";
import {
  searchAnime,
  getAnimeDetail,
  addAnimeList,
  removeAnimeFromList,
} from "../../api/anime";
import { getMyProfile, getUserContent } from "../../api/profile";
import type { AnimeItem, AnimeFilter } from "../../types/anime";
import type { User } from "../../types/user";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import {
  Section,
  Container,
  Wrapper,
  AnimeSectionBox,
  AnimeHeader,
  SidebarSection,
  AnimeListBox,
} from "./AnimationPage.styled";

const LIMIT = 50;
const SORT_OPTIONS = [
  { label: "인기순", value: "popular" },
  { label: "최신순", value: "latest" },
  { label: "평점순", value: "rating" },
];

const buildAnimeParams = (
  filters: AnimeFilter,
  sort: string,
  offset: number,
  limit: number
) => {
  let ordering: string;
  if (sort === "popular") ordering = "popular";
  else if (sort === "latest") ordering = "-start_year";
  else if (sort === "rating") ordering = "-rating";
  else ordering = "-start_year"; // fallback

  // 2010년 이하 옵션 대응
  const yearParam = filters.year === "2010년 이하" || filters.year === "" ? undefined : filters.year;

  return {
    ...(filters.genre?.length ? { genres: filters.genre.join(",") } : {}),
    ...(filters.season ? { season: filters.season } : {}),
    ...(yearParam ? { year: yearParam } : {}),
    ...(filters.broadcast ? { status: filters.broadcast } : {}),
    ...(filters.keyword ? { q: filters.keyword } : {}),
    ordering,
    offset,
    limit,
  };
};

export default function AniMain() {
  const [filters, setFilters] = useState<AnimeFilter>({ genre: [], season: "", year: "", broadcast: "", keyword: "" });
  const [sort, setSort] = useState("popular");
  const [offset, setOffset] = useState(0);
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false); // ✅ 추가

  const [selectedAnimeId, setSelectedAnimeId] = useState<number | null>(null);
  const [selectedAnime, setSelectedAnime] = useState<AnimeItem | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userAnimeIds, setUserAnimeIds] = useState<number[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const fetchUserAnimeList = async (userId: number) => {
    try {
      const data = await getUserContent({ userId, type: "anime" });
      setUserAnimeIds(data.results.map((item: any) => Number(item.anime_id)));
    } catch (e) {
      console.error("유저 애니 리스트 가져오기 실패", e);
    }
  };

  const handleToggleAnimeList = async (anime: AnimeItem) => {
    const animeId = anime.anime_id || anime.id;
    const isCurrentlyAdded = userAnimeIds.includes(animeId);

    try {
      if (isCurrentlyAdded) {
        await removeAnimeFromList(animeId);
      } else {
        await addAnimeList(animeId);
      }

      // ✅ 변경: 서버 최신 상태로 동기화
      if (user) {
        await fetchUserAnimeList(user.id);
      }

      setUserAnimeIds(prev =>
        isCurrentlyAdded ? prev.filter(id => id !== animeId) : [...prev, animeId]
      );

      setSelectedAnime(prev =>
        prev && prev.id === animeId ? { ...prev, isAdded: !isCurrentlyAdded } : prev
      );
    } catch (e: any) {
      console.error("애니 리스트 토글 실패", e.response?.data || e);
    }
  };

  useEffect(() => {
    getMyProfile().then(setUser).catch(e => console.error("유저 정보 가져오기 실패", e));
  }, []);

  useEffect(() => {
    if (user) fetchUserAnimeList(user.id);
  }, [user]);

  useEffect(() => {
    // ✅ filters 또는 sort 바뀔 때 애니 리스트 초기화 및 offset 0으로
    setAnimeList([]);
    setOffset(0);
  }, [filters, sort]);

  useEffect(() => {
    console.log(
      "[🎯 애니 정렬 결과]",
      animeList.map((a, i) => ({
        i,
        title: a.title,
        total: a.total_animelist_users,
      }))
    );
  }, [animeList]);

  useEffect(() => {
    const fetchAnimeList = async () => {
      setLoading(true);
      setIsFetching(true); // ✅ fetching 시작

      try {
        const params = buildAnimeParams(filters, sort, offset, LIMIT);
        console.log("[🔍 요청 파라미터]", params); // ✅ 여기 잘 찍혔는지 콘솔 확인

        const data = await searchAnime(params);
        const results = Array.isArray(data.results) ? data.results : [];

        setAnimeList(prev => offset === 0 ? results : [...prev, ...results]);
        setTotalCount(data.count || results.length);
      } catch (e) {
        console.error("애니 목록 가져오기 실패", e);
        setAnimeList([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
        setIsFetching(false); // ✅ fetching 종료
      }
    };

    fetchAnimeList();
  }, [filters, sort, offset]);

  useEffect(() => {
    if (!loaderRef.current || !scrollRef.current) return;
    const observer = new IntersectionObserver(entries => {
      if (
        entries[0].isIntersecting &&
        !isFetching &&
        animeList.length < totalCount
      ) {
        setOffset(prev => prev + LIMIT);
      }
    }, { root: scrollRef.current, threshold: 1 });
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [isFetching, animeList.length, totalCount]);

  useEffect(() => {
    if (selectedAnimeId === null) return;
    getAnimeDetail(selectedAnimeId)
      .then(anime => {
        const isAdded = userAnimeIds.includes(anime.id);
        setSelectedAnime({ ...anime, isAdded } as AnimeItem);
      })
      .catch(e => console.error("애니 상세 불러오기 실패", e));
  }, [selectedAnimeId, userAnimeIds]);

  const processedAnimeList = useMemo(() => {
    return animeList.map(anime => {
      const isAdded = userAnimeIds.includes(anime.id);
      return { ...anime, isAdded } as AnimeItem;
    });
  }, [animeList, userAnimeIds]);

  return (
    <Section>
      <Container>
        <Wrapper>
          <AnimeSectionBox>
            <AnimeHeader>애니메이션 목록</AnimeHeader>
            <AnimeListBox ref={scrollRef}>
              <FilterSidebar filters={filters} setFilters={setFilters} />
              <AniList
                list={processedAnimeList}
                total={totalCount}
                sort={SORT_OPTIONS.find(opt => opt.value === sort)?.label || "인기순"}
                sortOptions={SORT_OPTIONS}
                onSortChange={setSort}
                scrollRef={scrollRef}
                loaderRef={loaderRef}
                onAnimeClick={anime => setSelectedAnimeId(anime.id)}
                loading={loading}
                userAnimeIds={userAnimeIds}
                onToggleAnimeList={handleToggleAnimeList}
              />
              <div ref={loaderRef} style={{ height: 1 }} />
              {loading && <LoadingSpinner />}
              {selectedAnime && user && (
                <AnimeDetailModal
                  anime={selectedAnime}
                  isAdded={userAnimeIds.includes(selectedAnime.id)}
                  onToggle={() => handleToggleAnimeList(selectedAnime)}
                  onClose={() => {
                    setSelectedAnimeId(null);
                    setSelectedAnime(null);
                  }}
                  user={user}
                />
              )}
            </AnimeListBox>
          </AnimeSectionBox>
          <SidebarSection>{user && <AnimeProfile user={user} />}</SidebarSection>
        </Wrapper>
      </Container>
    </Section>
  );
}