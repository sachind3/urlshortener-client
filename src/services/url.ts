// url.ts
import { baseQueryWithAuth } from "@/lib/apiUtils";
import { createApi } from "@reduxjs/toolkit/query/react";

export const urlApi = createApi({
  reducerPath: "urlApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Urls", "Clicks"],
  endpoints: (build) => ({
    createUrl: build.mutation({
      query: ({ title, original_url, short_url }) => ({
        url: `/url`,
        method: "POST",
        body: { title, original_url, short_url },
      }),
      invalidatesTags: ["Urls", "Clicks"],
    }),
    deleteUrl: build.mutation({
      query: (id) => ({
        url: `/url/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Urls", "Clicks"],
    }),
    getAllUrl: build.query({
      query: () => ({
        url: `/url`,
        method: "GET",
      }),
      providesTags: ["Urls"],
    }),
    getUrl: build.query({
      query: (id) => ({
        url: `/url/${id}`,
        method: "GET",
      }),
      providesTags: ["Urls"],
    }),
    getByShortUrl: build.query({
      query: (short_url) => ({
        url: `/url/redirect/${short_url}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateUrlMutation,
  useDeleteUrlMutation,
  useGetAllUrlQuery,
  useGetUrlQuery,
  useGetByShortUrlQuery,
} = urlApi;
