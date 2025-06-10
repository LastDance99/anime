import styled from "styled-components";
import { Button } from "../../WriteButton/WriteButton.styled";

export const Card = styled.div`
  width: 100%;
  height: 200px;
  background: #fff;
  border: 1px solid #FFB6C1;
  padding: 15px 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const TopBox = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  gap: 20px;
  position: relative;
`;

export const Avatar = styled.div`
  width: 100%;
  height: 100%;
  max-width: 80px;
  max-height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e9e9e9;
  border-radius: 50%;
  object-fit: cover;
`;

export const FontBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 4px;
  gap: 4px;
`;

export const Name = styled.div`
  font-size: 18px;
  font-family: 'Cafe24 Ssurround', sans-serif;
`;

export const Email = styled.div`
  font-size: 12px;
  color: #888;
  font-family: 'Quicksand', sans-serif;
`;

export const Font = styled.div`
  font-size: 12px;
  color: #222;
  font-family: 'Cafe24 Ssurround air', sans-serif;
  font-weight: 300;
`;

export const FontRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 12px;
  color: #222;
  font-family: 'Cafe24 Ssurround air', sans-serif;
  font-weight: 300;
`;

export const LogoutButton = styled.button`
  background: #FFD4DF;
  border: none;
  border-radius: 6px;
  padding: 6px 18px;
  color: #c44e6d;
  font-size: 12px;
  cursor: pointer;
  position: absolute;
  right: -10px;
  top: 0px;
`;

export const BottomBox = styled.div`
  width: 100%;
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px
`;

export const CustomButton = styled(Button)`
  width: 120px;
  height: 26px;
  background: #FFD1DC;
  border: 1px solid #FFB6C1;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #222;
  cursor: pointer;
`;
