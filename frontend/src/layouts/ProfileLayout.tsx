import React, { useEffect, useState, useRef } from "react";
import { useParams, Outlet } from "react-router-dom";
import ProfileHeader from "../components/Profile/ProfileHeader/ProfileHeader";
import ProfileSection from "../components/Profile/ProfileSection/ProfileSection";
import NavTabBar from "../components/Profile/NavTabBar/NavTabBar";
import type { User } from "../types/user";
import type { ProfileComment } from "../types/user";
import type { UserAnimeItem } from "../types/anime";
import { getUserProfile, getUserComments, getFavoriteAnimes } from "../api/profile";

export default function ProfileLayout() {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<ProfileComment[]>([]);
  const [userAnimeList, setUserAnimeList] = useState<UserAnimeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false); // ✅ 추가
  const lastScroll = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const curr = window.scrollY;
      if (curr > lastScroll.current && curr > 40) {
        setShowHeader(false);
      } else if (curr < lastScroll.current) {
        setShowHeader(true);
      }
      setIsScrolled(curr > 0); // ✅ 맨 위 아님 → 불투명도 100%
      lastScroll.current = curr;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        const profileRes = await getUserProfile(Number(userId));
        setUser(profileRes);

        const [commentsRes, animeRes] = await Promise.all([
          getUserComments(profileRes.id),
          getFavoriteAnimes(profileRes.id),
        ]);

        setComments(commentsRes);
        setUserAnimeList(animeRes);
      } catch (err) {
        console.error("❌ 프로필 로딩 실패", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <div>불러오는 중...</div>;
  if (!user) return <div>유저를 찾을 수 없습니다.</div>;

  return (
    <>
      <ProfileHeader show={showHeader} isScrolled={isScrolled} user={user} setUser={setUser} />
      <ProfileSection user={user} />
      <NavTabBar user={user} />
      <Outlet context={{ user, comments, userAnimeList }} />
    </>
  );
}