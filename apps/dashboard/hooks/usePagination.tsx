import { useEffect, useState } from 'react';

interface Pagination {
  setTotal: (total: number) => void;
  page: number;
  setPage: (page: number) => void;
  pages: number;
  limit: number;
  total: number;
}

export const usePagination = ({ limit }: { limit: number }): Pagination => {
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPages(Math.ceil(Number(total) / limit));
  }, [total]);

  const setPageProtection = (page: number) => {
    if (page < 1 || page > pages) return;
    setPage(page);
  };

  return { setTotal, page, setPage: setPageProtection, pages, limit, total };
};
