import React from "react";
import ChatBot from "../../components/ChatBot/ChatBot";
import MyRoomBox from "../../components/Profile/Center/MyRoomBox/MyRoomBox";
import Introduction from "../../components/Profile/Center/IntroductionBox/Introduction";
import CommentsBox from "../../components/Profile/Center/CommentsBox/CommentsBox";
import AniListBox from "../../components/Profile/Center/AniListBox/AniListBox";
import ProfileSection from "../../components/Profile/ProfileSection/ProfileSection";
import Header from "../../components/Profile/ProfileHeader/ProfileHeader";
import NavTabBar from "../../components/Profile/NavTabBar/NavTabBar";
import ActivityList from "../../components/Profile/Center/ActivityFeed/ActivityList";
import StatsBox from "../../components/Profile/Center/StatsBox/StatsBox";
import { mockUsers } from "../../data/userList";
import { mockProfileComments } from "../../data/profile_comments";
import { animeList } from "../../data/animeList";
import { useParams } from "react-router-dom";
import { Container, MainBox, ProfileLeftColumn, ProfileRightColumn, } from "./ProfilePage.styled";

export default function ProfilePage() {
  const { nickname } = useParams<{ nickname: string }>();
  const user = mockUsers.find(u => u.nickname === nickname);

  if (!user) return <div>유저를 찾을 수 없습니다.</div>;

  const comments = mockProfileComments
    .filter(c => c.user_id === user.id)
    .map(c => ({
      ...c,
      author: mockUsers.find(u => u.id === c.author_id),
    }));

  return (
    <Container>
      <Header />
      <ProfileSection user={user} />
      <NavTabBar />
      <MainBox>
        <ProfileLeftColumn>
          <MyRoomBox myroom_image={user.myroom_image} />
          <Introduction about={user.about} />
          <CommentsBox comments={comments} />
          <AniListBox animeList={animeList} />
        </ProfileLeftColumn>
        <ProfileRightColumn>
          <StatsBox
            totalAnime={56}
            avgScore={4.5}
            heartCount={136}
            attendance={103}
          />
          <ActivityList list={user.activity ?? []} />
        </ProfileRightColumn>
        <ChatBot />
      </MainBox>
    </Container>
  );
}