// redux/slices/armenianLevelsSlice/armenianLevelsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ArmenianLevelResource {
  id: number;
  code: string;
  title: string;
  description: string | null;
}

export interface ArmenianLevelsResponse {
  data: ArmenianLevelResource[];
}

export const armenianLevelsApi = createApi({
  reducerPath: "armenianLevelsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api", // Շրջանցում ենք CORS-ը տեղային ռվրայթով
  }),
  endpoints: (builder) => ({
    getArmenianLevels: builder.query<ArmenianLevelsResponse, string>({
      query: (locale) => `reference/armenian-levels?locale=${locale}`,
    }),
  }),
});

export const { useGetArmenianLevelsQuery } = armenianLevelsApi;