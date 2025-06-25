import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; // ⭐️ 핵심!
  background: ${({ theme }) => theme.colors.background};
`;

export const Thead = styled.thead`
  border-top: 1px solid ${({ theme }) => theme.colors.bordermain};
  border-bottom: 1px solid ${({ theme }) => theme.colors.bordermain};
  font-size: ${({ theme }) => theme.fontSizes.sm}; // 12px
  font-weight: ${({ theme }) => theme.Weights.bold};
  font-family: ${({ theme }) => theme.fonts.cafe24};
  line-height: 40px;
`;

export const TheadTr = styled.tr`
  height: 40px;
`;

export const Th = styled.th`
  text-align: center;
  background: ${({ theme }) => theme.colors.background};
  padding: 0;
`;

export const Tbody = styled.tbody``;

export const TbodyTr = styled.tr`
  height: 58px;
  text-align: center;
  vertical-align: middle;
  border-bottom: 1px solid ${({ theme }) => theme.colors.bordermain};
`;

export const Td = styled.td`
  text-align: center;
  vertical-align: middle;
  padding: 0;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-weight: ${({ theme }) => theme.Weights.normal};
  font-size: ${({ theme }) => theme.fontSizes.sm}; // 12px
`;

export const Category = styled.span<{ $type: string }>`
  display: inline-block;
  width: 40px;
  height: 16px;
  background: ${({ $type, theme }) =>
    $type === "post"
      ? "#CDE6F5"
      : $type === "gallery"
      ? "#FAD1D7"
      : theme.colors.subcolor};
  margin-right: 10px;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 16px;
  border-radius: 4px;
`;

export const Title = styled.span`
  display: inline-block;
  max-width: 380px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
`;

export const Comments = styled.span`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes.xxs}; // 9px
  width: 20px;
  height: 20px;
  line-height: 20px;
  color: red;
  text-align: center;
  vertical-align: middle;
`;