import React, { useEffect, useState, useRef, useCallback } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScroll = useRef(window.scrollY);

  // ★ openSettings, setOpenSettings 여기서 관리!
  const [openSettings, setOpenSettings] = useState(false);

  // fetchAll: 프로필 전체 강제 새로고침 함수
  const fetchAll = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setUser(null);
    setComments([]);
    setUserAnimeList([]);
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
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // 스크롤 이벤트
  useEffect(() => {
    const handleScroll = () => {
      const curr = window.scrollY;
      if (curr > lastScroll.current && curr > 40) {
        setShowHeader(false);
      } else if (curr < lastScroll.current) {
        setShowHeader(true);
      }
      setIsScrolled(curr > 0);
      lastScroll.current = curr;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // userId 변경/첫 진입시 전체 refetch
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  if (loading) return <div>불러오는 중...</div>;
  if (!user) return <div>유저를 찾을 수 없습니다.</div>;

  return (
    <>
      {/* “설정” 버튼에 트리거 함수만 넘김 */}
      <ProfileHeader show={showHeader} isScrolled={isScrolled} user={user} setUser={setUser} onOpenSettings={() => setOpenSettings(true)} />
      <ProfileSection user={user} />
      <NavTabBar user={user} />
      {/* openSettings, setOpenSettings, fetchAll 전부 context로 내림 */}
      <Outlet context={{ user, comments, userAnimeList, fetchAll, openSettings, setOpenSettings }} />
    </>
  );
}