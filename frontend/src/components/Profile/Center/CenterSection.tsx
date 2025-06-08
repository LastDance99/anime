import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { animeList } from '../../../data/animeList';
import type { AnimeItem } from '../../../types/anime';
import {
  CenterSection,
  MyRoomBox,
  RoomTitle,
  RoomImage,
  CommentsBox,
  CommentsTitle,
  ChatContentBox,
  ChatScrollArea,
  ChatItem,
  ProfileImg,
  ChatTextBlock,
  ChatNickname,
  ChatText,
  ChatInputWrapper,
  ChatInput,
  AniListSectionWrapper,
  AniListHeader,
  AniListTitle,
  // AniListMore,
  AniCard,
  AniCardImage,
  CardBox,
  // AniShadowBox,
  // AniCardTitle,
} from "./CenterSection.styled";

export default function CenterArea() {
  return (
    <CenterSection>
      <MyRoomBox>
        <RoomTitle>My Room</RoomTitle>
        <RoomImage src="/images/bgimg1.jpg" alt="마이룸" />
      </MyRoomBox>

      <CommentsBox>
        <CommentsTitle>Comments</CommentsTitle>

        <ChatContentBox>
          <ChatScrollArea>
            {Array(6).fill(0).map((_, i) => (
              <ChatItem key={i}>
                <ProfileImg src="/images/user_profile.png" alt="profile" />
                <ChatTextBlock>
                  <ChatNickname>닉네임{i + 1}</ChatNickname>
                  <ChatText>입력된 채팅 내용</ChatText>
                </ChatTextBlock>
              </ChatItem>
            ))}
          </ChatScrollArea>
          
          <ChatInputWrapper>
            <ChatInput placeholder="채팅 입력란" />
          </ChatInputWrapper>
        </ChatContentBox>
      </CommentsBox>

      {/* 애니리스트 Swiper */}
      <AniListSectionWrapper>
        <AniListHeader>
          <AniListTitle>--- 애니리스트</AniListTitle>
          {/* <AniListMore>더보기+</AniListMore> */}
        </AniListHeader>
        <CardBox>
          {animeList.slice(0, 20).map((item: AnimeItem) => (
            <AniCard key={item.id}>
              <AniCardImage src={item.imgUrl} alt={item.title} />
            </AniCard>
          ))}
        </CardBox>
      </AniListSectionWrapper>
    </CenterSection>
  );
}
