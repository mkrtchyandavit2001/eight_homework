// redux/slices/verifyEmailSlice/verifyEmailSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VerifyEmailState {
  isVerified: boolean;
  email: string | null;
}

const initialState: VerifyEmailState = {
  isVerified: false,
  email: null,
};

export const verifyEmailSlice = createSlice({
  name: "verifyEmail",
  initialState,
  reducers: {
    setEmailVerified: (state, action: PayloadAction<boolean>) => {
      state.isVerified = action.payload;
    },
    setVerificationEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    resetVerification: (state) => {
      state.isVerified = false;
      state.email = null;
    },
  },
});

// ՈՒՂՂՈՒՄ՝ վերցնում ենք .actions-ից
export const {
  setEmailVerified,
  setVerificationEmail,
  resetVerification,
} = verifyEmailSlice.actions;

export default verifyEmailSlice.reducer;