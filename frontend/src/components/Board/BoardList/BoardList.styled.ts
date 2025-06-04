// BoardList.styled.ts

import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;      // ⭐️ 핵심!
  background: #fff;
`;

export const Thead = styled.thead`
  border-top: 1px solid #FFB6C1;
  border-bottom: 1px solid #FFB6C1;
  font-size: 12px;
  font-weight: 700;
  font-family: 'Cafe24 Ssurround', sans-serif;
  line-height: 40px;
`;

export const TheadTr = styled.tr`
  height: 40px;
`;

export const Th = styled.th`
  text-align: center;
  background: #fff;
  padding: 0;
  /* width는 style prop으로 개별 적용 */
`;

export const Tbody = styled.tbody`
  /* 따로 스타일X: 기본 테이블 구조 */
`;

export const TbodyTr = styled.tr`
  height: 58px;
  text-align: center;
  vertical-align: middle;
  border-bottom: 1px solid #FFB6C1;
`;

export const Td = styled.td`
  text-align: center;
  vertical-align: middle;
  padding: 0;
  color: #222;
  font-family: 'Cafe24 Ssurround air', sans-serif;
  font-weight: 400;
  font-size: 12px;
  /* width는 style prop으로 개별 적용 */
`;

// 내부 요소는 flex 등 자유롭게 써도 됨 (td/셀 안에서만)
export const Category = styled.span<{ $type: string }>`
  display: inline-block;
  width: 40px;
  height: 16px;
  background: ${({ $type }) =>
    $type === "게시글" ? "#CDE6F5" : $type === "갤러리" ? "#FAD1D7" : "#eee"};
  margin-right: 10px;
  text-align: center;
`;

export const Title = styled.span`
  display: inline-block;
  max-width: 380px;      // 제목이 너무 길면 ... 처리
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
`;

export const Comments = styled.span`
  display: inline-block;
  font-size: 10px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  color: red;
  text-align: center;
  vertical-align: middle;
`;
