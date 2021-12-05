import React, { FC, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchBooksData } from "./searchSlice";
import { generateRange } from "./utils";

type PageProps = {
  pageNumber: number;
  currentPage: number;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Page: FC<PageProps> = ({ pageNumber, currentPage, onClick }) => {
  return (
    <>
      <li className={pageNumber === currentPage ? "page-item active" : "page-item"}>
        <button className="page-link" onClick={onClick} value={pageNumber}>
          {pageNumber}
        </button>
      </li>
    </>
  );
};

const Pagination = () => {
  const { currentPage, maxResults, totalItems, books, searchKey } = useAppSelector((state) => state.items);
  const dispatch = useAppDispatch();

  if (!books || books.length === 0) return <></>;

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    const targetPage = Number(e.currentTarget.value);
    dispatch(fetchBooksData(searchKey, targetPage));
  };

  const goNext = () => dispatch(fetchBooksData(searchKey, currentPage + 1));
  const goPrevious = () => dispatch(fetchBooksData(searchKey, currentPage - 1));

  const lastPage = Math.floor(totalItems / maxResults);
  let nextFlag = currentPage === lastPage ? true : false;
  let previousFlag = currentPage === 1 ? true : false;

  return (
    <>
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
    </>
  );
};

export default Pagination;
