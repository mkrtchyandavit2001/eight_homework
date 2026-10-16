// redux/slices/verifyEmailSlice/verifyEmailApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const verifyEmailApi = createApi({
  reducerPath: "verifyEmailApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
    prepareHeaders: (headers) => {
      const xsrfToken = typeof window === "undefined"
        ? undefined
        : document.cookie
            .split("; ")
            .find((cookie) => cookie.startsWith("XSRF-TOKEN="))
            ?.slice("XSRF-TOKEN=".length);

      if (xsrfToken) {
        headers.set("X-XSRF-TOKEN", decodeURIComponent(xsrfToken));
      }

      headers.set("X-Language", "hy");
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    verifyEmail: builder.mutation<any, { verifyUrl: string }>({
      query: ({ verifyUrl }) => ({
        url: verifyUrl,
        method: "GET",
      }),
    }),
    resendVerification: builder.mutation<any, void>({
      query: () => ({
        url: "/auth/email/verification-notification",
        method: "POST",
      }),
    }),
  }),
});

// ԱՅՍՊԻՍԻՆ ՊԵՏՔ Է ԼԻՆԻ ԱՐՏԱՀԱՆՈՒՄԸ (EXPORTS)
export const {
  useVerifyEmailMutation,
  useResendVerificationMutation,
} = verifyEmailApi;