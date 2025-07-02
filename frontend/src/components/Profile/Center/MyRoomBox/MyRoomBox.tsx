import React from "react";
import { MyRoomBox, RoomTitle, RoomImage } from "./MyRoomBox.styled";
import { getFullImageUrl } from "../../../../utils/getFullImageUrl";

export default function MyRoom({ myroom_image }: { myroom_image: string }) {

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