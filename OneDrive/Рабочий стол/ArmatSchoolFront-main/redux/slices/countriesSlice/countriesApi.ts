// redux/slices/countriesSlice/countriesApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface CountryResource {
  id: number;
  code: string;
  name: string;
}

export interface CountriesResponse {
  data: CountryResource[];
}

export const countriesApi = createApi({
  reducerPath: "countriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api", // Օգտագործում ենք տեղային rewrite-ը և շրջանցում CORS-ը
  }),
  endpoints: (builder) => ({
    getCountries: builder.query<CountriesResponse, string>({
      query: (locale) => `reference/countries?locale=${locale}`,
    }),
  }),
});

export const { useGetCountriesQuery } = countriesApi;