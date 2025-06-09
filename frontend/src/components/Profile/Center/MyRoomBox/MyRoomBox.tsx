import React from "react";
import { MyRoomBox, RoomTitle, RoomImage } from "./MyRoomBox.styled";

export default function MyRoom({ myroom_image }: { myroom_image: string }) {
  
  return (
    <MyRoomBox>
      <RoomTitle>My Room</RoomTitle>
      <RoomImage src={myroom_image} alt="마이룸" />
    </MyRoomBox>
  );
}