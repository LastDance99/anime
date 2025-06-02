import React from "react";
import {
  Table,
  Th,
  TheadTr,
  TbodyTr,
  Td,
  Category,
  Thead,
  Tbody,
} from "./BoardList.styled";
import { boardList } from "../../../data/boardList";

type BoardListProps = {
  page: number;
  pageSize: number;
};

console.log("boardList 데이터", boardList);

const BoardList: React.FC<BoardListProps> = ({ page, pageSize }) => {
  // 1페이지 → 0~10, 2페이지 → 11~21 ...
  const startIdx = (page - 1) * pageSize;
  const pagedData = boardList.slice(startIdx, startIdx + pageSize);

  return (
    <Table>
      <Thead>
        <TheadTr>
          <Th style={{ width: 42 }}>번호</Th>
          <Th style={{ width: 40 }}>이미지</Th>
          <Th style={{ width: 362 }}>제목</Th>
          <Th style={{ width: 74 }}>이름</Th>
          <Th style={{ width: 46 }}>날짜</Th>
          <Th style={{ width: 70 }}>조회수</Th>
          <Th style={{ width: 57 }}>추천</Th>
        </TheadTr>
      </Thead>
      <Tbody>
        {pagedData.map((item) => (
          <TbodyTr key={item.id} style={{ height: 58 }}>
            <Td style={{ width: 42 }}>{item.id}</Td>
            <Td style={{ width: 40 }}>
              <img src={item.img} alt="썸네일" width={40} height={40} />
            </Td>
            <Td style={{ textAlign: "left", width: 362 }}>
              <Category $type={item.category}>{item.category}</Category>
              {item.title}
            </Td>
            <Td style={{ textAlign: "left", width: 74 }}>{item.name}</Td>
            <Td style={{ width: 46 }}>{item.time}</Td>
            <Td style={{ width: 70 }}>{item.views}</Td>
            <Td style={{ width: 57 }}>{item.likes}</Td>
          </TbodyTr>
        ))}
      </Tbody>
    </Table>
  );
};

export default BoardList;
