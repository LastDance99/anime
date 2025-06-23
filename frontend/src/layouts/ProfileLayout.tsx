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
  const [loading, setLoading] = useState(true); // ✅ 로딩 상태 추가
  const [showHeader, setShowHeader] = useState(true);
  const lastScroll = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const curr = window.scrollY;
      if (curr > lastScroll.current && curr > 40) {
        setShowHeader(false);
      } else if (curr < lastScroll.current) {
        setShowHeader(true);
      }
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
        setUser(null); // 명시적으로 실패 시 null로 설정
      } finally {
        setLoading(false); // ✅ 로딩 끝
      }
    };

    fetchData();
  }, [userId]);

  // ✅ 아직 로딩 중일 때
  if (loading) return <div>불러오는 중...</div>;

  // ✅ 로딩 끝났는데도 user가 없으면 에러 처리
  if (!user) return <div>유저를 찾을 수 없습니다.</div>;

  return (
    <>
      <ProfileHeader show={showHeader} user={user} setUser={setUser} />
      <ProfileSection user={user} />
      <NavTabBar user={user} />
      <Outlet context={{ user, comments, userAnimeList }} />
    </>
  );
}