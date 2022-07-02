import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../store";
import axios from "axios";

const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;
const GOOGLE_BOOKS_ENDPOINT = "https://www.googleapis.com/books/v1/volumes";

const initialState = {
  books: [],
  searchKey: "",
  currentPage: 1,
  startIndex: 0,
  maxResults: 12,
  totalItems: 0,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    getBooksData: (state, action) => {
      state.totalItems = action.payload.totalItems;
      state.searchKey = action.payload.searchKey;
      state.books = action.payload.items;
      state.currentPage = action.payload.currentPage;
      state.startIndex = state.currentPage * state.maxResults;
    },
    getBooksDataFailure: () => initialState,
    initializeData: () => initialState,
  },
});

export default searchSlice.reducer;
export const { getBooksData, getBooksDataFailure, initializeData } = searchSlice.actions;

export const fetchBooksData =
  (
    searchKey: string,
    currentPage: number = initialState.currentPage,
    maxResults: number = initialState.maxResults
  ): AppThunk =>
  async (dispatch) => {
    try {
      const startIndex = (currentPage - 1) * maxResults;
      const params = {
        q: searchKey,
        maxResults: maxResults,
        startIndex: startIndex,
        key: API_KEY,
      };
      const res = await axios.get(GOOGLE_BOOKS_ENDPOINT, {
        params: params,
      });
      res.data.searchKey = searchKey;
      res.data.currentPage = currentPage;
      res.data.items ? dispatch(getBooksData(res.data)) : alert("書籍情報が見つかりませんでした。");
    } catch (err) {
      alert("書籍情報が見つかりませんでした。");
    }
  };
