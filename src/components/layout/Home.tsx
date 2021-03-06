import React from "react";
import Search from "../features/Search";
import Books from "../books/Books";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Pagination from "../features/Pagination";
import Appbar from "./Appbar";
import { fetchBooksData, initializeData } from "../features/searchSlice";
import { useSearchParams } from "react-router-dom";
import Loading from "./Loading";

const Home = React.memo(() => {
  const items = useAppSelector((state) => state.items);
  const { books, isLoading } = items;
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const fetchData = React.useCallback(
    (search: string | null, page: string | null) => {
      if (search && page) {
        dispatch(fetchBooksData({ searchKey: search, currentPage: Number.parseInt(page) }));
      } else if (search) {
        dispatch(fetchBooksData({ searchKey: search }));
      } else {
        dispatch(initializeData());
      }
    },
    [dispatch]
  );

  React.useEffect(() => {
    const search = searchParams.get("search");
    const page = searchParams.get("page");
    fetchData(search, page);
  }, [fetchData, searchParams]);

  return (
    <div className="App">
      <Appbar />
      <div className="container">
        <Search />
        {isLoading ? <Loading /> : <Books books={books} />}
        <Pagination />
      </div>
    </div>
  );
});

export default Home;
