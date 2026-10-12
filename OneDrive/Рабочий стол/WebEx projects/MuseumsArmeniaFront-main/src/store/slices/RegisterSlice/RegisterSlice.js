import { createSlice } from "@reduxjs/toolkit";
import { postRegister } from "./RegisterApi";

const initialState = {
   data: {
      success: false,
      message: null,
   },
   status: 'idle',
   error: null,
   loading: true,
   };

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
      
    },
 
   
 
    extraReducers: (builder) => {
       builder
          .addCase(postRegister.pending, (state) => {
            state.status = 'loading';
            state.loading = 'pending'
          })
          .addCase(postRegister.fulfilled, (state, action) => {
               state.data = action.payload
               state.loading = 'fulfilled'
             state.status = 'succes';
          })
          .addCase(postRegister.rejected, (state, action) => {
               state.data.message = action.payload.email[0]
               state.data.success = false
               state.error = true
               state.loading = 'rejected'
               state.status = 'failed';
          });
    },
 });
 

export const selectRegister = (state) => state.register
export const selectRegisterData = (state) => state.register.data
export const selectRegisterLoading = (state) => state.register.loading
export const selectRegisterError = (state) => state.register.error

 export const {} = registerSlice.actions

export const registerReducer =  registerSlice.reducer