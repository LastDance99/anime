import styled from "styled-components";

export const Card = styled.div`
  width: 100%;
  height: 200px;
  background: #fff;
  border: 1px solid #FFB6C1;
  padding: 28px 20px 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

export const Avatar = styled.div`
  width: 62px;
  height: 62px;
  background: #e9e9e9;
  border-radius: 50%;
  margin-bottom: 10px;
`;

export const Name = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

export const Email = styled.div`
  font-size: 14px;
  color: #888;
`;

export const Button = styled.button`
  background: #ffd1e3;
  border: none;
  border-radius: 8px;
  padding: 7px 16px;
  font-size: 15px;
  font-weight: 600;
  color: #e84d7a;
  margin-top: 10px;
  cursor: pointer;
`;
