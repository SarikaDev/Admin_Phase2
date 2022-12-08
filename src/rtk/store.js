import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { aptiwaySlice } from "../services/url";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import userSlice from "./slices/userSlice";
import authSlice from "./slices/authSlice";
import accessTokenSlice from "./slices/accessTokenSlice";
// import authSlice from "./slices/authSlice";
import storage from "redux-persist/lib/storage/session";
import {
  FLUSH,
  PAUSE,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import branchSlice from "./slices/branchSlice";
import authorizationSlice from "./slices/authorizationSlice";
import authenticationSlice from "./slices/authenticationSlice";
const logger = require("redux-logger");

const rootReducer = combineReducers({
  [aptiwaySlice.reducerPath]: aptiwaySlice.reducer,
  userDetails: userSlice,
  authorization: authorizationSlice,
  authentication: authenticationSlice,
  branch: branchSlice,
  // authSlice: authSlice,
});

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat([aptiwaySlice.middleware, logger.createLogger()]),
  devTools: true,
}); //end

export const persistor = persistStore(store);

setupListeners(store.dispatch);
