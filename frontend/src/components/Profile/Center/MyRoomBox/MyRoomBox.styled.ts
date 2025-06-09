import styled from "styled-components";

export const MyRoomBox = styled.div`
  width: 410px;
  height: 320px;
  display: flex;
  flex-direction: column;
`;

export const RoomTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: ${({ theme }) => theme.Weights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 10px;
`;

export const RoomImage = styled.img`
  width: 410px;
  height: 320px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background: ${({ theme }) => theme.colors.secondary};
`;
