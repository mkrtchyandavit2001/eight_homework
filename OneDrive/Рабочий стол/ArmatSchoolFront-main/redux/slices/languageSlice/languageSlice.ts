import type { RootState } from "@/redux/store";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LocaleCode = "hy" | "en";

export interface Language {
  id: number;
  code: LocaleCode;
  name: string;
  native_name: string;
}

interface LanguageState {
  locale: LocaleCode;
  languages: Language[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Fallback, որպեսզի backend-ի անհասանելիության դեպքում կոճակները չվերանան
const FALLBACK_LANGUAGES: Language[] = [
  { id: 1, code: "hy", name: "Armenian", native_name: "Հայերեն" },
  { id: 2, code: "en", name: "English", native_name: "English" },
];

const initialState: LanguageState = {
  locale: "hy",
  languages: FALLBACK_LANGUAGES,
  status: "idle",
  error: null,
};

export const fetchLanguages = createAsyncThunk<
  Language[],
  void,
  { rejectValue: string }
>("language/fetchLanguages", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/languages`);
    if (!res.ok) return rejectWithValue(`HTTP ${res.status}`);
    const json = await res.json();
    return json.data as Language[];
  } catch {
    return rejectWithValue("Network error");
  }
});

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<LocaleCode>) {
      state.locale = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLanguages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.languages = action.payload;
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Unknown error";
        // languages-ը մնում է fallback-ով
      });
  },
});

export const { setLocale } = languageSlice.actions;
export default languageSlice.reducer;

export const selectLocale = (s: RootState) => s.language.locale;
export const selectLanguages = (s: RootState) => s.language.languages;