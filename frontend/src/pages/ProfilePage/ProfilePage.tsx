import React from "react";
import ChatBot from "../../components/ChatBot/ChatBot";
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

type ProfileContext = {
  user: User;
  comments: ProfileComment[];
  userAnimeList: UserAnimeItem[];
};

export default function ProfilePage() {
  const { user, comments, userAnimeList } = useOutletContext<ProfileContext>();
  const favoriteAnimeList = userAnimeList.filter(item => item.is_favorite);

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
            totalAnime={56}
            avgScore={4.5}
            attendance={103}
          />
          <ActivityList list={user.activity ?? []} />
        </ProfileRightColumn>
        <Sidebar />
      </MainBox>
    </Container>
  );
}