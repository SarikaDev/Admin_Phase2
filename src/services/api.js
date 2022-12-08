// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
// import { setCredentials, logOut } from "../rtk/slices/authSlice";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "https://api.boamw.aptiway.com/api",
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.token;
//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// const baseQueryWithReAuth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);
//   if (result?.error.originalStatus === 403) {
//     console.error("Sending Refresh Token");
//     const refeshResult = await baseQuery("/refresh", api, extraOptions);
//     console.log("refeshResult", refeshResult);
//     if (refeshResult?.data) {
//       const user = api.getState().auth.user;
//       api.dispatch(setCredentials({ ...refeshResult.data, user }));
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logOut());
//     }
//   }
//   return result;
// };

// export const apiSlice = createApi({
//   baseQuery,
//   endpoints: builder => ({}),
// });
