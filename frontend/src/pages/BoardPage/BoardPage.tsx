import React, { useState } from "react";
import {
  Wrapper,
  BoardSection,
  SidebarSection,
  Container,
  BoardSectionBox,
  BoardHeader,
  TabSortWrapper,
  PageSearchWrapper,
} from "./BoardPage.styled";
import BoardTabs from "../../components/Board/BoardTabs/BoardTabs";
import BoardList from "../../components/Board/BoardList/BoardList";
import BoardPagination from "../../components/Board/BoardPagination/BoardPagination";
import BoardProfile from "../../components/Board/BoardProfile/BoardProfile";
import ChatBot from "../../components/ChatBot/ChatBot";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import SearchInput from "../../components/SearchInput/SearchInput";
import { boardList } from "../../data/boardList";

const PAGE_SIZE = 11; // 한 페이지에 보여줄 게시글 수
const SORT_OPTIONS = [
  { label: "최신순", value: "latest" },
  { label: "조회순", value: "views" },
  { label: "댓글순", value: "comments" },
  { label: "추천순", value: "likes" },
];


const BoardPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const totalPage = Math.ceil(boardList.length / PAGE_SIZE);

  // 엔터치거나 버튼 누를 때 실행
  const handleSearch = () => {
    // 여기에 검색 로직
    alert(`검색어: ${keyword}`);
    // 혹은 fetch/필터링 등
  };

  const [sort, setSort] = useState("latest");

  return (
    <Container>
      <Wrapper>
        <BoardSectionBox>
          <BoardHeader>전체 게시판</BoardHeader>
          <BoardSection>
            <TabSortWrapper>
              <BoardTabs />
              <SortDropdown options={SORT_OPTIONS} value={sort} onChange={setSort} />
            </TabSortWrapper>
            {/* ✅ page, pageSize props 넘겨줌 */}
            <BoardList page={page} pageSize={PAGE_SIZE} />
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
          <BoardProfile />
          <ChatBot />
        </SidebarSection>
      </Wrapper>
    </Container>
  );
};

export default BoardPage;
