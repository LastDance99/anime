import React, { useState, useEffect } from "react";
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
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import SearchInput from "../../components/SearchInput/SearchInput";
import WriteButton from "../../components/WriteButton/WriteButton";
import DetailModal from "../../components/Board/DetailModal";
import { useNavigate } from "react-router-dom";
import { getBoardPosts } from "../../api/board";
import { getMyProfile } from "../../api/profile";
import type { BoardItem } from "../../types/board";
import type { User } from "../../types/user";

const PAGE_SIZE = 50;

const SORT_OPTIONS = [
  { label: "최신순", value: "latest" },
  { label: "오래된순", value: "oldest" },
  { label: "추천순", value: "likes" },
];

type TabType = "all" | "post" | "gallery" | "thirty" | "ten";

const BoardPage: React.FC = () => {
  const [boardList, setBoardList] = useState<BoardItem[]>([]);
  const [user, setUser] = useState<User | null>(null); // ✅ 훅은 여기
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("latest");
  const [selectedTab, setSelectedTab] = useState<TabType>("all");
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<"post" | "gallery" | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();

  // ✅ 로그인 유저 정보 가져오기
  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getMyProfile();
        setUser(data);
      } catch (err) {
        console.error("유저 정보 불러오기 실패", err);
      }
    }
    fetchUser();
  }, []);

  // 게시글 불러오기
  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getBoardPosts({
          page,
          keyword,
          sort,
          type: selectedTab === "post" || selectedTab === "gallery" ? selectedTab : undefined,
          minLikes: selectedTab === "thirty" ? 30 : selectedTab === "ten" ? 10 : undefined,
        });
        setBoardList(data.results ?? data);
        setTotalCount(data.count ?? data.length);
      } catch (err) {
        console.error("게시글 불러오기 실패", err);
      }
    }
    fetchPosts();
  }, [page, keyword, sort, selectedTab]);

  const totalPage = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

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
                  <WriteButton to={`/board/write?type=${selectedTab === "gallery" ? "gallery" : "post"}`} />
                </SortWrite>
              </TabSortWrapper>

              <BoardList
                list={boardList}
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
            {user ? (
              <BoardProfile user={user} />
            ) : (
              <div>유저 정보를 불러오는 중...</div>
            )}
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