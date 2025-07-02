import styled from "styled-components";

export const CharactersWrapper = styled.div`
  margin: 20px 0;
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.Weights.bold};
    margin-bottom: 12px;
    color: ${({ theme }) => theme.colors.text};
  }
  padding: 0 30px
`;

export const CharacterCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CharacterImage = styled.img`
  width: 80px;
  height: 120px;
  border-radius: 12px;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
`;