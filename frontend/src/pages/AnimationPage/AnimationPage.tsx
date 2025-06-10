import React, { useState, useMemo } from "react";
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

export default function AniMain() {
  const [filters, setFilters] = useState<AnimeFilter>({
    genre: "",
    season: "",
    year: "",
    broadcast: "",
    keyword: "",
  });

  const filteredList = useMemo(() => {
    return ANIME_DATA.filter(anime => {
      if (filters.genre && !anime.genreKor.includes(filters.genre)) return false;
      if (filters.season && anime.season !== filters.season) return false;
      if (filters.year && anime.year !== filters.year) return false;
      if (filters.broadcast && anime.broadcast !== filters.broadcast) return false;
      if (filters.keyword && !anime.title.includes(filters.keyword)) return false;
      return true;
    });
  }, [filters]);

  return (
    <Section>
      <Container>
        <Wrapper>
          <AnimeSectionBox>
            <AnimeHeader>애니메이션 목록</AnimeHeader>
            <AnimeListBox>
              <FilterSidebar filters={filters} setFilters={setFilters} />
              <AniList list={filteredList} />
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