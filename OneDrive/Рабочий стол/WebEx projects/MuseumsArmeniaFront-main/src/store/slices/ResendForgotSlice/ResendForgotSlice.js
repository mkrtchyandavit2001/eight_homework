import { createSlice } from "@reduxjs/toolkit";
import { postResendForgot } from "./ResendForgotApi";

const initialState = {
   data: {
      success: false,
      message: ""
   },
   status: 'idle',
   error: null,
   loading: 'pending'
   };

const resendForgotSlice = createSlice({
    name: 'resendForgot',
    initialState,
    reducers: {
      
    },
 
   
 
    extraReducers: (builder) => {
       builder
          .addCase(postResendForgot.pending, (state) => {
             state.status = 'loading';
          })
          .addCase(postResendForgot.fulfilled, (state, action) => {
            state.data = action.payload
             state.status = 'succes';
             state.loading = 'fulfilled'
          })
          .addCase(postResendForgot.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            state.loading = 'rejected'
          });
    },
 });
 

export const selectResendForgot = (state) => state.resendForgot
export const selectResendForgotLoading = (state) => state.resendForgot.loading

 export const {} = resendForgotSlice.actions

export const resendForgotReducer =  resendForgotSlice.reducer