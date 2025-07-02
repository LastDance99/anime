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
import { useTranslation } from "react-i18next";

const PAGE_SIZE = 40;

type ProfileContext = {
  user: {
    id: number;
    nickname: string;
  };
};

const MyGalleryPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useOutletContext<ProfileContext>();
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [sort, setSort] = useState("latest");
  const [list, setList] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const SORT_OPTIONS = [
    { label: t("sort.latest"), value: "latest" },
    { label: t("sort.oldest"), value: "oldest" },
    { label: t("sort.likes"), value: "like" },
  ];

  useEffect(() => {
    const fetch = async () => {
      const res = await getUserContent({
        userId: user.id,
        type: "gallery",
        q: keyword,
        order: sort,
        page,
      });
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
            <Title>{t("mygallery.title", { nickname: user.nickname })}</Title>
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
              placeholder={t("mygallery.search_placeholder")}
            />
          </Footer>
        </Main>
      </Container>
    </Section>
  );
};

export default MyGalleryPage;