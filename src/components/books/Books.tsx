import React from "react";
import { FC } from "react";
import { useAppSelector } from "../../hooks";
import Book, { BookInfo } from "./Book";

export type BooksProps = {
  books?: BookInfo[];
};

const Books: FC<BooksProps> = React.memo(({ books }) => {
  const { isError, searchKey } = useAppSelector((state) => state.items);
  if (isError) return <BooksNotFound searchKey={searchKey!!} />;
  return (
    <React.Fragment>
      <div className="d-flex justify-content-center align-items-center">
        <div className="row w-75">
          {books && books.map((book) => <Book id={book.id} key={book.id} volumeInfo={book.volumeInfo} />)}
        </div>
      </div>
    </React.Fragment>
  );
});

type BooksNotFoundProps = {
  searchKey: string;
};
const BooksNotFound: FC<BooksNotFoundProps> = React.memo(({ searchKey }) => {
  return (
    <React.Fragment>
      <div className="d-flex align-items-center justify-content-center p-4">
        <div className="row w-75">
          <div className="col-12">
            <div className="h6 text-center">{`「${searchKey}」の検索結果は見つかりませんでした。`}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
});

export default Books;
