import { createSlice } from "@reduxjs/toolkit";
import { postResetPasswordWithEmail } from "./ResetPasswordWithEmailApi";

const initialState = {
   data: {
      message: '',
      success: false
   },
   status: 'idle',
   error: null,
   authUser:false,
   loading: true,
   };

const resetPasswordWithEmail = createSlice({
    name: 'resetWithEmail',
    initialState,
    reducers: {
      
    },
 
   
 
    extraReducers: (builder) => {
       builder
          .addCase(postResetPasswordWithEmail.pending, (state) => {
             state.status = 'loading';
            state.loading = 'pending'
          })
          .addCase(postResetPasswordWithEmail.fulfilled, (state, action) => {
            state.data = action.payload
            state.data.isAuth = true
            state.loading = 'fulfilled'
             state.status = 'succes';
          })
          .addCase(postResetPasswordWithEmail.rejected, (state, action) => {
             if(action.payload){
                state.data.error = action.payload
                state.data.isAuth = false
               state.loading = 'rejected'
               }
               state.loading = false
               state.status = 'failed'; 
          });
    },
 });
 

export const selectResetPasswordWithEmail = (state) => state.resetWithEmail

export const selectResetPasswordWithEmailLoading = (state) => state.resetWithEmail.loading


 export const {} = resetPasswordWithEmail.actions


export const ResetPasswordWithEmailReducer =  resetPasswordWithEmail.reducer