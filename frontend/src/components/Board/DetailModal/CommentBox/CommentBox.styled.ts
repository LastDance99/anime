import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
`;

export const TabList = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  gap: 4px;           /* 탭 간 여백 */
`;

export const Tab = styled.button<{ selected?: boolean }>`
  min-width: 76px;
  max-width: 180px;
  padding: 8px 12px;
  background: none;
  border: none;
  border-bottom: ${({ selected, theme }) =>
    selected ? `2px solid ${theme.colors.bordermain}` : "none"};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.bordermain : theme.colors.subtext};
  font-weight: ${({ selected, theme }) =>
    selected ? theme.Weights.medium : theme.Weights.normal};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.main};
  cursor: pointer;

  display: -webkit-box;
  -webkit-line-clamp: 2;     /* 두 줄까지만 보이고 ... */
  -webkit-box-orient: vertical;
  white-space: normal;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

export const CommentList = styled.div.attrs({ tabIndex: -1 })`
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CommentItem = styled.div<{ depth?: number }>`
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  display: flex;
  gap: 12px;
  background: ${({ depth }) => (depth && depth > 0 ? "#f7f9fc" : "transparent")};
  margin-top: ${({ depth }) => (depth && depth > 0 ? "4px" : "0")};
  margin-bottom: ${({ depth }) => (depth && depth > 0 ? "4px" : "0")};
`;

export const Profile = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
`;

export const CommentContent = styled.div`
  margin-left: 8px;
  display: flex;
  flex-direction: column;
`;

export const Nickname = styled.div`
  font-weight: ${({ theme }) => theme.Weights.bold};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const Text = styled.div`
  margin: 6px 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  img {
    width: 100%;
    max-width: 320px;
    height: auto;
    border-radius: 6px;
    margin-top: 8px;
  }
`;

export const Meta = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.subtext};
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ReplyBtn = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.bordermain};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: 0;
  margin: 0;
`;

export const InputWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
`;

export const CommentInput = styled.input`
  flex: 1;
  height: 40px;
  padding: 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.subtext};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.main};
`;

export const SubmitBtn = styled.button`
  min-width: 80px;
  max-width: 170px;
  height: 40px;
  padding: 0 14px;
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-weight: ${({ theme }) => theme.Weights.medium};
  border: none;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bordermain};
    color: ${({ theme }) => theme.colors.background};
  }
`;

export const LikeButton = styled.button<{ liked: boolean; disabled?: boolean }>`
  background: none;
  border: none;
  color: ${({ liked, disabled, theme }) =>
    disabled ? theme.colors.subtext
    : liked ? theme.colors.bordermain
    : theme.colors.subtext};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  margin: 0;
  user-select: none;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transition: color 0.15s;

  &:hover {
    color: ${({ liked, disabled, theme }) =>
      disabled ? theme.colors.subtext
      : theme.colors.bordermain};
  }
`;

export const ReplyInputWrapper = styled.div`
  margin-left: 44px;
  margin-bottom: 8px;
  display: flex;
  gap: 8px;
`;

export const ReplyInput = styled.input`
  flex: 1;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.subtext};
  padding: 6px 12px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: 4px;
`;

export const ReplySubmitBtn = styled.button`
  padding: 6px 12px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.colors.bordermain};
  color: ${({ theme }) => theme.colors.background};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.Weights.medium};
  margin-top: 4px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const TagMention = styled.span`
  color: ${({ theme }) => theme.colors.bordermain};
  font-weight: ${({ theme }) => theme.Weights.medium};
  margin-right: 4px;
`;

export const PreviewBox = styled.div`
  position: absolute;
  bottom: 110%;
  left: 0;
  max-width: 100%;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 6px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 120px;
    height: auto;
    border-radius: 6px;
  }

  button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.subtext};
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    /* 버튼 길면 ... 처리 */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-word;
    max-width: 100px;
  }
`;