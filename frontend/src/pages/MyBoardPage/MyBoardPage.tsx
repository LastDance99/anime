import React, { useState, useEffect } from "react";
import BoardList from "../../components/Board/BoardList/BoardList";
import BoardPagination from "../../components/Board/BoardPagination/BoardPagination";
import ChatBot from "../../components/ChatBot/ChatBot";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import SearchInput from "../../components/SearchInput/SearchInput";
import DetailModal from "../../components/Board/DetailModal/DetailModal";
import { getUserContent } from "../../api/profile";
import { useOutletContext } from "react-router-dom";
import {
  Section,
  Container,
  Main,
  Header,
  Title,
  Footer,
  Sidebar,
} from "./MyBoardPage.styled";
import { useTranslation } from "react-i18next";

const PAGE_SIZE = 50;

type ProfileContext = {
  user: {
    id: number;
    nickname: string;
  };
};

const MyBoardPage: React.FC = () => {
  const { t } = useTranslation();
  const [sort, setSort] = useState("latest");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const { user } = useOutletContext<ProfileContext>();

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
        type: "post",
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
            <Title>{t("myboard.title", { nickname: user.nickname })}</Title>
            <SortDropdown value={sort} onChange={setSort} options={SORT_OPTIONS} />
          </Header>

          <BoardList
            list={list}
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
              placeholder={t("common.search_placeholder")}
            />
          </Footer>
        </Main>
      </Container>
    </Section>
  );
};

export default MyBoardPage;