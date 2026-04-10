import { configureStore } from "@reduxjs/toolkit";
import detailReducer from "./features/detailSlice";

export const store = configureStore({
  reducer: {
    detail: detailReducer,
  },
});