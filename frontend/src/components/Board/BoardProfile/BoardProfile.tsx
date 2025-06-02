import React from "react";
import { Card, Avatar, Name, Email, Button } from "./BoardProfile.styled";

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
      <Avatar />
      <Name>{user.name}</Name>
      <Email>{user.email}</Email>
      <div>포인트: {user.point}</div>
      <div>출석일: {user.days}일</div>
      <div>내가 쓴 게시글: {user.postCount}개</div>
      <div>내가 쓴 댓글: {user.commentCount}개</div>
      <Button>글쓰기</Button>
    </Card>
  );
};

export default BoardProfile;
