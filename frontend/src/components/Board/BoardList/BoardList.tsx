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
  Comments,
  Title,
} from "./BoardList.styled";
import { boardList } from "../../../data/boardList";

type BoardListProps = {
  page: number;
  pageSize: number;
  onItemClick?: (id: number, type: "post" | "gallery") => void;
};

const columnWidths = [42, 40, 362, 74, 46, 70, 57];

const BoardList: React.FC<BoardListProps> = ({ page, pageSize, onItemClick }) => {
  const startIdx = (page - 1) * pageSize;
  const pagedData = boardList.slice(startIdx, startIdx + pageSize);

  return (
    <Table>
      <Thead>
        <TheadTr>
          <Th style={{ width: columnWidths[0] }}>번호</Th>
          <Th style={{ width: columnWidths[1] }}>이미지</Th>
          <Th style={{ width: columnWidths[2] }}>제목</Th>
          <Th style={{ width: columnWidths[3] }}>이름</Th>
          <Th style={{ width: columnWidths[4] }}>날짜</Th>
          <Th style={{ width: columnWidths[5] }}>조회수</Th>
          <Th style={{ width: columnWidths[6] }}>추천</Th>
        </TheadTr>
      </Thead>
      <Tbody>
        {pagedData.map((item) => (
          <TbodyTr
            key={item.id}
            onClick={() => onItemClick?.(item.id, item.boardType as "post" | "gallery")}
            style={{ cursor: "pointer" }} // 클릭 가능하단 느낌을 주기 위해
          >
            <Td style={{ width: columnWidths[0] }}>{item.id}</Td>
            <Td style={{ width: columnWidths[1] }}>
              <img src={item.img} alt="썸네일" width={36} height={36} style={{ borderRadius: 8 }} />
            </Td>
            <Td style={{ width: columnWidths[2], textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                <Category $type={item.category}>{item.category}</Category>
                <Title>{item.title}</Title>
                <Comments>({item.comment})</Comments>
              </div>
            </Td>
            <Td style={{ width: columnWidths[3], textAlign: "left" }}>{item.nickname}</Td>
            <Td style={{ width: columnWidths[4] }}>{item.time}</Td>
            <Td style={{ width: columnWidths[5] }}>{item.views}</Td>
            <Td style={{ width: columnWidths[6] }}>{item.likes}</Td>
          </TbodyTr>
        ))}
      </Tbody>
    </Table>
  );
};

export default BoardList;
