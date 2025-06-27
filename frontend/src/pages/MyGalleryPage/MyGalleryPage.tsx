import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import GalleryGrid from "../../components/MyGallery/GalleryGrid";
import BoardPagination from "../../components/Board/BoardPagination/BoardPagination";
import SearchInput from "../../components/SearchInput/SearchInput";
import DetailModal from "../../components/Board/DetailModal/DetailModal";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import { getUserContent } from "../../api/profile";
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
  { label: "추천순", value: "like" },
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
  const [list, setList] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const res = await getUserContent({
        userId: user.id,
        type: "gallery",
        q: keyword,
        order: sort,
        page,
      });
      console.log("📸 갤러리 리스트:", list);
      setList(res.results);
      setTotalPage(Math.max(1, Math.ceil(res.count / PAGE_SIZE)));
    };
    fetch();
  }, [user.id, page, keyword, sort]);

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

          <GalleryGrid list={list} onItemClick={(id) => setSelectedPostId(id)} />

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
      </Container>
    </Section>
  );
};

export default MyGalleryPage;