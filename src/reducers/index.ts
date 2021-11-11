import { combineReducers } from "@reduxjs/toolkit";
import searchReducer from "../components/features/searchSlice";

const rootReducer = combineReducers({
  items: searchReducer,
});

export default rootReducer;
