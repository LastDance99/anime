import styled from "styled-components";

export const AniListSectionWrapper = styled.div`
  width: 410px;
`;

export const AniListHeader = styled.div`
  width: 410px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const AniListTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: ${({ theme }) => theme.Weights.bold};
  color: ${({ theme }) => theme.colors.text};
`;

export const CardBox = styled.div`
  width: 100%;
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  gap: 16px;
  background: ${({ theme }) => theme.colors.secondary};
`;

export const AniCard = styled.div`
  width: 100%;
  max-width: 80px;
  height: 120px;
  flex: 0 0 auto;
  overflow: hidden;
  box-sizing: border-box;
`;

export const AniCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;