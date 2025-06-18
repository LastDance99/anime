import React, { useState, useMemo, useEffect } from "react";
import BoardList from "../../components/Board/BoardList/BoardList";
import BoardPagination from "../../components/Board/BoardPagination/BoardPagination";
import ChatBot from "../../components/ChatBot/ChatBot";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import SearchInput from "../../components/SearchInput/SearchInput";
import { boardList } from "../../data/boardList";
import type { BoardItem } from "../../types/board";
import { useOutletContext } from "react-router-dom";
import dayjs from "dayjs";
import DetailModal from "../../components/Board/DetailModal";
import {
  Section,
  Container,
  Main,
  Header,
  Title,
  Footer,
  Sidebar,
} from "./MyBoardPage.styled";

const PAGE_SIZE = 50;

const SORT_OPTIONS = [
  { label: "최신순", value: "latest" },
  { label: "오래된순", value: "oldest" },
  { label: "추천순", value: "likes" },
];

type ProfileContext = {
  user: {
    id: number;
    nickname: string;
  };
};

const MyBoardPage: React.FC = () => {
  const [sort, setSort] = useState("latest");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const { user } = useOutletContext<ProfileContext>();

  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const myPosts = useMemo(() => {
    return boardList.filter(item => item.author.id === user.id && item.board_type === "post");
  }, [user.id]);

  const filteredList = useMemo(() => {
    let list = [...myPosts];

    if (keyword.trim()) {
      const kw = keyword.toLowerCase();
      list = list.filter(item =>
        item.title.toLowerCase().includes(kw) ||
        item.content.toLowerCase().includes(kw) ||
        item.author.nickname.toLowerCase().includes(kw)
      );
    }

    switch (sort) {
      case "latest":
        list.sort((a, b) => dayjs(b.created_at).valueOf() - dayjs(a.created_at).valueOf());
        break;
      case "oldest":
        list.sort((a, b) => dayjs(a.created_at).valueOf() - dayjs(b.created_at).valueOf());
        break;
      case "likes":
        list.sort((a, b) => (b.like_count ?? 0) - (a.like_count ?? 0));
        break;
    }
    return list;
  }, [sort, keyword, myPosts]);

  const pagedList = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredList.slice(start, start + PAGE_SIZE);
  }, [filteredList, page]);

  const totalPage = Math.max(1, Math.ceil(filteredList.length / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [keyword, sort]);

  return (
    <Section>
      <Container>
        <Main>
          <Header>
            <Title>{user.nickname}님이 쓴 게시글</Title>
            <SortDropdown value={sort} onChange={setSort} options={SORT_OPTIONS} />
          </Header>

          <BoardList
            list={pagedList}
            page={page}
            pageSize={PAGE_SIZE}
            onItemClick={(id) => setSelectedPostId(id)}
          />

          {selectedPostId !== null && (
            <DetailModal
              id={selectedPostId}
              type="post"
              onClose={() => setSelectedPostId(null)}
            />
          )}

          <Footer>
            <BoardPagination page={page} totalPage={totalPage} onChange={setPage} />
            <SearchInput
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              onSearch={() => setPage(1)}
              placeholder="검색어를 입력하세요"
            />
          </Footer>
        </Main>

        <Sidebar>
        </Sidebar>
      </Container>
    </Section>
  );
};

export default MyBoardPage;