// components/Profile/Center/StatsBox/StatsBox.styled.ts
import styled from "styled-components";

export const StatsRow = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  gap: 12px;
  background: ${({ theme }) => theme.colors.secondary};
`;

export const StatBox = styled.div`
  flex: 1;
  text-align: center;
  padding: 16px 0;
`;

export const StatNumber = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.Weights.bold};
  margin-bottom: 4px;
`;

export const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
`;
