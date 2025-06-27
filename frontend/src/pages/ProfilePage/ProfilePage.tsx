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

import { getMyProfile, getUserComments } from "../../api/profile";

type ProfileContext = {
  user: User;
  comments: ProfileComment[];
  userAnimeList: UserAnimeItem[];
};

export default function ProfilePage() {
  const { user, comments: initialComments, userAnimeList } =
    useOutletContext<ProfileContext>();

  const [comments, setComments] = useState<ProfileComment[]>(initialComments);
  const [totalAnime, setTotalAnime] = useState(0);
  const [avgScore, setAvgScore] = useState<number | null>(null);
  const [attendance, setAttendance] = useState(0);

  // ✅ 댓글 목록 새로고침
  const fetchComments = async () => {
    try {
      const res = await getUserComments(user.id); // comments는 res.data.results
      setComments(res);
    } catch (err) {
      console.error("댓글 불러오기 실패:", err);
    }
  };

  // ✅ 프로필 통계 정보 불러오기
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getMyProfile();
        setTotalAnime(profile.total_animes);
        setAvgScore(profile.avg_rating);
        setAttendance(profile.total_attendance);
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
          <Introduction about={user.about ?? ""} userId={user.id} />
          <CommentsBox
            comments={comments}
            userId={user.id}
            onRefresh={fetchComments}
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
        <Sidebar>뭐가 들어가면 좋을까용?</Sidebar>
      </MainBox>
    </Container>
  );
}