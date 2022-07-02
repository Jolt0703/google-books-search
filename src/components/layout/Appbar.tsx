import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { initializeData } from "../features/searchSlice";

const Appbar = React.memo(() => {
  const dispatch = useAppDispatch();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" onClick={() => dispatch(initializeData())}>
          <i className="fas fa-book-open mx-2"></i>
          Google Books Search
        </Link>
      </div>
    </nav>
  );
});

export default Appbar;
