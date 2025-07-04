import styled from "styled-components";
import { ThumbsUp } from "lucide-react";

export const TabBar = styled.div`
  display: flex;
  gap: 0;
`;

export const Tab = styled.button<{ selected: boolean }>`
  min-width: 62px;
  max-width: 140px;
  height: 34px;
  padding: 0 10px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  background: ${({ selected, theme }) =>
    selected ? theme.colors.bordermain : theme.colors.secondary};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.text : theme.colors.subtext};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-weight: ${({ theme }) => theme.Weights.light};
  cursor: pointer;
  transition: background 0.15s;

  display: -webkit-box;
  -webkit-line-clamp: 2;          // 두 줄까지 허용 + ... 처리
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-word;

  &:hover {
    background: ${({ theme }) => theme.colors.bordermain};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const LikeIcon = styled(ThumbsUp)`
  width: 11px;
  height: 11px;
  vertical-align: middle;
  margin-bottom: 4px;
`;