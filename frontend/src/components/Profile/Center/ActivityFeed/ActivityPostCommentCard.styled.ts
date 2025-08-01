import styled from "styled-components";
import { motion } from "framer-motion";
import isPropValid from "@emotion/is-prop-valid";

export const CommentContainer = styled(motion.div)`
  width: 100%;
  background: ${({ theme }) => theme.colors.secondary};
  padding: 12px 18px;
  border-top: 1px solid ${({ theme }) => theme.colors.secondary};
  box-sizing: border-box;
`;

export const PostCommentCard = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== "$type",
})<{ $type?: string }>`
  width: 100%;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;     /* center → flex-start */
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  color: ${({ theme }) => theme.colors.text};
  padding: 14px 18px;
  box-sizing: border-box;

  /* === 핵심 수정 === */
  word-break: break-word;
  white-space: normal;
  overflow-wrap: anywhere;
`;

export const WrapperBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  width: 100%;
`;

export const ProfileImg = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.subcolor};
`;

export const Nickname = styled.span`
  font-weight: ${({ theme }) => theme.Weights.bold};
  font-family: ${({ theme }) => theme.fonts.cafe24};
`;

export const TimeText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.subtext};
  font-family: ${({ theme }) => theme.fonts.main};
  position: absolute;
  top: 10px;
`;

export const PostStatsBox = styled.div`
  display: flex;
  gap: 6px;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.subtext};
  position: absolute;
  bottom: 10px;
`;

export const StatItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const FlexBox = styled.div`
  width: 100%;
  min-width: 0;   /* 추가! */
  display: flex;
  flex-direction: column;
  padding: 10px 0 10px 10px;
  gap: 8px;

  /* === 핵심 수정 === */
  word-break: break-word;
  white-space: normal;
  overflow-wrap: anywhere;
`;

export const TopBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Thumbnail = styled.img`
  width: 160px;
  height: 160px;
  object-fit: cover;
  padding: 6px 0;
`;

export const CommentListContainer = styled.div`
  margin-top: 12px;
  padding: 0 16px 12px 16px;
  overflow: hidden;  
  ul {
    padding-left: 20px;
    margin-top: 8px;

    li {
      margin-bottom: 8px;
      font-size: ${({ theme }) => theme.fontSizes.sm};
      font-family: ${({ theme }) => theme.fonts.main};
    }
  }
`;

export const PostTimeText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.subtext};
  font-family: ${({ theme }) => theme.fonts.main};
  position: absolute;
  top: 10px;
`;

export const SideInfoBox = styled.div`
  width: 100%;
  min-width: 60px;
  max-width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 80%;
  padding-right: 10px;

  /* === 핵심 수정 === */
  word-break: break-word;
  white-space: normal;
  overflow-wrap: anywhere;
`;

export const CommentText = styled.div`
  img {
    max-width: 200px;
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-top: 8px;
    display: block;
  }

  /* === 텍스트 줄바꿈 추가 (혹시 댓글에 텍스트도 있을 때 대비) */
  word-break: break-word;
  white-space: normal;
  overflow-wrap: anywhere;
`;