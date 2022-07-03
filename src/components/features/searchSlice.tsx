import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
  isLoading: false,
  isError: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    getBooksDataFailure: () => initialState,
    initializeData: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooksData.pending, (state, _action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchBooksData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.books = action.payload.items;
      state.searchKey = action.payload.searchKey;
      state.currentPage = action.payload.currentPage;
      state.startIndex = state.currentPage * state.maxResults;
      state.totalItems = action.payload.totalItems;
    });
    builder.addCase(fetchBooksData.rejected, (state, action) => {
      if (action.payload) {
        state.searchKey = action.payload.searchKey;
      }
      state.books = initialState.books;
      state.currentPage = initialState.currentPage;
      state.startIndex = initialState.startIndex;
      state.maxResults = initialState.maxResults;
      state.totalItems = initialState.totalItems;
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default searchSlice.reducer;
export const { getBooksDataFailure, initializeData } = searchSlice.actions;

type SearchParams = {
  searchKey: string;
  currentPage?: number;
  maxResults?: number;
};

export const fetchBooksData = createAsyncThunk<any, SearchParams, { rejectValue: SearchParams }>(
  "search/fetchBooksData",
  async ({ searchKey, currentPage = initialState.currentPage, maxResults = initialState.maxResults }, thunkAPI) => {
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
      if (!res.data.items) throw new Error("No items found");
      res.data.searchKey = searchKey;
      res.data.currentPage = currentPage;
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ searchKey });
    }
  }
);
