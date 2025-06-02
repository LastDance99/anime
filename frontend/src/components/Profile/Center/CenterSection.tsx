import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { galleryList } from "../../../data/galleryList";
import { animeList } from '../../../data/animeList';
import type { GalleryItem } from "../../../types/gallery";
import type { AnimeItem } from '../../../types/anime';
import {
  CenterSection,
  TopRow,
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
  BoardSection,
  BoardBox,
  BoardHeader,
  BoardTitle,
  MoreBtn,
  PostList,
  PostItem,
  Tag,
  PostTitle,
  CommentCount,
  GallerySectionWrapper,
  GalleryHeader,
  GalleryTitle,
  GalleryMore,
  GalleryImageCard,
  GalleryImage,
  GallerySwiper,
  GalleryShadowBox,
  GalleryCardTitle,
  GalleryCardAuthor,
  GalleryCardMeta,
  GalleryMetaItem,
  AniListSectionWrapper,
  AniListHeader,
  AniListTitle,
  AniListMore,
  AniListSwiper,
  AniCard,
  AniCardImage,
  AniShadowBox,
  AniCardTitle,
} from "./CenterSection.styled";

export default function CenterArea() {
  return (
    <CenterSection>
      <TopRow>
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
      </TopRow>

      <BoardSection>
        {/* 전체 게시판 */}
        <BoardBox>
          <BoardHeader>
            <BoardTitle>전체게시판</BoardTitle>
            <MoreBtn>더보기+</MoreBtn>
          </BoardHeader>
          <PostList>
            {Array(6).fill(0).map((_, i) => (
              <PostItem key={i}>
                <Tag>#자유</Tag>
                <PostTitle>게시글 제목 예시{i + 1}</PostTitle>
                <CommentCount>({i + 2})</CommentCount>
              </PostItem>
            ))}
          </PostList>
        </BoardBox>

        {/* --- 게시글 */}
        <BoardBox>
          <BoardHeader>
            <BoardTitle>--- 게시글</BoardTitle>
            <MoreBtn>더보기+</MoreBtn>
          </BoardHeader>
          <PostList>
            {Array(6).fill(0).map((_, i) => (
              <PostItem key={i}>
                <Tag>#공지</Tag>
                <PostTitle>공지사항 예시{i + 1}</PostTitle>
                <CommentCount>({i})</CommentCount>
              </PostItem>
            ))}
          </PostList>
        </BoardBox>
      </BoardSection>

      {/* 갤러리 Swiper */}
      <GallerySectionWrapper>
        <GalleryHeader>
          <GalleryTitle>--- 갤러리</GalleryTitle>
          <GalleryMore>더보기+</GalleryMore>
        </GalleryHeader>
        <GallerySwiper>
          <Swiper slidesPerView={3} spaceBetween={10}>
            {galleryList.map((item: GalleryItem) => (
              <SwiperSlide key={item.id}>
                <GalleryImageCard>
                  <GalleryImage src={item.imgUrl} alt={item.title} />
                  <GalleryShadowBox>
                    <GalleryCardTitle>{item.title}</GalleryCardTitle>
                    <GalleryCardAuthor>{item.author}</GalleryCardAuthor>
                    <GalleryCardMeta>
                      <GalleryMetaItem>👁‍🗨 {item.views}</GalleryMetaItem>
                      <GalleryMetaItem>💬 {item.comments}</GalleryMetaItem>
                      <GalleryMetaItem>👍 {item.likes}</GalleryMetaItem>
                    </GalleryCardMeta>
                  </GalleryShadowBox>
                </GalleryImageCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </GallerySwiper>
      </GallerySectionWrapper>

      {/* 애니리스트 Swiper */}
      <AniListSectionWrapper>
        <AniListHeader>
          <AniListTitle>--- 애니리스트</AniListTitle>
          <AniListMore>더보기+</AniListMore>
        </AniListHeader>
        <AniListSwiper>
          <Swiper slidesPerView={4} spaceBetween={10}>
            {animeList.map((item: AnimeItem) => (
              <SwiperSlide key={item.id}>
                <AniCard>
                  <AniCardImage src={item.imgUrl} alt={item.title} />
                  <AniShadowBox>
                    <AniCardTitle>{item.title}</AniCardTitle>
                  </AniShadowBox>
                </AniCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </AniListSwiper>
      </AniListSectionWrapper>
    </CenterSection>
  );
}
