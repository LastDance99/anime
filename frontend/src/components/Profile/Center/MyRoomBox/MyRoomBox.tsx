import React from "react";
import { MyRoomBox, RoomTitle, RoomImage } from "./MyRoomBox.styled";
import { getFullImageUrl } from "../../../../utils/getFullImageUrl";

const DEFAULT_ROOM_IMG = import.meta.env.VITE_DEFAULT_ROOM_IMG;

export default function MyRoom({ myroom_image }: { myroom_image: string }) {

  return (
    <MyRoomBox>
      <RoomTitle>My Room</RoomTitle>
      <RoomImage
        src={
          myroom_image
            ? getFullImageUrl(myroom_image)
            : DEFAULT_ROOM_IMG
        }
        alt="마이룸"
      />
    </MyRoomBox>
  );
}