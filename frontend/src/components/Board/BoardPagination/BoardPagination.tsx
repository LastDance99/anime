import React from "react";
import { PaginationWrapper, PageButton } from "./BoardPagination.styled";
import { ArrowLeft, ArrowRight } from "lucide-react";

type BoardPaginationProps = {
  page: number;
  totalPage: number;
  onChange: (page: number) => void;
};

const BoardPagination: React.FC<BoardPaginationProps> = ({
  page,
  totalPage,
  onChange,
}) => {
  // 페이지 버튼 5개만 보여주기 (ex: 1 2 3 4 5)
  const maxPage = Math.min(5, totalPage);
  let start = Math.max(1, page - 2);
  let end = start + maxPage - 1;
  if (end > totalPage) {
    end = totalPage;
    start = Math.max(1, end - maxPage + 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <PaginationWrapper>
      <PageButton
        selected={false}
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="이전 페이지"
        style={{
          background: "none",
          color: "#f9b8c7",
          borderRadius: "50%",
          padding: 0,
          minWidth: 32,
        }}
      >
        <ArrowLeft size={20} />
      </PageButton>
      {pages.map((p) => (
        <PageButton
          key={p}
          selected={p === page}
          onClick={() => onChange(p)}
          style={{
            borderRadius: "50%",
            minWidth: 32,
            minHeight: 32,
            fontWeight: 600,
          }}
        >
          {p}
        </PageButton>
      ))}
      <PageButton
        selected={false}
        onClick={() => onChange(page + 1)}
        disabled={page === totalPage}
        aria-label="다음 페이지"
        style={{
          background: "none",
          color: "#f9b8c7",
          borderRadius: "50%",
          padding: 0,
          minWidth: 32,
        }}
      >
        <ArrowRight size={20} />
      </PageButton>
    </PaginationWrapper>
  );
};

export default BoardPagination;
