import ChatBot from "../../components/ChatBot/ChatBot";
import CenterSection from "../../components/Profile/Center/CenterSection";
import ProfileCard from "../../components/Profile/ProfileCard/ProfileCard";
import Header from "../../components/Profile/ProfileHeader/ProfileHeader";
import { mockUsers } from "../../data/userList";
import { useParams } from "react-router-dom";
import { Container, MainBox, } from "./ProfilePage.styled";

export default function ProfilePage() {
  // 파라미터 읽기!
  const { nickname } = useParams<{ nickname: string }>();
  // user 찾기 (실제 서비스라면 nickname 대신 userId 추천)
  const user = mockUsers.find(u => u.name === nickname);

  console.log('nickname:', nickname, 'user:', user);
  if (!user) return <div>유저를 찾을 수 없습니다.</div>;

  return (
    <Container>
      <Header />
      <MainBox>
        <ProfileCard user={user} />
        <CenterSection />
        <ChatBot />
      </MainBox>
    </Container>
  );
}