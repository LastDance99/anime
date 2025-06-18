import styled from "styled-components";

export const List = styled.div`
  width: 600px;
  padding: 0;
  background: ${({ theme }) => theme.colors.background};
`;

export const Item = styled.div`
  padding: 18px 0 13px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  &:last-child {
    border-bottom: none;
  }
`;

export const EditBtn = styled.button`
  margin-left: 8px;
  background: none;
  color: ${({ theme }) => theme.colors.secondary};
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  padding: 2px 7px;
  border-radius: 6px;
  transition: background 0.14s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}66;
    color: ${({ theme }) => theme.colors.bordermain};
    text-decoration: underline;
  }
`;

export const DeleteBtn = styled(EditBtn)`
  color: #ea5e6d;
  &:hover {
    color: #ad2531;
    background: #faeaea;
  }
`;

export const Content = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-weight: ${({ theme }) => theme.Weights.medium};
  color: #493d5a;
  line-height: 1.75;
  word-break: break-word;
  padding-left: 4px;
  margin-bottom: 2px;
`;

export const SortTabGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
  align-items: center;
  padding: 0 4px;
  justify-content: flex-end;
`;

export const SortTab = styled.button<{ selected?: boolean }>`
  background: ${({ selected }) => (selected ? "#ffe5ae" : "transparent")};
  color: ${({ selected }) => (selected ? "#e29c00" : "#bbb")};
  border: none;
  border-radius: 12px;
  padding: 6px 14px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.Weights.medium};
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
`;

export const ReviewerName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-weight: ${({ theme }) => theme.Weights.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export const RatingStars = styled.span`
  margin-left: 13px;
  color: ${({ theme }) => theme.colors.bordermain};
  vertical-align: middle;
  display: inline-block;
`;

export const ReviewTime = styled.span`
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.subtext};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-weight: ${({ theme }) => theme.Weights.medium};
`;

export const ReviewTopBar = styled.div`
  display: flex;
  width: 600px;
  align-items: center;
  justify-content: space-between;
  margin: 0 4px 10px 4px;
  padding-bottom: 8px;
`;

export const ReviewCount = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-weight: ${({ theme }) => theme.Weights.medium};
  color: #5a4d6e;
  letter-spacing: 0.5px;

  b {
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: ${({ theme }) => theme.Weights.bold};
    margin-left: 2px;
  }
`;

export const LikeBtn = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.bordermain};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  display: flex;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  padding: 2px 3px 2px 4px;
  border-radius: 4px;
  transition: background 0.13s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}7a;
  }
`;

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
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  color: ${({ theme }) => theme.colors.subtext};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-weight: ${({ theme }) => theme.Weights.medium};
  outline: none;
  appearance: none;
  margin-left: 8px;
  text-align: center;
  box-shadow: 0 1px 2px #f5e0e7;

  &:focus {
    border: 1.5px solid ${({ theme }) => theme.colors.bordermain};
    box-shadow: 0 0 0 1.5px #fad8eb;
  }
`;