import React, { useEffect, useState, useRef } from "react";
import FilterSidebar from "../../components/Animation/AniTag/FilterSidebar";
import AniList from "../../components/Animation/AniList/AniList";
import AnimeProfile from "../../components/Animation/ProfileCard/ProfileCard";
import AnimeDetailModal from "../../components/AnimeDetailModal/AnimeDetailModal";
import {
  searchAnime,
  getAnimeDetail,
  toggleAnimeList,
  removeAnimeFromList,
} from "../../api/anime";
import { getMyProfile, getUserContent } from "../../api/profile";
import { useGenreFilteredAnimeList } from "../../hooks/bolckAnime";
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

const buildAnimeParams = (filters: AnimeFilter, sort: string, offset: number, limit: number) => {
  const yearParam = filters.year === "2010년 이하" ? undefined : filters.year;
  return {
    ...(filters.genre?.length ? { genres: filters.genre.join(",") } : {}),
    ...(filters.season ? { season: filters.season } : {}),
    ...(yearParam ? { year: yearParam } : {}),
    ...(filters.broadcast ? { status: filters.broadcast } : {}),
    ...(filters.keyword ? { q: filters.keyword } : {}),
    sort: sort === "popular" ? "popular" : sort === "latest" ? "-start_year" : sort,
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
  const [selectedAnimeId, setSelectedAnimeId] = useState<number | null>(null);
  const [selectedAnime, setSelectedAnime] = useState<AnimeItem | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userAnimeIds, setUserAnimeIds] = useState<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const filteredAnimeList = useGenreFilteredAnimeList(animeList);
  const processedAnimeList = filteredAnimeList.map(anime => ({ ...anime, isAdded: userAnimeIds.includes(anime.id) }));

  const fetchUserAnimeList = async (userId: number) => {
    try {
      const data = await getUserContent({ userId, type: "anime" });
      setUserAnimeIds(data.results.map((item: AnimeItem) => item.id));
    } catch (e) {
      console.error("유저 애니 리스트 가져오기 실패", e);
    }
  };

  const handleToggleAnimeList = async (animeId: number) => {
    try {
      if (userAnimeIds.includes(animeId)) {
        await removeAnimeFromList(animeId);
      } else {
        await toggleAnimeList(animeId);
      }
      if (user) await fetchUserAnimeList(user.id);
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
    const fetchAnimeList = async () => {
      setLoading(true);
      try {
        const data = await searchAnime(buildAnimeParams(filters, sort, offset, LIMIT));
        const results = data.results || Array.isArray(data) ? data : [];
        setAnimeList(prev => offset === 0 ? results : [...prev, ...results]);
        setTotalCount(data.count || results.length);
      } catch (e) {
        console.error("애니 목록 가져오기 실패", e);
        setAnimeList([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimeList();
  }, [filters, sort, offset]);

  useEffect(() => setOffset(0), [filters, sort]);

  useEffect(() => {
    if (!loaderRef.current || !scrollRef.current) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) setOffset(prev => prev + LIMIT);
    }, { root: scrollRef.current, threshold: 1 });
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loaderRef.current, scrollRef.current]);

  useEffect(() => {
    if (selectedAnimeId === null) return;
    getAnimeDetail(selectedAnimeId)
      .then(setSelectedAnime)
      .catch(e => console.error("애니 상세 불러오기 실패", e));
  }, [selectedAnimeId]);

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
                  onToggle={() => handleToggleAnimeList(selectedAnime.id)}
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