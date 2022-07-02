import React from "react";
import { FC } from "react";
import Book, { BookInfo } from "./Book";

export type BooksProps = {
  books?: BookInfo[];
};

const Books: FC<BooksProps> = React.memo(({ books }) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="row w-75">
        {books && books.map((book) => <Book id={book.id} key={book.id} volumeInfo={book.volumeInfo} />)}
      </div>
    </div>
  );
});

export default Books;
