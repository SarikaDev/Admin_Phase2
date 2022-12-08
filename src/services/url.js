import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useSelector } from "react-redux";
import { REHYDRATE } from "redux-persist";
import moment from "moment";
const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.boamw.aptiway.com/api",
  credentials: "same-origin",
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.authorization?.accessToken;
    console.log("token", token);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
    }
    return headers;
  },
});

export const aptiwaySlice = createApi({
  reducerPath: "aptiway",
  baseQuery,
  credentials: "include", // This allows server to set cookies
  tagTypes: ["Branch", "AllUsers"],
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
    getBranches: builder.query({
      query: () => "/profile/customer/branch",
      providesTags: ["Branch"],
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
    createUser: builder.mutation({
      query: ({ MobileNumber, role, name, branch, status }) => {
        return {
          url: "/user",
          method: "POST",
          body: {
            attributeName: "MobileNumber",
            attributeValue: MobileNumber,
            role: role,
            displayName: name,
            branchId: branch,
            status: status,
          },
        };
      },
    }),
    singleUser: builder.query({
      query: ({ MobileNumber }) => {
        return {
          url: "",
          method: "GET",
          params: {
            MobileNumber,
          },
        };
      },
    }),
    users: builder.query({
      query: ({
        pageNumber,
        pageSize,
        fromDate,
        toDate,
        search,
        selectedFilter,
      }) => {
        return {
          url: "/user",
          method: "GET",
          params: {
            pageNumber: pageNumber + 1,
            ...(fromDate && {
              fromLastUpdated: moment(fromDate).format("YYYY-MM-DD"),
            }),
            ...(toDate && {
              toLastUpdated: moment(toDate).format("YYYY-MM-DD"),
            }),
            pageSize,
            ...(search && {
              [selectedFilter]:
                selectedFilter === "mobileNumber" ? `+251${search}` : search,
            }),
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
  useCreateUserMutation,
  useUsersQuery,
  useSingelUserQuery,
  useGetBranchesQuery,
} = aptiwaySlice;
