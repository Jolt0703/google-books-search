import React from "react";
import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

const Search = React.memo(() => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const searchBooks = (searchKey: string) => {
    navigate({
      pathname: "/",
      search: `?search=${searchKey}`,
    });
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text !== "") searchBooks(text);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);

  return (
    <div>
      <form className="form d-flex align-items-center justify-content-center p-4 search" onSubmit={onSubmit}>
        <div className="p-2 w-50">
          <input
            type="text"
            name="text"
            placeholder="キーワードで書籍を検索する…"
            value={text}
            onChange={onChange}
            className="form-control"
          />
        </div>
        <div>
          <button type="submit" className="btn btn-secondary ">
            検索
          </button>
        </div>
      </form>
    </div>
  );
});

export default Search;
