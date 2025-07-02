import React, { useEffect, useState } from "react";
import MyRoomBox from "../../components/Profile/Center/MyRoomBox/MyRoomBox";
import Introduction from "../../components/Profile/Center/IntroductionBox/Introduction";
import CommentsBox from "../../components/Profile/Center/CommentsBox/CommentsBox";
import AniListBox from "../../components/Profile/Center/AniListBox/AniListBox";
import ActivityList from "../../components/Profile/Center/ActivityFeed/ActivityList";
import StatsBox from "../../components/Profile/Center/StatsBox/StatsBox";
import SettingsModal from "../../components/Settings/SettingsModal";
import AttendanceCalendar from "../../components/Profile/AttendanceCalendar";
import GenreStatsChart from "../../components/Profile/GenreStatsChart/GenreStatsChart";
import { useOutletContext } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Container,
  MainBox,
  ProfileLeftColumn,
  ProfileRightColumn,
  Sidebar,
} from "./ProfilePage.styled";

import type { User, ProfileComment } from "../../types/user";
import type { UserAnimeItem } from "../../types/anime";
import { getUserProfile, getUserComments } from "../../api/profile";
import { useAuth } from "../../contexts/AuthContext";

type ProfileContext = {
  currentUser: User;
  user: User;
  comments: ProfileComment[];
  userAnimeList: UserAnimeItem[];
  fetchAll: () => void;
  openSettings: boolean;
  setOpenSettings: (b: boolean) => void;
};

export default function ProfilePage() {
  const { t } = useTranslation();
  const {
    user,
    comments: initialComments,
    userAnimeList,
    fetchAll,
    openSettings,
    setOpenSettings,
  } = useOutletContext<ProfileContext>() || {};
  const { currentUser, loading } = useAuth();

  const [comments, setComments] = useState<ProfileComment[]>(initialComments || []);
  const [totalAnime, setTotalAnime] = useState(0);
  const [avgScore, setAvgScore] = useState<number | null>(null);
  const [attendance, setAttendance] = useState(0);

  if (loading || !currentUser || !user) {
    return <div>{t("loading")}</div>;
  }

  const isMyPage = currentUser.id === user.id;

  const fetchComments = async () => {
    try {
      const res = await getUserComments(user.id);
      setComments(res);
    } catch (err) {
      console.error("댓글 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfile(user.id);
        setTotalAnime(profile.total_animes);
        setAvgScore(profile.avg_rating);
        setAttendance(profile.total_attendance);
      } catch (err) {
        console.error("프로필 데이터를 불러오는 중 오류 발생:", err);
      }
    };
    fetchProfile();
  }, [user.id]);

  

  return (
    <Container>
      <MainBox>
        <ProfileLeftColumn>
          <MyRoomBox myroom_image={user.myroom_image ?? ""} />
          <Introduction about={user.about ?? ""} userId={user.id} isMyPage={isMyPage} />
          <CommentsBox
            comments={comments}
            userId={user.id}
            onRefresh={fetchComments}
            isMyPage={isMyPage}
          />
          <AniListBox animeList={userAnimeList} />
        </ProfileLeftColumn>
        <ProfileRightColumn>
          <StatsBox
            totalAnime={totalAnime}
            avgScore={avgScore ?? 0}
            attendance={attendance}
          />
          <ActivityList userId={user.id} />
        </ProfileRightColumn>
        <Sidebar>
          <AttendanceCalendar userId={user.id} />
          <GenreStatsChart userId={user.id} />
        </Sidebar>
      </MainBox>
      {openSettings && (
        <SettingsModal
          user={user}
          setUser={() => {}}
          onClose={() => setOpenSettings(false)}
          onSaved={fetchAll}
        />
      )}
    </Container>
  );
}