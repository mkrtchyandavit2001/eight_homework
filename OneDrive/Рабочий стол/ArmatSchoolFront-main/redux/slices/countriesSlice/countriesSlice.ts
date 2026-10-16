import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CountriesState {
  selectedCountryCode: string | null;
}

const initialState: CountriesState = {
  selectedCountryCode: null,
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setSelectedCountryCode: (state, action: PayloadAction<string | null>) => {
      state.selectedCountryCode = action.payload;
    },
  },
});

export const { setSelectedCountryCode } = countriesSlice.actions;
export default countriesSlice.reducer;