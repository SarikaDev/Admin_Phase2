import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
export const aptiwaySlice = createApi({
  reducerPath: "aptiway",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.boamw.aptiway.com/api",
  }),
  prepareHeaders: (headers, { getState, endpoint }) => {
    const user = getState().user.currentUser;

    if (user && endpoint !== "refresh") {
      headers.set("Authorization", `Bearer ${user.token.access}`);
    }
    return headers;
  },
  credentials: "include", // This allows server to set cookies

  endpoints: builder => ({
    isUserLoggedIn: builder.mutation({
      query: MobileNumber => {
        return {
          url: "/user/credential",
          method: "GET",
          params: {
            "attribute-name": "MobileNumber",
            "attribute-value": MobileNumber,
          },
        };
      },
    }),
    postPassword: builder.mutation({
      query: ({ identityNumber, Password }) => {
        return {
          url: `/user/${identityNumber}/token`,
          method: "POST",
          body: {
            credentialType: "PASSWORD",
            credential: Password,
          },
        };
      },
    }),
    postFace: builder.mutation({
      query: ({ identityNumber, croppedImage }) => {
        return {
          url: `user/${identityNumber}/token`,
          method: "POST",
          body: {
            credential: croppedImage.replace("data:image/jpeg;base64,", ""),
            credentialType: "FACE",
          },
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
    postFinger: builder.mutation({
      query: ({ identityNumber, fingerprint }) => {
        return {
          url: `user/${identityNumber}/token`,
          method: "POST",
          body: {
            credential: fingerprint,
            credentialType: "FINGERPRINT",
          },
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
  }),
});

export const {
  useIsUserLoggedInMutation,
  usePostPasswordMutation,
  usePostFaceMutation,
  usePostFingerMutation,
} = aptiwaySlice;
