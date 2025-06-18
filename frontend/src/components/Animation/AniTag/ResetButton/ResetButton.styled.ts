import styled from "styled-components";

export const ResetButtonBox = styled.div`
  width: 100%;
  margin-bottom: 20px;
  text-align: right;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.bordermain};
  padding-bottom: 20px;
`;

export const FilterTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base}; // 16px
  font-weight: ${({ theme }) => theme.Weights.bold};
  color: ${({ theme }) => theme.colors.text};
`;

export const ResetButtonStyled = styled.button`
  color: ${({ theme }) => theme.colors.bordermain};
  border: none;
  border-radius: 50%;
  font-weight: ${({ theme }) => theme.Weights.medium};
  font-size: ${({ theme }) => theme.fontSizes.xs}; // 10px
  cursor: pointer;
  transition: 0.1s;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;