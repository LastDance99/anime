import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 16px;
`;

export const CategoryText = styled.div<{ $type?: "board" | "gallery" }>`
  display: inline-block;
  font-size: 0.92rem;
  font-weight: 600;
  color: ${({ $type }) =>
    $type === "gallery" ? "#de3e5b" : "#2071b2"};
  letter-spacing: 0.05em;
`;

export const TitleText = styled.h2`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 4px;
`;

export const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Profile = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Nickname = styled.div`
  font-weight: 600;
`;

export const Meta = styled.div`
  font-size: 0.8rem;
  color: #aaa;
`;

export const ContentBox = styled.div`
  background: #fff;
  border: 1px solid #FFB6C1;
  border-radius: 6px;
  padding: 16px;
  overflow: hidden;
  height: 900px;

  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

export const ScrollableContent = styled.div`
  height: 100%;
  overflow-y: auto;
  white-space: pre-line;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MainImage = styled.img`
  max-width: 100%;
  height: auto;
  max-height: 240px;
  border-radius: 6px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
`;

export const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MoreLink = styled.div`
  font-size: 0.85rem;
  color: #999;
  cursor: pointer;
`;

export const IconButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const IconBtn = styled.button<{ $liked?: boolean }>`
  background: none;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  color: ${({ $liked }) => ($liked ? "#e2486e" : "#444")};
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 2px;

  &:hover {
    color: #e2486e;
  }
`;