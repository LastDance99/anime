import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
`;
export const Thead = styled.thead`
  display: block;  
  width: 100%;
  border-top: 1px solid #FFB6C1;
  border-bottom: 1px solid #FFB6C1;
  font-size: 12px;
  font-weight: 700;
  font-family: 'Cafe24 Ssurround', sans-serif;
  padding: 0 10px;
  line-height: 40px;
`;

export const Th = styled.th`
  text-align: center;
  background: #fff;
  
`;

export const TheadTr= styled.tr`
  display: flex;
  height: 40px;
  margin: auto;
  text-align: center;
  vertical-align: middle;
  justify-content: space-between;
`;

export const Tbody = styled.tbody`
  height: 638px;
`;

export const TbodyTr= styled.tr`
  display: flex;
  height: 58px;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #FFB6C1;
`;

export const Td = styled.td`
  text-align: center;
  color: #222;
  font-family: 'Cafe24 Ssurround air', sans-serif;
  font-weight: 400;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Category = styled.span<{ $type: string }>`
  display: inline-block;
  width: 40px;
  height: 16px;
  text-align: center;
  background: ${({ $type }) =>
    $type === "게시글" ? "#CDE6F5" : $type === "갤러리" ? "#FAD1D7" : "#eee"};
  margin-right: 4px;
`;