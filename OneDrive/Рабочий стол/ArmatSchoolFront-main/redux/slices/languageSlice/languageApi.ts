import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Language } from "./languageSlice";

export const languageApi = createApi({
  reducerPath: "languageApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getLanguages: builder.query<Language[], void>({
      query: () => "/reference/languages",
      transformResponse: (res: { data: Language[] }) => res.data,
    }),
  }),
});

export const { useGetLanguagesQuery } = languageApi;