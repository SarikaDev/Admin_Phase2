import { createSlice } from "@reduxjs/toolkit";

const InitialState = {
  data: [],
};

const BranchSlice = createSlice({
  name: "auth",
  initialState: InitialState,
  reducers: {
    getBranchData(state, { payload }) {
      state.data = payload?.data;
    },
  },
});

export const { getBranchData } = BranchSlice.actions;

export default BranchSlice.reducer;
