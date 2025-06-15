import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
`;

export const TabList = styled.div`
  display: flex;
  border-bottom: 1px solid #f4cbd4;
`;

export const Tab = styled.button<{ selected?: boolean }>`
  flex: 1;
  padding: 12px;
  background: none;
  border: none;
  border-bottom: ${props => (props.selected ? '2px solid #e54b6e' : 'none')};
  color: ${props => (props.selected ? '#e54b6e' : '#aaa')};
  font-weight: ${props => (props.selected ? '600' : '400')};
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

export const CommentItem = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid #f4cbd4;
  display: flex;
  gap: 12px;
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
  font-weight: bold;
`;

export const Text = styled.div`
  margin: 6px 0;
  color: #444;
`;

export const Meta = styled.div`
  font-size: 0.8rem;
  color: #aaa;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ReplyBtn = styled.button`
  background: none;
  border: none;
  color: #e2486e;
  cursor: pointer;
  font-size: 0.85rem;
  padding: 0;
  margin: 0;
`;

export const InputWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

export const CommentInput = styled.input`
  flex: 1;
  height: 40px; /* 높이 고정 */
  padding: 0 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

export const SubmitBtn = styled.button`
  height: 40px; /* 입력창과 동일 높이 */
  padding: 0 16px;
  background-color: #f76f6f;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #e14e4e;
  }
`;

export const LikeButton = styled.button<{ liked?: boolean }>`
  background: none;
  border: none;
  color: ${props => (props.liked ? "#e2486e" : "#aaa")};
  cursor: pointer;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  margin: 0;
  user-select: none;

  &:hover {
    color: #e2486e;
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
  border: 1px solid #ddd;
  padding: 6px 12px;
  font-size: 0.9rem;
  margin-top: 4px;
`;

export const ReplySubmitBtn = styled.button`
  padding: 6px 12px;
  border-radius: 8px;
  border: none;
  background-color: #f76f6f;
  color: white;
  cursor: pointer;
  font-weight: 600;
  margin-top: 4px;

  &:hover {
    background-color: #e14e4e;
  }
`;

export const TagMention = styled.span`
  color: #e54b6e;
  font-weight: 600;
  margin-right: 4px;
`;

