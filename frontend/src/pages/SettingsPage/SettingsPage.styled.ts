import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 40px;
  background-color: #fdebf1;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
`;

export const Divider = styled.hr`
  margin: 32px 0;
  border: none;
  border-top: 1px solid #f4c6d2;
`;

export const BottomBar = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const ActionButton = styled.button`
  padding: 8px 14px;
  background-color: #f9c2d2;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'Cafe24Ssurround', sans-serif;
  font-size: 14px;

  &:hover {
    background-color: #f7aac1;
  }
`;