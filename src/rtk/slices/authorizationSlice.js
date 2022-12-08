import { createSlice } from "@reduxjs/toolkit";

const InitialState = {
  accessToken: "",
};

const AuthorizationSlice = createSlice({
  name: "authorization",
  initialState: InitialState,
  reducers: {
    setAccessToken(state, { payload }) {
      state.accessToken = payload?.accessToken;
    },
  },
});

export const { setAccessToken } = AuthorizationSlice.actions;

export default AuthorizationSlice.reducer;
