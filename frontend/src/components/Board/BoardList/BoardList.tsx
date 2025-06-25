import React from "react";
import type { BoardItem } from "../../../types/board";
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

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
dayjs.extend(relativeTime);
dayjs.locale("ko");

const columnWidths = [42, 40, 362, 74, 46, 70, 57];

type BoardListProps = {
  list: BoardItem[];
  page: number;
  pageSize: number;
  onItemClick?: (id: number, type: "post" | "gallery") => void;
};

const BoardList: React.FC<BoardListProps> = ({ list, page, pageSize, onItemClick }) => {

  const BOARD_TYPE_KR: Record<string, string> = {
    post: "게시글",
    gallery: "갤러리",
  };

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
        {list.map((item) => (
          <TbodyTr
            key={item.id}
            onClick={() => onItemClick?.(item.id, item.board_type as "post" | "gallery")}
            style={{ cursor: "pointer" }}
          >
            <Td style={{ width: columnWidths[0] }}>{item.id}</Td>
            <Td style={{ width: columnWidths[1] }}>
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt={`${item.title} 썸네일`}
                  width={46}
                  height={46}
                  style={{ borderRadius: 8, objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 8,
                    border: "1px solid #ccc",
                    backgroundColor: "#fafafa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    color: "#999",
                  }}
                >
                  이미지 없음
                </div>
              )}
            </Td>
            <Td style={{ width: columnWidths[2], textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                <Category $type={item.board_type}>
                  {BOARD_TYPE_KR[item.board_type] || item.board_type}
                </Category>
                <Title>{item.title}</Title>
                <Comments>({item.comment_count})</Comments>
              </div>
            </Td>
            <Td style={{ width: columnWidths[3], textAlign: "center" }}>
              <span>{item.author_nickname}</span>
            </Td>
            <Td style={{ width: columnWidths[4] }}>
              {item.created_at ? dayjs(item.created_at).fromNow() : "-"}
            </Td>
            <Td style={{ width: columnWidths[5] }}>{item.views}</Td>
            <Td style={{ width: columnWidths[6] }}>{item.like_count}</Td>
          </TbodyTr>
        ))}
      </Tbody>
    </Table>
  );
};

export default BoardList;