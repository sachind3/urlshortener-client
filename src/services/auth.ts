//auth.tsx
import { baseQueryWithAuth } from "@/lib/apiUtils";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (build) => ({
    register: build.mutation({
      query: ({ name, email, password }) => ({
        url: `/auth/register`,
        method: "POST",
        body: { name, email, password },
      }),
    }),
    login: build.mutation({
      query: ({ email, password }) => ({
        url: `/auth/login`,
        method: "POST",
        body: { email, password },
      }),
    }),
    getUser: build.query({
      query: () => ({
        url: `/user/profile`,
        method: "GET",
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
      }),
    }),
    refreshToken: build.mutation({
      query: () => ({
        url: `/auth/refresh-token`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLazyGetUserQuery,
  useLogoutMutation,
  useRefreshTokenMutation,
} = authApi;
