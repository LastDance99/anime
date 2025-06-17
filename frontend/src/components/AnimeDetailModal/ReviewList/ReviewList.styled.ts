import styled from "styled-components";

// 리뷰 전체 리스트
export const List = styled.div`
  width: 600px;
  padding: 0 0 0 0;
  background: #fff;
`;

// 각 리뷰 아이템
export const Item = styled.div`
  padding: 18px 0 13px 0;
  border-bottom: 1px solid #f8c9e7;
  &:last-child {
    border-bottom: none;
  }
`;

// 수정 버튼
export const EditBtn = styled.button`
  margin-left: 8px;
  background: none;
  color: #e07cb9;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  padding: 2px 7px;
  border-radius: 6px;
  transition: background 0.14s;
  &:hover { 
    background: #f8c9e741;
    color: #c34f97;
    text-decoration: underline;
  }
`;

// 삭제 버튼
export const DeleteBtn = styled(EditBtn)`
  color: #ea5e6d;
  &:hover { color: #ad2531; background: #faeaea; }
`;

// 내용
export const Content = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-famaily: ${({ theme }) => theme.fonts.cafe24Light};
  font-weight: ${({ theme }) => theme.Weights.medium};
  color: #493d5a;
  line-height: 1.75;
  word-break: break-all;
  padding-left: 4px;
  margin-bottom: 2px;
`;

// 정렬 탭 그룹
export const SortTabGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
  align-items: center;
  padding: 0 4px;
  justify-content: flex-end;
`;

// 정렬 탭 버튼
export const SortTab = styled.button<{ selected?: boolean }>`
  background: ${({ selected }) => (selected ? "#ffe5ae" : "transparent")};
  color: ${({ selected }) => (selected ? "#e29c00" : "#bbb")};
  border: none;
  border-radius: 12px;
  padding: 6px 14px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s, color 0.16s;

  &:hover,
  &:focus {
    background: #fff6d8;
    color: #c08900;
  }
`;

export const ReviewRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ReviewerImg = styled.img`
  border-radius: 50%;
  margin-right: 8px;
  width: 32px;
  height: 32px;
  object-fit: cover;
`;

export const ReviewerInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0;
`;

export const ReviewerName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-famaily: ${({ theme }) => theme.fonts.cafe24Light};
  font-weight: ${({ theme }) => theme.Weights.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export const RatingStars = styled.span`
  margin-left: 13px;
  color: #F8A0BC;
  vertical-align: middle;
  display: inline-block;
`;

export const ReviewTime = styled.span`
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.subtext};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-famaily: ${({ theme }) => theme.fonts.cafe24Light};
  font-weight: ${({ theme }) => theme.Weights.medium};
`;

// 상단 바 (리뷰 개수 + 정렬)
export const ReviewTopBar = styled.div`
  display: flex;
  width: 600px;
  align-items: center;
  justify-content: space-between;
  margin: 0 4px 10px 4px;
  padding-bottom: 8px;
`;

// 리뷰 개수
export const ReviewCount = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-famaily: ${({ theme }) => theme.fonts.cafe24Light};
  font-weight: ${({ theme }) => theme.Weights.medium};
  color: #5a4d6e;
  letter-spacing: 0.5px;
  b {
    color: #e487b5;
    font-weight: 700;
    margin-left: 2px;
  }
`;

// 따봉(Like) 버튼
export const LikeBtn = styled.button`
  border: none;
  background: none;
  color: #ed7cb8;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  display: flex;
  align-items: centerz;
  gap: 2px;
  cursor: pointer;
  padding: 2px 3px 2px 4px;
  border-radius: 4px;
  transition: background 0.13s;
  &:hover { background: #f7ddea7a; }
`;

// 따봉 카운트
export const LikeCount = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: #c0b6c7;
  margin-left: 3px;
`;

export const SortSelectBox = styled.div`
  display: flex;
  align-items: center;
`;

export const SortSelect = styled.select`
  border-radius: 6px;
  padding: 4px 6px;
  border: 1px solid #f8a0bc;
  color: #e487b5;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-famaily: ${({ theme }) => theme.fonts.cafe24Light};
  font-weight: ${({ theme }) => theme.Weights.medium};
  outline: none;
  appearance: none;
  margin-left: 8px;
  text-align: center;
  box-shadow: 0 1px 2px #f5e0e7;
  &:focus {
    border: 1.5px solid #ed7cb8;
    box-shadow: 0 0 0 1.5px #fad8eb;
  }
`;