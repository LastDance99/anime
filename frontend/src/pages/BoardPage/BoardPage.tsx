import React, { useState, useMemo, useEffect } from "react";
import {
  Section,
  Wrapper,
  BoardSection,
  SidebarSection,
  Container,
  BoardSectionBox,
  BoardHeader,
  TabSortWrapper,
  PageSearchWrapper,
  SortWrite,
} from "./BoardPage.styled";
import BoardTabs from "../../components/Board/BoardTabs/BoardTabs";
import BoardList from "../../components/Board/BoardList/BoardList";
import BoardPagination from "../../components/Board/BoardPagination/BoardPagination";
import BoardProfile from "../../components/Board/ProfileCard/ProfileCard";
import ChatBot from "../../components/ChatBot/ChatBot";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import SearchInput from "../../components/SearchInput/SearchInput";
import WriteButton from "../../components/WriteButton/WriteButton";
import { mockUsers } from "../../data/userList";
import DetailModal from "../../components/Board/DetailModal";
import { useNavigate } from "react-router-dom";

import type { BoardItem } from "../../types/board";
import { boardList as boardListData } from "../../data/boardList"; // rename to avoid naming conflict

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
dayjs.extend(relativeTime);
dayjs.locale("ko");

type TabType = "all" | "post" | "gallery" | "thirty" | "ten";
const PAGE_SIZE = 50;

const SORT_OPTIONS = [
  { label: "최신순", value: "latest" },
  { label: "오래된순", value: "oldest" },
  { label: "추천순", value: "likes" },
];

const BoardPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("latest");
  const [selectedTab, setSelectedTab] = useState<TabType>("all");

  const navigate = useNavigate();

  const [boardList, setBoardList] = useState<BoardItem[]>(boardListData);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<"post" | "gallery" | null>(null);

  const filteredList = useMemo(() => {
    let data = [...boardList];

    if (selectedTab === "post") {
      data = data.filter(item => item.board_type === "post");
    } else if (selectedTab === "gallery") {
      data = data.filter(item => item.board_type === "gallery");
    } else if (selectedTab === "thirty") {
      data = data.filter(item => (item.like_count ?? 0) >= 30);
    } else if (selectedTab === "ten") {
      data = data.filter(item => (item.like_count ?? 0) >= 10);
    }

    if (keyword.trim()) {
      const kw = keyword.trim().toLowerCase();
      data = data.filter(
        item =>
          item.title.toLowerCase().includes(kw) ||
          item.content.toLowerCase().includes(kw) ||
          item.author.nickname.toLowerCase().includes(kw)
      );
    }

    switch (sort) {
      case "latest":
        data.sort((a, b) => dayjs(b.created_at).valueOf() - dayjs(a.created_at).valueOf());
        break;
      case "oldest":
        data.sort((a, b) => dayjs(a.created_at).valueOf() - dayjs(b.created_at).valueOf());
        break;
      case "likes":
        data.sort((a, b) => (b.like_count ?? 0) - (a.like_count ?? 0));
        break;
    }

    return data;
  }, [selectedTab, keyword, sort, boardList]);

  const pagedList = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredList.slice(start, start + PAGE_SIZE);
  }, [filteredList, page]);

  const totalPage = Math.max(1, Math.ceil(filteredList.length / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [selectedTab, keyword, sort]);

  const handleSearch = () => {
    setPage(1);
  };

  const handleItemClick = (id: number, type: "post" | "gallery") => {
    setSelectedPostId(id);
    setSelectedType(type);
  };

  const handleWrite = () => {
    navigate(`/board/write?type=${selectedTab === "gallery" ? "gallery" : "post"}`);
  };

  return (
    <Section>
      <Container>
        <Wrapper>
          <BoardSectionBox>
            <BoardHeader>전체 게시판</BoardHeader>
            <BoardSection>
              <TabSortWrapper>
                <BoardTabs selected={selectedTab} onChange={setSelectedTab} />
                <SortWrite>
                  <SortDropdown options={SORT_OPTIONS} value={sort} onChange={setSort} />
                  <WriteButton to={`/write`} />
                </SortWrite>
              </TabSortWrapper>
              <BoardList
                list={pagedList}
                page={page}
                pageSize={PAGE_SIZE}
                onItemClick={handleItemClick}
              />
              <PageSearchWrapper>
                <BoardPagination page={page} totalPage={totalPage} onChange={setPage} />
                <SearchInput
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onSearch={handleSearch}
                  placeholder="검색어를 입력하세요"
                />
              </PageSearchWrapper>
            </BoardSection>
          </BoardSectionBox>

          <SidebarSection>
            <BoardProfile user={mockUsers[0]} />
            <ChatBot />
          </SidebarSection>
        </Wrapper>
      </Container>

      {selectedPostId !== null && selectedType !== null && (
        <DetailModal
          id={selectedPostId}
          type={selectedType}
          onClose={() => {
            setSelectedPostId(null);
            setSelectedType(null);
          }}
        />
      )}
    </Section>
  );
};

export default BoardPage;