import React, { useEffect, useState } from "react";
import MyRoomBox from "../../components/Profile/Center/MyRoomBox/MyRoomBox";
import Introduction from "../../components/Profile/Center/IntroductionBox/Introduction";
import CommentsBox from "../../components/Profile/Center/CommentsBox/CommentsBox";
import AniListBox from "../../components/Profile/Center/AniListBox/AniListBox";
import ActivityList from "../../components/Profile/Center/ActivityFeed/ActivityList";
import StatsBox from "../../components/Profile/Center/StatsBox/StatsBox";
import { useOutletContext } from "react-router-dom";
import {
  Container,
  MainBox,
  ProfileLeftColumn,
  ProfileRightColumn,
  Sidebar,
} from "./ProfilePage.styled";

import type { User, ProfileComment } from "../../types/user";
import type { UserAnimeItem } from "../../types/anime";
import type { Activity } from "../../types/activity";

import { getMyProfile } from "../../api/profile";

type ProfileContext = {
  user: User;
  comments: ProfileComment[];
  userAnimeList: UserAnimeItem[];
};

export default function ProfilePage() {
  const { user, comments, userAnimeList } = useOutletContext<ProfileContext>();
  const favoriteAnimeList = userAnimeList.filter((item) => item.is_favorite);

  const [totalAnime, setTotalAnime] = useState(0);
  const [avgScore, setAvgScore] = useState<number | null>(null);
  const [attendance, setAttendance] = useState(0);
  const [activityList, setActivityList] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getMyProfile();

        setTotalAnime(profile.total_animes);
        setAvgScore(profile.avg_rating);
        setAttendance(profile.total_attendance);
        setActivityList(profile.activity || []);
      } catch (err) {
        console.error("프로필 데이터를 불러오는 중 오류 발생:", err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Container>
      <MainBox>
        <ProfileLeftColumn>
          <MyRoomBox myroom_image={user.myroom_image ?? ""} />
          <Introduction about={user.about ?? ""} />
          <CommentsBox comments={comments} />
          <AniListBox animeList={favoriteAnimeList} />
        </ProfileLeftColumn>
        <ProfileRightColumn>
          <StatsBox
            totalAnime={totalAnime}
            avgScore={avgScore ?? 0}
            attendance={attendance}
          />
          <ActivityList list={activityList} />
        </ProfileRightColumn>
        <Sidebar />
      </MainBox>
    </Container>
  );
}