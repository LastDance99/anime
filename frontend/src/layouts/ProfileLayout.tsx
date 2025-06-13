import React, { useEffect, useRef, useState } from "react";
import ProfileHeader from "../components/Profile/ProfileHeader/ProfileHeader";
import ProfileSection from "../components/Profile/ProfileSection/ProfileSection";
import NavTabBar from "../components/Profile/NavTabBar/NavTabBar";
import { Outlet, useParams } from "react-router-dom";
import { mockUsers } from "../data/userList";
import { mockProfileComments } from "../data/profile_comments";
import type { AnimeItem } from "../types/anime";
import { ANIME_DATA } from "../data/Anime";
import { userAnimeList } from "../data/userAnimeList";
import type { UserAnimeItem } from "../types/anime";


export default function ProfileLayout() {
  const { nickname } = useParams<{ nickname: string }>();
  const user = mockUsers.find(u => u.nickname === nickname);
  const [showHeader, setShowHeader] = useState(true);
  const lastScroll = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const curr = window.scrollY;
      if (curr > lastScroll.current && curr > 40) {
        setShowHeader(false); // 아래로 내리면 숨김
      } else if (curr < lastScroll.current) {
        setShowHeader(true); // 위로 올리면 노출
      }
      lastScroll.current = curr;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!user) return <div>유저를 찾을 수 없습니다.</div>;

  const comments = mockProfileComments
    .filter(c => c.user_id === user.id)
    .map(c => ({
      ...c,
      author: mockUsers.find(u => u.id === c.author_id),
    }));

  // ★ 유저의 애니리스트만 추출
  const userAnimeRows = userAnimeList.filter(row => row.userId === user.id);
  const userAnimeListData: UserAnimeItem[] = userAnimeRows.map(row => {
    const anime = ANIME_DATA.find(a => a.id === row.animeId);
    if (!anime) return null;
    return {
      ...anime,
      is_favorite: row.is_favorite,
      addedAt: row.addedAt,
      my_rating: row.my_rating ?? 0,  // 평점 없으면 0
    };
  }).filter(Boolean) as UserAnimeItem[];;

  return (  
    <>
      <ProfileHeader show={showHeader} />
      <ProfileSection user={user} />
      <NavTabBar />
      <Outlet context={{ user, comments, userAnimeList: userAnimeListData }} />
    </>
  );
}