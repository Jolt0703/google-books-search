import { useState, FormEvent, ChangeEvent } from "react";
import { useAppDispatch } from "../../hooks";
import { fetchBooksData } from "./searchSlice";

const Search = () => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  const searchBooks = (searchKey: string) => dispatch(fetchBooksData(searchKey));
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text !== "") searchBooks(text);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);

  return (
    <div>
      <form className="form d-flex align-items-center justify-content-center p-4" onSubmit={onSubmit}>
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
};

export default Search;
