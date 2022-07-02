import Search from "../features/Search";
import Books from "../books/Books";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Pagination from "../features/Pagination";
import Appbar from "./Appbar";
import { useEffect } from "react";
import { fetchBooksData } from "../features/searchSlice";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const items = useAppSelector((state) => state.items);
  const { books } = items;

  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const search = searchParams.get("search");
    const page = searchParams.get("page");
    if (search && page) {
      dispatch(fetchBooksData(search, Number.parseInt(page)));
    } else if (search) {
      dispatch(fetchBooksData(search));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Appbar />
      <div className="container">
        <Search />
        <Books books={books} />
        <Pagination />
      </div>
    </div>
  );
};

export default Home;
