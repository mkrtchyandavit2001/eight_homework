import { createSlice } from "@reduxjs/toolkit";
import { postNewPassword } from "./NewPasswordeApi";

const initialState = {
   data: {
      message: '',
      success: null,
   },
   status: 'idle',
   error: null,
   loading: true
   };

const newPasswordSlice = createSlice({
    name: 'newPassword',
    initialState,
    reducers: {
      
    },
 
   
 
    extraReducers: (builder) => {
       builder
          .addCase(postNewPassword.pending, (state) => {
             state.status = 'loading';
          })
          .addCase(postNewPassword.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
             state.status = 'succes';
          })
          .addCase(postNewPassword.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            state.loading = false
          });
    },
 });
 

export const selectNewPassword = (state) => state.newPassword
export const selectNewPasswordLoading = (state) => state.newPassword.loading

 export const {} = newPasswordSlice.actions

export const newPasswordReducer =  newPasswordSlice.reducer