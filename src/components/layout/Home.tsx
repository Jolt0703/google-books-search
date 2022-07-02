import React from "react";
import Search from "../features/Search";
import Books from "../books/Books";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Pagination from "../features/Pagination";
import Appbar from "./Appbar";
import { fetchBooksData, initializeData } from "../features/searchSlice";
import { useSearchParams } from "react-router-dom";

const Home = React.memo(() => {
  const items = useAppSelector((state) => state.items);
  const { books } = items;

  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const page = searchParams.get("page");

  const fetchData = React.useCallback(async () => {
    if (search && page) {
      dispatch(fetchBooksData(search, Number.parseInt(page)));
    } else if (search) {
      dispatch(fetchBooksData(search));
    } else {
      dispatch(initializeData());
    }
  }, [search, page, dispatch]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

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
});

export default Home;
