import { createSlice } from "@reduxjs/toolkit";

const detailSlice = createSlice({
  name: "detail",
  initialState: {
    item: null,
  },
  reducers: {
    setDetail: (state, action) => {
      state.item = action.payload;
    },
    clearDetail: (state) => {
      state.item = null;
    },
  },
});

export const { setDetail, clearDetail } = detailSlice.actions;
export default detailSlice.reducer;