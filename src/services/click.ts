//click.tsx
import { baseQueryWithAuth } from "@/lib/apiUtils";
import { createApi } from "@reduxjs/toolkit/query/react";

export const clickApi = createApi({
  reducerPath: "clickApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Clicks"],
  endpoints: (build) => ({
    storeClick: build.mutation({
      query: ({ urlId, device, city, country }) => ({
        url: `/click`,
        method: "POST",
        body: { urlId, device, city, country },
      }),
      invalidatesTags: ["Clicks"],
    }),
    getAllClick: build.query({
      query: () => ({
        url: `/click`,
        method: "GET",
      }),
      providesTags: ["Clicks"],
    }),
    getClickData: build.query({
      query: (urlId) => ({
        url: `/click/${urlId}`,
        method: "GET",
      }),
      providesTags: ["Clicks"],
    }),
  }),
});

export const {
  useStoreClickMutation,
  useGetAllClickQuery,
  useGetClickDataQuery,
} = clickApi;
