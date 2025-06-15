import styled, { css } from "styled-components";

export const Section = styled.section`
  font-family: 'Cafe24Ssurround', 'Quicksand', sans-serif;
  border-bottom: 1px solid #FFB6C1;
  padding-bottom: 40px;
`;

export const SubTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const ImageRow = styled.div`
  display: flex;
  gap: 100px;
  flex-wrap: wrap;
  padding: 0 20px;
`;

export const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageLabel = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
`;

export const StyledImage = styled.img<{ shape: 'circle' | 'rect' | 'square' }>`
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin-bottom: 12px;
  border-radius: 16px;

  ${({ shape }) =>
    shape === "circle" &&
    css`
      border-radius: 50%;
    `}
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const ActionButton = styled.button`
  background-color: #f9c2d2;
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  font-family: 'Cafe24Ssurround', 'Quicksand', sans-serif;

  &:hover {
    background-color: #f7aac1;
  }
`;