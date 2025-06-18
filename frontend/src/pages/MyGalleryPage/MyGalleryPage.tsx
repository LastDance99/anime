import React, { useState, useMemo, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import GalleryGrid from "../../components/MyGallery/GalleryGrid";
import BoardPagination from "../../components/Board/BoardPagination/BoardPagination";
import SearchInput from "../../components/SearchInput/SearchInput";
import ChatBot from "../../components/ChatBot/ChatBot";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import { boardList } from "../../data/boardList";
import DetailModal from "../../components/Board/DetailModal";
import type { BoardItem } from "../../types/board";
import {
  Section,
  Container,
  Main,
  Header,
  Title,
  Footer,
  Sidebar,
} from "./MyGalleryPage.styled";

const PAGE_SIZE = 40;

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

const MyGalleryPage: React.FC = () => {
  const { user } = useOutletContext<ProfileContext>();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("latest");
  
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const myGalleryPosts = useMemo(() => {
    return boardList.filter(
      item =>
        item.author.id === user.id &&
        item.board_type === "gallery"
    );
  }, [user.id]);

  const filteredList = useMemo(() => {
    let list = [...myGalleryPosts];

    const kw = keyword.trim().toLowerCase();
    if (kw) {
      list = list.filter(item =>
        item.title.toLowerCase().includes(kw) ||
        item.content.toLowerCase().includes(kw)
      );
    }

    switch (sort) {
      case "latest":
        list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case "oldest":
        list.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case "likes":
        list.sort((a, b) => (b.like_count ?? 0) - (a.like_count ?? 0));
        break;
    }

    return list;
  }, [keyword, sort, myGalleryPosts]);

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
            <Title>{user.nickname}님의 갤러리</Title>
            <div style={{ marginRight: "52px" }}>
              <SortDropdown value={sort} onChange={setSort} options={SORT_OPTIONS} />
            </div>
          </Header>

          <GalleryGrid list={pagedList} onItemClick={(id) => setSelectedPostId(id)} />

          {selectedPostId !== null && (
            <DetailModal
              id={selectedPostId}
              type="gallery"
              onClose={() => setSelectedPostId(null)}
            />
          )}

          <Footer>
            <BoardPagination page={page} totalPage={totalPage} onChange={setPage} />
            <SearchInput
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              onSearch={() => setPage(1)}
              placeholder="제목 또는 내용을 검색하세요"
            />
          </Footer>
        </Main>

        <Sidebar>
        </Sidebar>
      </Container>
    </Section>
  );
};

export default MyGalleryPage;