// apiUtils.ts
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getServerUrl } from "./utils";

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

const baseServerUrl = getServerUrl();

export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: `${baseServerUrl}/api`,
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include",
});
