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
  padding: 7px auto;
  border: 1px solid #FFB6C1;
  background: ${({ selected }) => (selected ? "#FFB6C1" : "#FFD1DC")};
  color: ${({ selected }) => (selected ? "#222" : "#666")};
  font-size: 12px;
  font-family: 'Cafe24 Ssurround air', sans-serif;
  font-weight: 300;
  cursor: pointer;
  transition: background 0.15s;

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