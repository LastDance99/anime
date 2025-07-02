import React, { useEffect, useState } from "react";
import { getPopularAnimeRanking, getUpcomingAnimeRanking, getAnimeDetail } from "../../api/anime";
import type { AnimeRankingItem } from "../../api/anime";
import type { AnimeItem } from "../../types/anime";
import type { User } from "../../types/user";
import AnimeDetailModal from "../AnimeDetailModal/AnimeDetailModal";
import {
  RankingBox, TabList, Tab, RankingList, RankingItem,
  RankBadge, CoverThumb, RankingInfo, AnimeTitle, AnimeMeta
} from "./AnimeRankingWidget.styled";
import { useTranslation } from "react-i18next";

type Props = {
  user: User;
  userAnimeIds: number[];
  onToggleAnimeList: (anime: AnimeItem) => void;
};

export default function AnimeRankingWidget({
  user,
  userAnimeIds,
  onToggleAnimeList,
}: Props) {
  const { t } = useTranslation();

  const [popular, setPopular] = useState<AnimeRankingItem[]>([]);
  const [upcoming, setUpcoming] = useState<AnimeRankingItem[]>([]);
  const [tab, setTab] = useState<"popular" | "upcoming">("popular");
  const [selectedAnime, setSelectedAnime] = useState<AnimeItem | null>(null);

  useEffect(() => {
    getPopularAnimeRanking(5).then(setPopular);
    getUpcomingAnimeRanking(5).then(setUpcoming);
  }, []);

  const handleAnimeClick = async (anime: AnimeRankingItem) => {
    const detail = await getAnimeDetail(anime.id);
    setSelectedAnime({ ...detail, isAdded: userAnimeIds.includes(detail.id) });
  };

  const list = tab === "popular" ? popular : upcoming;

  return (
    <RankingBox>
      <TabList>
        <Tab active={tab === "popular"} onClick={() => setTab("popular")}>
          {t("anime.tab_popular")}
        </Tab>
        <Tab active={tab === "upcoming"} onClick={() => setTab("upcoming")}>
          {t("anime.tab_upcoming")}
        </Tab>
      </TabList>
      <RankingList>
        {list.map((anime, idx) => (
          <RankingItem
            key={anime.id}
            onClick={() => handleAnimeClick(anime)}
            style={{ cursor: "pointer" }}
          >
            <RankBadge>{idx + 1}</RankBadge>
            <CoverThumb>
              <img src={anime.cover_image_l} alt={anime.title} />
            </CoverThumb>
            <RankingInfo>
              <AnimeTitle>{anime.title}</AnimeTitle>
              <AnimeMeta>
                <span>💖 {anime.favorite_count}</span>
                <span>⭐ {anime.avg_rating ? anime.avg_rating.toFixed(1) : "0.0"}</span>
              </AnimeMeta>
            </RankingInfo>
          </RankingItem>
        ))}
      </RankingList>
      {selectedAnime && (
        <AnimeDetailModal
          anime={selectedAnime}
          isAdded={!!selectedAnime.isAdded}
          onToggle={() => onToggleAnimeList(selectedAnime)}
          onClose={() => setSelectedAnime(null)}
          user={user}
        />
      )}
    </RankingBox>
  );
}