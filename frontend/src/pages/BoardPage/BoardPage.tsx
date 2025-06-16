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
import type { BoardItem } from "../../types/board";

type TabType = "all" | "post" | "gallery" | "thirty" | "ten";
const PAGE_SIZE = 50;

const SORT_OPTIONS = [
  { label: "최신순", value: "latest" },
  { label: "조회순", value: "views" },
  { label: "댓글순", value: "comments" },
  { label: "추천순", value: "likes" },
];

// 여기는 임시 더미, 실제론 API로 받아오는 걸로 교체하세요
import { boardList } from "../../data/boardList";

const BoardPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("latest");
  const [selectedTab, setSelectedTab] = useState<TabType>("all");

  const [boardItems, setBoardItems] = useState<BoardItem[]>(boardList);

  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<"post" | "gallery" | null>(null);

  const filteredList = useMemo(() => {
    let data = [...boardItems];

    // 탭 필터링
    if (selectedTab === "post") {
      data = data.filter(item => item.board_type === "post");
    } else if (selectedTab === "gallery") {
      data = data.filter(item => item.board_type === "gallery");
    } else if (selectedTab === "thirty") {
      data = data.filter(item => (item.like_count ?? 0) >= 30);
    } else if (selectedTab === "ten") {
      data = data.filter(item => (item.like_count ?? 0) >= 10);
    }

    // 검색 필터링 (title, content, author.nickname)
    if (keyword.trim()) {
      const kw = keyword.trim().toLowerCase();
      data = data.filter(
        item =>
          item.title.toLowerCase().includes(kw) ||
          item.content.toLowerCase().includes(kw) ||
          item.author.nickname.toLowerCase().includes(kw)
      );
    }

    // 정렬
    switch (sort) {
      case "latest":
        data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case "views":
        data.sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
        break;
      case "comments":
        data.sort((a, b) => (b.comment_count ?? 0) - (a.comment_count ?? 0));
        break;
      case "likes":
        data.sort((a, b) => (b.like_count ?? 0) - (a.like_count ?? 0));
        break;
    }

    return data;
  }, [selectedTab, keyword, sort, boardItems]);

  // 페이지네이션
  const pagedList = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredList.slice(start, start + PAGE_SIZE);
  }, [filteredList, page]);

  const totalPage = Math.max(1, Math.ceil(filteredList.length / PAGE_SIZE));

  // 탭/검색/정렬 바뀌면 1페이지로
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
                  <WriteButton />
                </SortWrite>
              </TabSortWrapper>
              <BoardList
                list={pagedList}
                page={page}
                pageSize={PAGE_SIZE}
                onItemClick={handleItemClick}
              />
              <PageSearchWrapper>
                <BoardPagination
                  page={page}
                  totalPage={totalPage}
                  onChange={setPage}
                />
                <SearchInput
                  value={keyword}
                  onChange={e => setKeyword(e.target.value)}
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