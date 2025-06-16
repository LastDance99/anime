import styled from "styled-components";

export const List = styled.div`
  width: 100%;
  padding: 0;
`;

export const Item = styled.div`
  padding: 18px 0 13px 0;
  border-bottom: 1px solid #f5e1ef;
  &:last-child {
    border-bottom: none;
  }
`;

export const Reviewer = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  font-weight: 700;
  color: #5a4d6e;
  margin-bottom: 2px;
  img {
    display: inline-block;
    vertical-align: middle;
  }
`;

export const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 7px;
  font-size: 0.97rem;
  color: #ffcb45;
`;

export const EditBtn = styled.button`
  margin-left: 8px;
  background: none;
  color: #ed7cb8;
  border: none;
  font-size: 0.93rem;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 5px;
  &:hover { text-decoration: underline; }
`;

export const DeleteBtn = styled(EditBtn)`
  color: #e74c3c;
`;

export const Content = styled.div`
  font-size: 1.03rem;
  color: #444;
  line-height: 1.7;
  word-break: break-all;
  padding-left: 2px;
`;

export const SortTabGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
  align-items: center;
  padding: 0 4px;
`;

export const SortTab = styled.button<{ selected?: boolean }>`
  background: ${({ selected }) => (selected ? "#ffe5ae" : "transparent")};
  color: ${({ selected }) => (selected ? "#e29c00" : "#999")};
  border: none;
  border-radius: 12px;
  padding: 6px 16px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;

  &:hover,
  &:focus {
    background: #fff6d8;
    color: #c08900;
  }
`;