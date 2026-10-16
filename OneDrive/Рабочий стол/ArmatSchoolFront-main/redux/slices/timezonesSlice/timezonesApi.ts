// redux/slices/timezonesSlice/timezonesApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TimezoneResource {
  id: number;
  identifier: string;
  offset: string;
  abbreviation: string;
  representative_city: string;
  label: string;
}

export interface TimezonesResponse {
  data: TimezoneResource[];
}

export interface GetTimezonesParams {
  locale: string;
  country_id?: number | string | null;
  detected?: string;
  search?: string;
}

export const timezonesApi = createApi({
  reducerPath: "timezonesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api", // Ճիշտ ինչպես countriesApi-ում՝ շրջանցելու համար CORS-ը
  }),
  endpoints: (builder) => ({
    getTimezones: builder.query<TimezonesResponse, GetTimezonesParams>({
      query: (params) => ({
        url: "reference/timezones",
        params: {
          locale: params.locale,
          country_id: params.country_id ?? "",
          detected: params.detected ?? "",
          search: params.search ?? "",
        },
      }),
    }),
  }),
});

export const { useGetTimezonesQuery } = timezonesApi;