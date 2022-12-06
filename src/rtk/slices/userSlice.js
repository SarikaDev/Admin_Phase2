import { createSlice } from "@reduxjs/toolkit";

const InitialState = {
  identityNumber: "",
  identityStatus: "",
  userStatus: "",
  credentials: "",
  active: "",
  fingerPositions: [],
};
const userSlice = createSlice({
  name: "userDetails",
  initialState: InitialState,
  reducers: {
    setUserDetails: (state, { payload }) => {
      state.identityNumber = payload.identityNumber;
      state.identityStatus = payload.identityStatus;
      state.userStatus = payload.userStatus;
      state.credentials = payload.credentials;
      state.fingerPositions = payload.fingerPositions;
      state.active = payload.active;
    },

    setUserData: (state, { payload }) => {
      state.displayName = payload.displayName;
      state.branchId = payload.branchId;
      state.roleName = payload.roleName;
    },
  },
});

export const { setUserDetails, setUserData } = userSlice.actions;
export default userSlice.reducer;
