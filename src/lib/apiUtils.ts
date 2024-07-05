// apiUtils.ts
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

export const baseQueryWithAuth = fetchBaseQuery({
  //baseUrl: "http://localhost:5000/api",
  baseUrl: `${import.meta.env.VITE_SERVER_URL}/api`,
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include",
});
