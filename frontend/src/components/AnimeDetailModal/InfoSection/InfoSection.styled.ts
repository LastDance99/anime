import styled from "styled-components";

export const InfoSectionWrapper = styled.section`
  display: flex;
  background: #FCEEF5;
  width: 100%;
  height: 100%;
  max-height: 300px;
  border-radius: 0;
  padding: 32px 32px 32px 32px;
  box-sizing: border-box;
`;

export const InfoLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const ScoreBadge = styled.div`
  color: #ef5da8;
  border: 1px solid #FFB6C1;
  border-radius: 6px;
  font-famaily: ${({ theme }) => theme.fonts.cafe24};
  font-weight: ${({ theme }) => theme.Weights.bold};
  font-size: 10px;
  display: inline-block;
  padding: 2px 8px;
  margin-bottom: 8px;
  width: fit-content;
`;

export const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-famaily: ${({ theme }) => theme.fonts.cafe24};
  font-weight: ${({ theme }) => theme.Weights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
  

`;

export const MetaRow = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-famaily: ${({ theme }) => theme.fonts.cafe24Light};
  color: ${({ theme }) => theme.colors.subtext};
  display: flex;
  gap: 6px;
`;

export const Desc = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-famaily: ${({ theme }) => theme.fonts.cafe24Light};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.Weights.normal};
  line-height: 1.5;
  margin-bottom: 14px;
  white-space: pre-line;
  word-break: keep-all;
`;

export const MoreButton = styled.button`
  color: #e05a8b;
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-famaily: ${({ theme }) => theme.fonts.cafe24Light};
  font-weight: ${({ theme }) => theme.Weights.medium};
  margin-left: 7px;
  cursor: pointer;
  padding: 0;
  &:hover { text-decoration: underline; }
`;

export const AddButton = styled.button`
  color: #e05a8b;
  border: 1px solid #FFB6C1;
  border-radius: 6px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-famaily: ${({ theme }) => theme.fonts.cafe24Light};
  padding: 4px 10px;
  font-weight: ${({ theme }) => theme.Weights.medium};
  cursor: pointer;
  width: fit-content;
  margin-top: 2px;
  transition: background 0.15s;
  &:hover {
    background: #ffe2ee;
  }
`;

export const InfoRight = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: 24px;
`;

export const PosterImg = styled.img`
  width: 150px;
  height: 200px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(120, 92, 119, 0.10);
  background: #fff;
`;