import React, { useState, useEffect, useRef } from "react";
import FilterSidebar from "../../components/Animation/AniTag/FilterSidebar";
import AniList from "../../components/Animation/AniList/AniList";
import ChatBot from "../../components/ChatBot/ChatBot";
import AnimeProfile from "../../components/Animation/ProfileCard/ProfileCard";
import AnimeDetailModal from "../../components/AnimeDetailModal/AnimeDetailModal";
import { searchAnime, getAnimeDetail } from "../../api/anime";
import { getMyProfile } from "../../api/profile";
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

const SORT_OPTIONS = [
  { label: "인기순", value: "popular" },
  { label: "최신순", value: "latest" },
  { label: "평점순", value: "rating" },
];

export default function AniMain() {
  const [filters, setFilters] = useState<AnimeFilter>({
    genre: [],
    season: "",
    year: "",
    broadcast: "",
    keyword: "",
  });

  const [sort, setSort] = useState("popular");
  const [showCount, setShowCount] = useState(50);

  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [selectedAnimeId, setSelectedAnimeId] = useState<number | null>(null);
  const [selectedAnime, setSelectedAnime] = useState<AnimeItem | null>(null);

  const [user, setUser] = useState<User | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  // 로그인 유저 불러오기
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        setUser(data);
      } catch (e) {
        console.error("유저 정보 가져오기 실패", e);
      }
    };
    fetchProfile();
  }, []);

  // 애니 리스트 불러오기
  useEffect(() => {
    const fetchAnimeList = async () => {
      setLoading(true);
      try {
        const params = {
          genre: filters.genre,
          season: filters.season,
          year: filters.year,
          broadcast: filters.broadcast,
          keyword: filters.keyword,
          sort,
          limit: showCount,
        };
        const data = await searchAnime(params);
        console.log("🎯 애니 목록 API 응답:", data);

        // 응답이 배열인지 확인하고 처리
        if (Array.isArray(data)) {
          setAnimeList(data);
          setTotalCount(data.length);
        } else if (data.results) {
          setAnimeList(data.results);
          setTotalCount(data.count || data.results.length);
        } else {
          console.warn("⚠️ 알 수 없는 응답 구조:", data);
          setAnimeList([]);
          setTotalCount(0);
        }
      } catch (e) {
        console.error("애니 목록 가져오기 실패 ❌", e);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimeList();
  }, [filters, sort, showCount]);

  // 무한스크롤
  useEffect(() => {
    if (!loaderRef.current || !scrollRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setShowCount(prev => prev + 50);
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

  // 상세 보기
  useEffect(() => {
    const fetchDetail = async () => {
      if (selectedAnimeId === null) return;
      try {
        const data = await getAnimeDetail(selectedAnimeId);
        setSelectedAnime(data);
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
            <AnimeListBox>
              <FilterSidebar filters={filters} setFilters={setFilters} />
              <AniList
                list={animeList}
                total={totalCount}
                sort={SORT_OPTIONS.find(opt => opt.value === sort)?.label || "인기순"}
                sortOptions={SORT_OPTIONS}
                onSortChange={setSort}
                scrollRef={scrollRef}
                loaderRef={loaderRef}
                onAnimeClick={anime => setSelectedAnimeId(anime.id)}
              />
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