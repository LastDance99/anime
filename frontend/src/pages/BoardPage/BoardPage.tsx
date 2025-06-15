import React, { useState } from "react";
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
import { boardList } from "../../data/boardList";
import { mockUsers } from "../../data/userList";
import DetailModal from "../../components/Board/DetailModal"; // 추가

const PAGE_SIZE = 50;

const SORT_OPTIONS = [
  { label: "최신순", value: "latest" },
  { label: "조회순", value: "views" },
  { label: "댓글순", value: "comments" },
  { label: "추천순", value: "likes" },
];

const BoardPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("latest");

  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<"post" | "gallery" | null>(null);

  const totalPage = Math.ceil(boardList.length / PAGE_SIZE);

  const handleSearch = () => {
    alert(`검색어: ${keyword}`);
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
                <BoardTabs />
                <SortWrite>
                  <SortDropdown options={SORT_OPTIONS} value={sort} onChange={setSort} />
                  <WriteButton />
                </SortWrite>
              </TabSortWrapper>
              <BoardList page={page} pageSize={PAGE_SIZE} onItemClick={handleItemClick} />
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

      {/* ✅ 상세 모달 연결 */}
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