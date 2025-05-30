// styles/CenterSection.styled.ts
import styled from "styled-components";

export const CenterSection = styled.section`
  width: 715px;
  height: 715px;
  background: #FCEEF5;
  border: 1px solid #FFB6C1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;
  padding: 20px;
`;

export const TopRow = styled.div`
  width: 634px;
  height: 350px;
  display: flex;
  gap: 24px;
`;

export const MyRoomBox = styled.div`
  width: 380px;
  height: 300px;
  display: flex;
  flex-direction: column;
`;

export const RoomTitle = styled.div`
  font-size: 24px;
  font-family: 'Quicksand', sans-serif;
  font-weight: bold;
  color: #222;
  margin-bottom: 10px;
`;

export const RoomImage = styled.img`
  width: 380px;
  height: 300px;
  object-fit: cover;
  border-radius: 16px;
  border: 1px solid #D6C6E1;
  background: #fff;
`;

export const CommentsBox = styled.div`
  width: 200px;
  height: 300px;
  background: #fff;
  border: 1px solid #000;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const CommentsTitle = styled.div`
  font-size: 24px;
  font-family: 'Quicksand', sans-serif;
  font-weight: bold;
  color: #222;
  margin-bottom: 10px;
`;

export const ChatInputWrapper = styled.div`
  width: 180px;
  height: 30px;
  background: #fff;
  border: 1px solid #000;
  border-radius: 6px;
  margin: 8px auto 0 auto;
  display: flex;
  align-items: center;
`;

export const ChatInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  font-size: 14px;
  background: transparent;
  outline: none;
  padding: 0 8px;
`;

export const BoardSection = styled.div`
  width: 634px;
  height: 224px;
  display: flex;
  gap: 34px;
`;

export const BoardBox = styled.div`
  width: 300px;
  height: 224px;
  display: flex;
  flex-direction: column;
`;

export const BoardHeader = styled.div`
  width: 300px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #FFB6C1;
`;

export const BoardTitle = styled.div`
  font-size: 14px;
  font-family: 'Quicksand', sans-serif;
  font-weight: bold;
  color: #222;
`;

export const MoreBtn = styled.div`
  font-size: 11px;
  font-family: 'Quicksand', sans-serif;
  font-weight: bold;
  color: #999;
  cursor: pointer;
`;

export const PostList = styled.div`
  width: 300px;
  height: 198px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const PostItem = styled.div`
  width: 300px;
  height: 32px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #D6C6E1;
  gap: 6px;
`;

export const Tag = styled.span`
  font-size: 12px;
  font-family: 'Cafe24SsurroundAir', sans-serif;
  font-weight: 300;
  color: #487fff;
  margin-right: 6px;
`;

export const PostTitle = styled.span`
  font-size: 13px;
  font-family: 'Cafe24SsurroundAir', sans-serif;
  font-weight: 300;
  color: #222;
`;

export const CommentCount = styled.span`
  font-size: 11px;
  font-family: 'Cafe24SsurroundAir', sans-serif;
  font-weight: 300;
  color: #FF4B4B;
  margin-left: auto;
`;

/* ------------- 갤러리 섹션 ------------- */

export const GallerySectionWrapper = styled.section`
  width: 640px;
  height: 246px;
  margin-bottom: 24px;
`;

export const GalleryHeader = styled.div`
  width: 640px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #FFB6C1;
`;

export const GalleryTitle = styled.div`
  font-size: 14px;
  font-family: 'Quicksand', sans-serif;
  font-weight: bold;
  color: #222;
`;

export const GalleryMore = styled.button`
  background: none;
  border: none;
  font-size: 11px;
  font-family: 'Quicksand', sans-serif;
  font-weight: bold;
  color: #999;
  cursor: pointer;
`;

// 갤러리 스와이프 영역
export const GallerySwiper = styled.div`
  width: 640px;
  height: 220px;
  border: 1px solid #FFB6C1;
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  padding: 8px 0;
  position: relative;
`;

// 갤러리 이미지 카드
export const GalleryImageCard = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  flex: 0 0 auto;
  margin-right: 8px;
`;

export const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

// 그림자 표시(오버레이)
export const GalleryShadowBox = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 200px;
  height: 60px;
  background: linear-gradient(180deg, transparent 10%, rgba(0,0,0,0.4) 100%);
  color: #ccc;
  padding: 6px 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const GalleryCardTitle = styled.div`
  font-size: 12px;
  font-family: 'Cafe24Ssurround', sans-serif;
  font-weight: bold;
  color: #ccc;
`;

export const GalleryCardAuthor = styled.div`
  font-size: 10px;
  font-family: 'Cafe24Ssurround', sans-serif;
  font-weight: bold;
  color: #ccc;
  margin-bottom: 3px;
`;

export const GalleryCardMeta = styled.div`
  display: flex;
  gap: 2px;
`;

export const GalleryMetaItem = styled.div`
  width: 40px;
  height: 10px;
  display: flex;
  align-items: center;
  background: #7c7c7c;
  color: #fff;
  font-size: 8px;
  font-family: 'Cafe24Ssurround', sans-serif;
  font-weight: bold;
  border-radius: 4px;
  justify-content: center;
  margin-right: 2px;
  gap: 2px;
  opacity: 0.88;
  padding: 0 4px;
`;

/* ------------- 애니리스트 섹션 ------------- */

export const AniListSectionWrapper = styled.section`
  width: 640px;
  height: 246px;
`;

export const AniListHeader = styled.div`
  width: 640px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #FFB6C1;
`;

export const AniListTitle = styled.div`
  font-size: 14px;
  font-family: 'Quicksand', sans-serif;
  font-weight: bold;
  color: #222;
`;

export const AniListMore = styled.button`
  background: none;
  border: none;
  font-size: 11px;
  font-family: 'Quicksand', sans-serif;
  font-weight: bold;
  color: #999;
  cursor: pointer;
`;

// 애니리스트 스와이프 영역
export const AniListSwiper = styled.div`
  width: 640px;
  height: 220px;
  border: 1px solid #FFB6C1;
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  padding: 8px 0;
  position: relative;
`;

// 애니 카드
export const AniCard = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  flex: 0 0 auto;
  margin-right: 8px;
`;

export const AniCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const AniShadowBox = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 140px;
  height: 40px;
  background: linear-gradient(180deg, transparent 10%, rgba(0,0,0,0.45) 100%);
  color: #ccc;
  padding: 4px 8px;
  display: flex;
  align-items: flex-end;
`;

export const AniCardTitle = styled.div`
  font-size: 10px;
  font-family: 'Cafe24Ssurround', sans-serif;
  font-weight: bold;
  color: #ccc;
`;

