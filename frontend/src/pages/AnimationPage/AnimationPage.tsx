import React, { useEffect, useState, useRef } from "react";
import FilterSidebar from "../../components/Animation/AniTag/FilterSidebar";
import AniList from "../../components/Animation/AniList/AniList";
import AnimeProfile from "../../components/Animation/ProfileCard/ProfileCard";
import AnimeDetailModal from "../../components/AnimeDetailModal/AnimeDetailModal";
import { searchAnime, getAnimeDetail } from "../../api/anime";
import { getMyProfile } from "../../api/profile";
import { useGenreFilteredAnimeList } from "../../hooks/bolckAnime";
import type { AnimeItem, AnimeFilter } from "../../types/anime";
import type { User } from "../../types/user";
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
  let yearParam = undefined;
  if (filters.year === "2010년 이하") {
    yearParam = undefined;
  } else if (filters.year) {
    yearParam = filters.year;
  }

  return {
    ...(filters.genre && filters.genre.length > 0 ? { genres: filters.genre.join(",") } : {}),
    ...(filters.season ? { season: filters.season } : {}),
    ...(yearParam !== undefined ? { year: yearParam } : {}),
    ...(filters.broadcast ? { status: filters.broadcast } : {}),
    ...(filters.keyword ? { q: filters.keyword } : {}),
    sort: sort === "popular" ? "popular" : (sort === "latest" ? "-start_year" : sort),
    offset,
    limit,
  };
};

export default function AniMain() {
  const [filters, setFilters] = useState<AnimeFilter>({
    genre: [],
    season: "",
    year: "",
    broadcast: "",
    keyword: "",
  });

  const [sort, setSort] = useState("popular");
  const [offset, setOffset] = useState(0);
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [selectedAnimeId, setSelectedAnimeId] = useState<number | null>(null);
  const [selectedAnime, setSelectedAnime] = useState<AnimeItem | null>(null);

  const [user, setUser] = useState<User | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  // 필터링 훅 적용
  const filteredAnimeList = useGenreFilteredAnimeList(animeList);

  useEffect(() => {
    console.log("[필터 변경] filters:", filters, "sort:", sort, "offset:", offset);
  }, [filters, sort, offset]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        setUser(data);
        console.log("[유저 프로필]", data);
      } catch (e) {
        console.error("유저 정보 가져오기 실패", e);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchAnimeList = async () => {
      setLoading(true);
      try {
        const params = buildAnimeParams(filters, sort, offset, LIMIT);
        console.log("[애니 검색 파라미터]", params);
        const data = await searchAnime(params);
        console.log("[애니 목록 API 응답]", data);

        let resultList: AnimeItem[] = [];
        if (Array.isArray(data)) {
          resultList = data;
          setTotalCount(data.length);
        } else if (data.results) {
          resultList = data.results;
          setTotalCount(data.count || data.results.length);
        } else {
          resultList = [];
          setTotalCount(0);
        }
        setAnimeList(prev =>
          offset === 0 ? resultList : [...prev, ...resultList]
        );
        console.log("[최종 animeList]", offset === 0 ? resultList : [...animeList, ...resultList]);
      } catch (e) {
        console.error("애니 목록 가져오기 실패 ❌", e);
        setAnimeList([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimeList();
    // eslint-disable-next-line
  }, [filters, sort, offset]);

  useEffect(() => {
    setOffset(0);
  }, [filters, sort]);

  useEffect(() => {
    if (!loaderRef.current || !scrollRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setOffset(prev => prev + LIMIT);
          console.log("[무한스크롤] 다음 페이지 요청 (offset ↑)");
        }
      },
      {
        root: scrollRef.current,
        threshold: 1,
      }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loaderRef.current, scrollRef.current]);

  useEffect(() => {
    const fetchDetail = async () => {
      if (selectedAnimeId === null) return;
      try {
        const data = await getAnimeDetail(selectedAnimeId);
        setSelectedAnime(data);
        console.log("[애니 상세 정보]", data);
      } catch (e) {
        console.error("애니 상세 정보 불러오기 실패 ❌", e);
      }
    };
    fetchDetail();
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
                list={filteredAnimeList}
                total={totalCount}
                sort={SORT_OPTIONS.find(opt => opt.value === sort)?.label || "인기순"}
                sortOptions={SORT_OPTIONS}
                onSortChange={setSort}
                scrollRef={scrollRef}
                loaderRef={loaderRef}
                onAnimeClick={anime => setSelectedAnimeId(anime.id)}
              />
              <div ref={loaderRef} style={{ height: 1 }} />
              {selectedAnime && (
                <AnimeDetailModal
                  anime={selectedAnime}
                  onClose={() => {
                    setSelectedAnimeId(null);
                    setSelectedAnime(null);
                  }}
                />
              )}
            </AnimeListBox>
          </AnimeSectionBox>

          <SidebarSection>
            {user && <AnimeProfile user={user} />}
          </SidebarSection>
        </Wrapper>
      </Container>
    </Section>
  );
}