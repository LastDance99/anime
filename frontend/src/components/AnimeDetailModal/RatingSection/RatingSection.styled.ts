import styled from "styled-components";

export const RatingSectionWrapper = styled.section`
  display: flex;
  width: 700px;
  height: 100px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 0;
  margin: 10px auto 50px auto;
  align-items: flex-start;
`;

export const RatingCol = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
`;

export const RatingTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md}; // 14px
  color: ${({ theme }) => theme.colors.text};
  margin-top: 6px;
  margin-bottom: 2px;
  white-space: pre-line;
`;

export const RatingScore = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl}; // 20px
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-weight: ${({ theme }) => theme.Weights.bold};
`;

export const StarRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3px;
  margin-bottom: 1px;
`;

export const ListAddRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ListAddIcon = styled.span`
  display: flex;
  align-items: center;
  margin-right: 7px;
`;

export const ListCount = styled.span`
  font-size: 2rem;
  font-family: ${({ theme }) => `${theme.fonts.main}, ${theme.fonts.cafe24}`};
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 2px;
`;