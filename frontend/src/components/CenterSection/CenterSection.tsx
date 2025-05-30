import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { galleryList } from "../../data/galleryList";
import { animeList } from '../../data/animeList';
import type { GalleryItem } from "../../types/gallery";
import type { AnimeItem } from '../../types/anime';
import {
  CenterSection,
  TopRow,
  MyRoomBox,
  RoomTitle,
  RoomImage,
  CommentsBox,
  CommentsTitle,
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
  GalleryShadowBox,
  GalleryCardTitle,
  GalleryCardAuthor,
  GalleryCardMeta,
  GalleryMetaItem,

  AniListSectionWrapper,
  AniListHeader,
  AniListTitle,
  AniListMore,
  AniCard,
  AniCardImage,
  AniShadowBox,
  AniCardTitle
} from "./CenterSection.styled";

// 예시 더미 데이터 (생략)

export default function CenterArea() {
  return (
    <CenterSection>
      <TopRow>
        <MyRoomBox>
          <RoomTitle>마이룸</RoomTitle>
          <RoomImage src="/images/myroom.png" alt="마이룸" />
        </MyRoomBox>
        <CommentsBox>
          <CommentsTitle>comments</CommentsTitle>
          {/* 여기에 댓글 리스트 표시 */}
          <ChatInputWrapper>
            <ChatInput placeholder="댓글 입력..." />
          </ChatInputWrapper>
        </CommentsBox>
      </TopRow>

      <BoardSection>
        <BoardBox>
          <BoardHeader>
            <BoardTitle>전체게시판</BoardTitle>
            <MoreBtn>더보기+</MoreBtn>
          </BoardHeader>
          <PostList>
            <PostItem>
              <Tag>#태그</Tag>
              <PostTitle>게시글 제목</PostTitle>
              <CommentCount>3</CommentCount>
            </PostItem>
            {/* 여러개 반복 */}
          </PostList>
        </BoardBox>
        {/* 오른쪽에 갤러리/애니리스트 등 추가 가능 */}
      </BoardSection>

      {/* --- 갤러리 Swiper --- */}
      <GallerySectionWrapper>
        <GalleryHeader>
          <GalleryTitle>--- 갤러리</GalleryTitle>
          <GalleryMore>더보기+</GalleryMore>
        </GalleryHeader>
        <Swiper
          slidesPerView={3}
          spaceBetween={16}
          style={{
            width: "640px",
            height: "220px",
            border: "1px solid #FFB6C1",
            borderRadius: "10px",
            padding: "8px 0",
            background: "#fff"
          }}
        >
          {galleryList.map((item: GalleryItem) => (
            <SwiperSlide key={item.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
      </GallerySectionWrapper>

      {/* --- 애니리스트 Swiper --- */}
      <AniListSectionWrapper>
        <AniListHeader>
          <AniListTitle>--- 애니리스트</AniListTitle>
          <AniListMore>더보기+</AniListMore>
        </AniListHeader>
        <Swiper
          slidesPerView={4}
          spaceBetween={16}
          style={{
            width: "640px",
            height: "220px",
            border: "1px solid #FFB6C1",
            borderRadius: "10px",
            padding: "8px 0",
            background: "#fff"
          }}
        >
          {animeList.map((item: AnimeItem) => (
            <SwiperSlide key={item.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <AniCard>
                <AniCardImage src={item.imgUrl} alt={item.title} />
                <AniShadowBox>
                  <AniCardTitle>{item.title}</AniCardTitle>
                </AniShadowBox>
              </AniCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </AniListSectionWrapper>
    </CenterSection>
  );
}
