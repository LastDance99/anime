import React from "react";
import {
  Card,
  Avatar,
  Name,
  Email,
  LogoutButton,
  BottomBox,
  TopBox,
  FontBox,
  Font,
  FontRow,
  CustomButton,
} from "./ProfileCard.styled";
import type { User } from "../../../types/user";
import { getFullImageUrl } from "../../../utils/getFullImageUrl"; // 추가!

interface BoardProfileProps {
  user: User;
}

const AnimeProfile: React.FC<BoardProfileProps> = ({ user }) => {
  return (
    <Card>
      <TopBox>
        <Avatar>
          {/* 프로필 이미지가 있으면 이미지, 없으면 첫 글자 */}
          {user.profile_image
            ? (
                <img
                  src={getFullImageUrl(user.profile_image)}
                  alt={user.nickname}
                  style={{ width: 80, height: 80, borderRadius: "50%" }}
                  onError={e => {
                    e.currentTarget.src = "/images/default-profile.png";
                  }}
                />
              )
            : user.nickname?.charAt(0) || "?"}
        </Avatar>
        <FontBox>
          <Name>{user.nickname}</Name>
          <Email>{user.email}</Email>
          <Font>포인트: {user.point ?? 0}</Font>
        </FontBox>
        <LogoutButton onClick={() => alert("로그아웃!")}>
          로그아웃
        </LogoutButton>
      </TopBox>
      <BottomBox>
        <FontBox
          style={{
            borderRight: "1px solid #FFB6C1",
            width: "40%",
          }}>
          <FontRow><Font>출석일:</Font>{user.attendance ?? 0}개</FontRow>
          <FontRow><Font>내가 리스트:</Font>{user.postCount ?? 0}개</FontRow>
          <FontRow><Font>내가 쓴 리뷰:</Font>{user.commentCount ?? 0}개</FontRow>
        </FontBox>
        <CustomButton>내 리스트</CustomButton>
      </BottomBox>
    </Card>
  );
};

export default AnimeProfile;