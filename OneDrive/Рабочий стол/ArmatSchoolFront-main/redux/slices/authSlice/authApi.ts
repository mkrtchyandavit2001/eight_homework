// redux/slices/authSlice/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string;
  password: string;
  password_confirmation: string;
  language_id?: number | null;
  timezone_id?: number | null;
  legal_document_ids: number[];
}

export interface LegalDocument {
  id: number;
  title: string;
  slug: string;
}

export interface UserResource {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  birth_date: string | null;
  gender: string | null;
  avatar_url: string | null;
  about_me: string | null;
  learning_goal: string | null;
  status: string;
  account_state: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include", // ՊԱՐՏԱԴԻՐ Է Sanctum-ի cookie-ների (csrf, session) համար
    prepareHeaders: (headers) => {
      const getCookie = (name: string) => {
        if (typeof document === "undefined") return undefined;
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift();
      };

      const xsrfToken = getCookie("XSRF-TOKEN");
      if (xsrfToken) {
        headers.set("X-XSRF-TOKEN", decodeURIComponent(xsrfToken));
      }

      // Դինամիկ ստանում ենք ընթացիկ լեզուն URL-ի սեգմենտներից
      let currentLocale = "hy";
      if (typeof window !== "undefined") {
        const segments = window.location.pathname.split("/");
        if (segments[1] === "en" || segments[1] === "hy") {
          currentLocale = segments[1];
        }
      }

      headers.set("X-Language", currentLocale); 
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getCsrfToken: builder.query<void, void>({
      query: () => ({
        url: "/sanctum/csrf-cookie", 
        method: "GET",
      }),
    }),
    
    getLegalDocuments: builder.query<{ data: LegalDocument[] }, string>({
      query: (locale = "en") => `/reference/legal-documents?locale=${locale}`,
    }),

    register: builder.mutation<any, RegisterRequest>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),

    login: builder.mutation({
      async queryFn(credentials, _queryApi, _extraOptions, fetchWithBaseQuery) {
        try {
          await fetchWithBaseQuery({
            url: "/sanctum/csrf-cookie",
            method: "GET",
          });

          const loginResult = await fetchWithBaseQuery({
            url: "/auth/login",
            method: "POST",
            body: credentials,
          });

          if (loginResult.error) {
            return { error: loginResult.error };
          }

          return { data: loginResult.data };
        } catch (err) {
          return { error: { status: "CUSTOM_ERROR", error: String(err) } };
        }
      },
    }),

    getMe: builder.query<{ data: UserResource }, void>({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // --- Logout mutation (/api/auth/logout -> ռայթով գնում է Laravel) ---
    logout: builder.mutation<any, void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBaseQuery) {
        try {
          const logoutResult = await fetchWithBaseQuery({
            url: "/auth/logout",
            method: "POST",
          });

          if (logoutResult.error) {
            return { error: logoutResult.error };
          }

          return { data: logoutResult.data };
        } catch (err) {
          return { error: { status: "CUSTOM_ERROR", error: String(err) } };
        }
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLazyGetCsrfTokenQuery,
  useRegisterMutation,
  useGetLegalDocumentsQuery,
  useLoginMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  useLogoutMutation,
} = authApi;