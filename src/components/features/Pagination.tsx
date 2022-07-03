import React, { FC, MouseEvent } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { generateRange } from "./utils";

type PageProps = {
  pageNumber: number;
  currentPage: number;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Page: FC<PageProps> = React.memo(({ pageNumber, currentPage, onClick }) => {
  return (
    <React.Fragment>
      <li className={pageNumber === currentPage ? "page-item active" : "page-item"}>
        <button className="page-link" onClick={onClick} value={pageNumber}>
          {pageNumber}
        </button>
      </li>
    </React.Fragment>
  );
});

const Pagination = React.memo(() => {
  const { currentPage, maxResults, totalItems, books, searchKey, isLoading } = useAppSelector((state) => state.items);
  const navigate = useNavigate();

  if (!books || books.length === 0) return <></>;

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const targetPage = Number(e.currentTarget.value);
    const params = createSearchParams({ search: searchKey, page: targetPage.toString() });
    navigate({
      pathname: "/",
      search: `?${params}`,
    });
  };

  const goNext = () => {
    const targetPage = currentPage + 1;
    const params = createSearchParams({ search: searchKey, page: targetPage.toString() });
    navigate({
      pathname: "/",
      search: `?${params}`,
    });
  };

  const goPrevious = () => {
    const targetPage = currentPage - 1;
    const params = createSearchParams({ search: searchKey, page: targetPage.toString() });
    navigate({
      pathname: "/",
      search: `?${params}`,
    });
  };

  const lastPage = Math.floor(totalItems / maxResults);
  let nextFlag = currentPage === lastPage ? true : false;
  let previousFlag = currentPage === 1 ? true : false;

  if (isLoading) return <></>;

  return (
    <React.Fragment>
      <nav aria-label="Page navigation" className="d-flex justify-content-center">
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" aria-label="Previous" onClick={goPrevious} disabled={previousFlag}>
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </button>
          </li>

          {generateRange(currentPage, lastPage).map((el, _index) => (
            <Page pageNumber={el} key={el} currentPage={currentPage} onClick={onClick} />
          ))}

          <li className="page-item">
            <button className="page-link" aria-label="Next" onClick={goNext} disabled={nextFlag}>
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
});

export default Pagination;
