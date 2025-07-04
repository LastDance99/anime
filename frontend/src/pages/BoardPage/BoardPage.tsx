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
import DetailModal from "../../components/Board/DetailModal/DetailModal";
import BoardSideWidget from "../../components/Board/BoardSideWidget";
import { useNavigate } from "react-router-dom";
import { getBoardPosts } from "../../api/board";
import { getMyProfile } from "../../api/profile";
import type { BoardItem } from "../../types/board";
import type { User } from "../../types/user";
import { useTranslation } from "react-i18next";

const PAGE_SIZE = 50;

const BoardPage: React.FC = () => {
  const { t } = useTranslation();
  const [boardList, setBoardList] = useState<BoardItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("latest");
  const [selectedTab, setSelectedTab] = useState<"all" | "post" | "gallery" | "thirty" | "ten">("all");
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<"post" | "gallery" | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();

  const SORT_OPTIONS = [
    { label: t("board.sort_latest"), value: "latest" },
    { label: t("board.sort_oldest"), value: "oldest" },
    { label: t("board.sort_likes"), value: "likes" },
  ];

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

  useEffect(() => {
    async function fetchPosts() {
      const queryType =
        selectedTab === "post" || selectedTab === "gallery"
          ? selectedTab
          : selectedTab === "thirty"
          ? "like30"
          : selectedTab === "ten"
          ? "like10"
          : "all";

      try {
        const data = await getBoardPosts({
          page,
          keyword,
          sort,
          type: queryType,
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

  return (
    <Section>
      <Container>
        <Wrapper>
          <BoardSectionBox>
            <BoardHeader>{t("board.all_board")}</BoardHeader>
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
                  placeholder={t("board.search_placeholder")}
                />
              </PageSearchWrapper>
            </BoardSection>
          </BoardSectionBox>

          <SidebarSection>
            {user ? (
              <BoardProfile user={user} />
            ) : (
              <div>{t("board.loading_user")}</div>
            )}

            <BoardSideWidget />
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
          onDeleteSuccess={(deletedId) => {
            setBoardList((prev) => prev.filter((post) => post.id !== deletedId));
            setSelectedPostId(null);
            setSelectedType(null);
          }}
        />
      )}
    </Section>
  );
};

export default BoardPage;