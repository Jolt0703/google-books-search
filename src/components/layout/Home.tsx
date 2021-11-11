import { Fragment } from "react";
import Search from "../features/Search";
import Books from "../books/Books";
import { useAppSelector } from "../../hooks";
import Pagination from "../features/Pagination";

const Home = () => {
  const items = useAppSelector((state) => state.items);
  const { books } = items;

  return (
    <Fragment>
      <Search />
      <Books books={books} />
      <Pagination />
    </Fragment>
  );
};

export default Home;
