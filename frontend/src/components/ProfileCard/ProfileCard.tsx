import React from "react";
import {
  Card,
  Avatar,
  Name,
  Email,
  BottomBox,
  TopBox,
  FontBox,
  Font,
  CustomButton,
} from "./ProfileCard.styled";

const BoardProfile: React.FC = () => {
  const user = {
    name: "이진욱",
    email: "jinwook3703@naver.com",
    point: 1234,
    postCount: 0,
    commentCount: 0,
    days: 0,
  };

  return (
    <Card>
      <TopBox>
        <Avatar>1</Avatar>
        <FontBox>
          <Name>{user.name}</Name>
          <Email>{user.email}</Email>
          <Font>포인트: {user.point}</Font>
        </FontBox>
      </TopBox>
      <BottomBox>
        <FontBox
        style = {{
          borderRight: "1px solid #FFB6C1",
          width: "40%",
          }}>
          <Font>내가 쓴 게시글: {user.postCount}개</Font>
          <Font>내가 쓴 댓글: {user.commentCount}개</Font>
        </FontBox>
        <CustomButton>글쓰기</CustomButton>
      </BottomBox>
    </Card>
  );
};

export default BoardProfile;
