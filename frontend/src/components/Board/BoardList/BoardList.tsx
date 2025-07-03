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
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const BOARD_TYPE_KR: Record<string, string> = {
    post: t("board.type_post"),
    gallery: t("board.type_gallery"),
  };

  // 공지/일반 분리
  const notices = list.filter((item) => item.is_notice);
  const normals = list.filter((item) => !item.is_notice);

  return (
    <Table>
      <Thead>
        <TheadTr>
          <Th style={{ width: columnWidths[0] }}>{t("board.number")}</Th>
          <Th style={{ width: columnWidths[1] }}>{t("board.image")}</Th>
          <Th style={{ width: columnWidths[2] }}>{t("board.title")}</Th>
          <Th style={{ width: columnWidths[3] }}>{t("board.author")}</Th>
          <Th style={{ width: columnWidths[4] }}>{t("board.date")}</Th>
          <Th style={{ width: columnWidths[5] }}>{t("board.views")}</Th>
          <Th style={{ width: columnWidths[6] }}>{t("board.likes")}</Th>
        </TheadTr>
      </Thead>
      <Tbody>
        {/* --- 공지글 먼저 --- */}
        {/* {notices.map((item) => (
          <TbodyTr
            key={item.id}
            onClick={() => onItemClick?.(item.id, item.board_type as "post" | "gallery")}
            style={{
              cursor: "pointer",
              background: "#fff4ef",      // 연한 배경 강조 (원하면 제거)
              fontWeight: 700,           // 글씨 강조 (원하면 제거)
            }}
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
                  {t("board.no_image")}
                </div>
              )}
            </Td>
            <Td style={{ width: columnWidths[2], textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                <span
                  style={{
                    color: "#f00",
                    fontWeight: "bold",
                    marginRight: 6,
                    fontSize: 13,
                    letterSpacing: "-1px",
                  }}
                >
                  [공지]
                </span>
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
        ))} */}
        {/* --- 일반 글 --- */}
        {normals.map((item) => (
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
                  {t("board.no_image")}
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