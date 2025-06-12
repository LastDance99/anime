import ProfileHeader from "../components/Profile/ProfileHeader/ProfileHeader";
import ProfileSection from "../components/Profile/ProfileSection/ProfileSection";
import NavTabBar from "../components/Profile/NavTabBar/NavTabBar";
import { Outlet, useParams } from "react-router-dom";
import { mockUsers } from "../data/userList";
import { mockProfileComments } from "../data/profile_comments";
import type { AnimeItem } from "../types/anime";
import { ANIME_DATA } from "../data/Anime";


export default function ProfileLayout() {
  const { nickname } = useParams<{ nickname: string }>();
  const user = mockUsers.find(u => u.nickname === nickname);

  if (!user) return <div>유저를 찾을 수 없습니다.</div>;

  const comments = mockProfileComments
    .filter(c => c.user_id === user.id)
    .map(c => ({
      ...c,
      author: mockUsers.find(u => u.id === c.author_id),
    }));

    const userAnimeList: AnimeItem[] = ANIME_DATA;

  return (
    <>
      <ProfileHeader />
      <ProfileSection user={user} />
      <NavTabBar />
      <Outlet context={{ user, comments, userAnimeList }} /> {/* 여기 아래가 바뀜! */}
    </>
  );
}