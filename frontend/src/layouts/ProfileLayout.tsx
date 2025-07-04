import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProfileHeader from "../components/Profile/ProfileHeader/ProfileHeader";
import ProfileSection from "../components/Profile/ProfileSection/ProfileSection";
import NavTabBar from "../components/Profile/NavTabBar/NavTabBar";
import type { User } from "../types/user";
import type { ProfileComment } from "../types/user";
import type { UserAnimeItem } from "../types/anime";
import { getUserProfile, getUserComments, getFavoriteAnimes } from "../api/profile";
import SettingsModal from "../components/Settings/SettingsModal";

export default function ProfileLayout() {
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation();
  const { t } = useTranslation();

  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<ProfileComment[]>([]);
  const [userAnimeList, setUserAnimeList] = useState<UserAnimeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScroll = useRef(window.scrollY);
  const prevPathRef = useRef<string>("");

  const [openSettings, setOpenSettings] = useState(false);

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

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    const basePath = `/profile/${userId}`;
    const isNowOverview = location.pathname === basePath;
    const wasOverview = prevPathRef.current === basePath;

    if (!wasOverview && isNowOverview) {
      console.log("📦 개요 탭으로 전환됨 → fetchAll()");
      fetchAll();
    }

    prevPathRef.current = location.pathname;
  }, [location.pathname, fetchAll, userId]);

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

  if (loading) return <div>{t("common.loading")}</div>;
  if (!user) return <div>{t("profile.not_found")}</div>;

  return (
    <>
      <ProfileHeader
        show={showHeader}
        isScrolled={isScrolled}
        user={user}
        setUser={setUser}
        onOpenSettings={() => setOpenSettings(true)}
      />
      <ProfileSection user={user} />
      <NavTabBar user={user} />
      <Outlet
        context={{
          user,
          setUser,
          comments,
          userAnimeList,
          fetchAll,
          openSettings,
          setOpenSettings,
        }}
      />
      {openSettings && user && (
        <SettingsModal
          user={user}
          setUser={setUser} // ✅ 추가
          onClose={() => setOpenSettings(false)}
          onSaved={(updatedUser) => {
            setUser(updatedUser);
            fetchAll();
          }}
        />
      )}
    </>
  );
}