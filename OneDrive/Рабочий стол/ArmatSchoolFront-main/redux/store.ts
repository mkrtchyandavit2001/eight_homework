// store.ts
import { configureStore } from "@reduxjs/toolkit";

import languageReducer from "./slices/languageSlice/languageSlice";
import { languageApi } from "./slices/languageSlice/languageApi";

import countriesReducer from "./slices/countriesSlice/countriesSlice";
import { countriesApi } from "./slices/countriesSlice/countriesApi";

import { timezonesApi } from "./slices/timezonesSlice/timezonesApi";
import { armenianLevelsApi } from "./slices/armenianLevelsSlice/armenianLevelsApi";

import { authApi } from "./slices/authSlice/authApi";
import authReducer from "./slices/authSlice/authSlice";

import verifyEmailReducer from "./slices/verifyEmailSlice/verifyEmailSlice";
import { verifyEmailApi } from "./slices/verifyEmailSlice/verifyEmailApi";

export const makeStore = () =>
  configureStore({
    reducer: {
      language: languageReducer,
      [languageApi.reducerPath]: languageApi.reducer,

      countries: countriesReducer,
      [countriesApi.reducerPath]: countriesApi.reducer,

      [timezonesApi.reducerPath]: timezonesApi.reducer,
      [armenianLevelsApi.reducerPath]: armenianLevelsApi.reducer,

      [authApi.reducerPath]: authApi.reducer,
      auth: authReducer,

      verifyEmail: verifyEmailReducer,
      [verifyEmailApi.reducerPath]: verifyEmailApi.reducer,
    },

    middleware: (getDefault) =>
      getDefault()
        .concat(languageApi.middleware)
        .concat(countriesApi.middleware)
        .concat(timezonesApi.middleware)
        .concat(armenianLevelsApi.middleware)
        .concat(authApi.middleware)
        .concat(verifyEmailApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];