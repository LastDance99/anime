import React, { useState, useMemo, useEffect, useRef } from "react";
import FilterSidebar from "../../components/Animation/AniTag/FilterSidebar";
import AniList from "../../components/Animation/AniList/AniList";
import ChatBot from "../../components/ChatBot/ChatBot";
import AnimeProfile from "../../components/Animation/ProfileCard/ProfileCard";
import { ANIME_DATA } from "../../data/Anime";
import type { AnimeItem, AnimeFilter } from "../../types/anime";
import {
  Section,
  Container,
  Wrapper,
  AnimeSectionBox,
  AnimeHeader,
  SidebarSection,
  AnimeListBox,
} from "./AnimationPage.styled";
import { mockUsers } from "../../data/userList";

// 1. 정렬 옵션 선언
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

  // 2. 정렬 상태 선언
  const [sort, setSort] = useState("popular");

  // 3. 필터링
  const filteredList = useMemo(() => {
    return ANIME_DATA.filter(anime => {
      if (
        filters.genre.length > 0 &&
        !filters.genre.every(g => anime.genreKor.includes(g))
      ) return false;
      if (filters.season && anime.season !== filters.season) return false;
      if (filters.year && anime.year !== Number(filters.year)) return false;
      if (filters.broadcast && anime.broadcast !== filters.broadcast) return false;
      if (filters.keyword && !anime.title.includes(filters.keyword)) return false;
      return true;
    });
  }, [filters]);

  // 4. 정렬 로직
  const sortedList = useMemo(() => {
    const copy = [...filteredList];
    switch (sort) {
      case "latest":
        return copy.sort((a, b) => b.year - a.year);      // 최신순 예시
      case "rating":
        return copy.sort((a, b) => b.rating - a.rating);  // 평점순 예시
      case "popular":
      default:
        return copy.sort((a, b) => b.popularity - a.popularity); // 인기순 예시
    }
  }, [filteredList, sort]);

  const [showCount, setShowCount] = useState(50);
  const scrollRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaderRef.current || !scrollRef.current) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setShowCount(count => Math.min(sortedList.length, count + 50));
        }
      },
      {
        root: scrollRef.current,
        threshold: 1,
      }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loaderRef.current, scrollRef.current, sortedList.length]);

  return (
    <Section>
      <Container>
        <Wrapper>
          <AnimeSectionBox>
            <AnimeHeader>애니메이션 목록</AnimeHeader>
            <AnimeListBox>
              <FilterSidebar filters={filters} setFilters={setFilters} />
              <AniList 
                list={sortedList.slice(0, showCount)}
                total={sortedList.length}
                sort={SORT_OPTIONS.find(opt => opt.value === sort)?.label || "인기순"}
                sortOptions={SORT_OPTIONS}
                onSortChange={setSort}
                scrollRef={scrollRef}
                loaderRef={loaderRef}
              />
            </AnimeListBox>
          </AnimeSectionBox>
          <SidebarSection>
            <AnimeProfile user={mockUsers[0]} />
            <ChatBot />
          </SidebarSection>
        </Wrapper>
      </Container>
    </Section>
  );
}