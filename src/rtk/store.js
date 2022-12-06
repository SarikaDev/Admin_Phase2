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
const logger = require("redux-logger");

const rootReducer = combineReducers({
  [aptiwaySlice.reducerPath]: aptiwaySlice.reducer,
  userDetails: userSlice,
  accessToken: accessTokenSlice,
  auth: authSlice,
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
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER],
      },
    }).concat([aptiwaySlice.middleware, logger.createLogger()]),
  devTools: true,
}); //end

export const persistor = persistStore(store);

setupListeners(store.dispatch);
