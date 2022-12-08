import { createSlice } from "@reduxjs/toolkit";

const InitialState = {
  identityNumber: "",
  credentials: [],
};

const AuthenticationSlice = createSlice({
  name: "authentication",
  initialState: InitialState,
  reducers: {
    setIdentity(state, { payload }) {
      state.identityNumber = payload?.identityNumber;
    },
    setCredentials(state, { payload }) {
      state.credentials = payload?.credentials;
    },
  },
});

export const { setIdentity, setCredentials } = AuthenticationSlice.actions;

export default AuthenticationSlice.reducer;
