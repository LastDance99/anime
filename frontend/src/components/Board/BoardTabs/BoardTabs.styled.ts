import styled from "styled-components";
import { ThumbsUp } from "lucide-react";

export const TabBar = styled.div`
  display: flex;
`;

export const Tab = styled.button<{ selected: boolean }>`
  width: 76px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  background: ${({ selected, theme }) =>
    selected ? theme.colors.bordermain : theme.colors.secondary};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.text : theme.colors.subtext};
  font-size: ${({ theme }) => theme.fontSizes.sm}; // 12px
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-weight: ${({ theme }) => theme.Weights.light};
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.bordermain};
    color: ${({ theme }) => theme.colors.text};
  }

  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3),
  &:nth-child(4) {
    border-right: none;
  }
`;

export const LikeIcon = styled(ThumbsUp)`
  width: 11px;
  height: 11px;
  vertical-align: middle;
  margin-bottom: 4px;
`;