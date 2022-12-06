// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,
//   token: null,
// };
// const authSlice = createSlice({
//   name: "auth",
//   initialState: initialState,
//   reducers: {
//     setCredentials: (state, { user, accessToken }) => {
//       state.user = user;
//       state.token = accessToken;
//     },
//     logOut: state => {
//       state.user = null;
//       state.token = null;
//     },
//   },
// });

// export const { setCredentials, logOut } = authSlice.actions;

// export const selectCurrentUser = state => state.auth.user;
// export const selectCurrentToken = state => state.auth.token;
// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const InitialState = {
  identityNumber: "",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: InitialState,
  reducers: {
    setIdentity(state, { payload }) {
      state.identityNumber = payload?.identityNumber;
    },
  },
});

export const { setIdentity } = AuthSlice.actions;

export default AuthSlice.reducer;
