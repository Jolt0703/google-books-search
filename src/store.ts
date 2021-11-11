import { configureStore, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";

import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
