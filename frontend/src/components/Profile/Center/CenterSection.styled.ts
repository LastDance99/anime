// styles/CenterSection.styled.ts
import styled from "styled-components";

export const CenterSection = styled.section`
  width: 940px;
  background: #FCEEF5;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  padding: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
  &::-webkit-scrollbar-track {
    background: #fceef5;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff99bb;
    border-radius: 10px;
    border: 1px solid #fceef5;
  }
`;

export const TopRow = styled.div`
  width: 634px;
  height: 350px;
  display: flex;
  gap: 52px;
`;

export const MyRoomBox = styled.div`
  width: 410px;
  height: 320px;
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
  width: 410px;
  height: 320px;
  object-fit: cover;
  border-radius: 16px;
  border: 1px solid #FFB6C1;
  background: #fff;
`;

export const CommentsTitle = styled.div`
  font-size: 24px;
  font-family: 'Quicksand', sans-serif;
  font-weight: bold;
  color: #222;
  margin-bottom: 10px;
`;

export const CommentsBox = styled.div`
  width: 200px;
  height: 350px;
  display: flex;
  flex-direction: column;
`;

export const ChatContentBox = styled.div`
  width: 200px;
  height: 300px;
  background: #fff;
  border: 1px solid #FFB6C1;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ChatScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px;
  display: flex;
  padding-right: 6px;
  margin-right: -6px;
  flex-direction: column;
  gap: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff99bb;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: #fceef5;
  }
`;

export const ChatItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 6px;
`;

export const ProfileImg = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
`;

export const ChatTextBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChatNickname = styled.div`
  font-size: 12px;
  font-weight: bold;
`;

export const ChatText = styled.div`
  font-size: 12px;
`;

export const ChatInputWrapper = styled.div`
  width: 90%;
  height: 28px;
  background: #fff;
  border: 1px solid #FFB6C1;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  margin: 10px auto;
`;

export const ChatInput = styled.input`
  width: 100%;
  height: 80%;
  border: none;
  font-size: 14px;
  background: transparent;
  outline: none;
  padding: 0 8px;
`;

/* ------------- 애니리스트 섹션 ------------- */

export const AniListSectionWrapper = styled.div`
  width: 410px;
`;

export const AniListHeader = styled.div`
  width: 410px;
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

// export const AniListMore = styled.button`
//   background: none;
//   border: none;
//   font-size: 11px;
//   font-family: 'Quicksand', sans-serif;
//   font-weight: bold;
//   color: #999;
//   cursor: pointer;
// `;

export const CardBox = styled.div`
  width: 100%;
  display: flex;
  padding: 20px;
  flex-wrap: wrap;       // 여러 줄로 자동 줄바꿈!
  gap: 16px;             // 카드 사이 간격
  background: #FFB6C1;
`;

// 애니 카드
export const AniCard = styled.div`
  width: 100%;
  max-width: 80px;
  height: 120px;
  flex: 0 0 auto;
  overflow: hidden;
  box-sizing: border-box;
`;

export const AniCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

// export const AniShadowBox = styled.div`
//   position: absolute;
//   left: 0;
//   bottom: 0;
//   width: 140px;
//   height: 40px;
//   background: linear-gradient(180deg, transparent 10%, rgba(0,0,0,0.45) 100%);
//   color: #ccc;
//   padding: 4px 8px;
//   display: flex;
//   align-items: flex-end;
// `;

// export const AniCardTitle = styled.div`
//   font-size: 10px;
//   font-family: 'Cafe24Ssurround', sans-serif;
//   font-weight: bold;
//   color: #ccc;
// `;

