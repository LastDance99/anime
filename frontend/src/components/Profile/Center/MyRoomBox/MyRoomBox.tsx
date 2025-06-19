import React from "react";
import { MyRoomBox, RoomTitle, RoomImage } from "./MyRoomBox.styled";
import { getFullImageUrl } from "../../../../utils/getFullImageUrl"; // 경로 맞게 조정

export default function MyRoom({ myroom_image }: { myroom_image: string }) {
  console.log("MyRoomBox 이미지", myroom_image);

  return (
    <MyRoomBox>
      <RoomTitle>My Room</RoomTitle>
      <RoomImage
        src={
          myroom_image
            ? getFullImageUrl(myroom_image)
            : "/images/default-room.png"
        }
        alt="마이룸"
      />
    </MyRoomBox>
  );
}