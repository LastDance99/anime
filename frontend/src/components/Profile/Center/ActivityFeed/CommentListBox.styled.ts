import styled from "styled-components";

export const ListBox = styled.div`
  width: 100%;
  margin: 0px auto 0 auto;
  background: ${({ theme }) => theme.colors.background};
  border: 1.2px solid ${({ theme }) => theme.colors.bordermain};
  border-radius: 13px;
  box-shadow: 0 1.5px 6px rgba(255,182,193,0.09);
  padding: 12px 10px 8px 10px;
  font-family: ${({ theme }) => theme.fonts.cafe24};
`;

export const CommentItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  &:last-child {
    border-bottom: none;
  }
`;

export const Profile = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.subcolor};
`;

export const CommentContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Nickname = styled.div`
  font-weight: ${({ theme }) => theme.Weights.bold};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
`;

export const Text = styled.div`
  margin: 6px 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  &.deleted {
    color: ${({ theme }) => theme.colors.subtext};
    font-style: italic;
  }
`;

export const CommentMeta = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.subtext};
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ReplyList = styled.div`
  margin-left: 38px;
  margin-top: 3px;
  border-left: 2px solid ${({ theme }) => theme.colors.subcolor};
  padding-left: 9px;
`;

export const ReplyItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 9px;
  padding: 7px 0;
`;