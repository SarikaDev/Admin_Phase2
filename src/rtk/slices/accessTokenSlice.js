import { createSlice } from "@reduxjs/toolkit";

const InitialState = {
  accessToken: "",
};
const accessTokenSlice = createSlice({
  name: "userDescription",
  initialState: InitialState,
  reducers: {
    setAccessToken: (state, { payload }) => {
      state.accessToken = payload.accessToken;
    },
  },
});

export const { setAccessToken } = accessTokenSlice.actions;
export default accessTokenSlice.reducer;
