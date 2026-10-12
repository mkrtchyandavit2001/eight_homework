import { createSlice } from "@reduxjs/toolkit";
import { postCheckForgotToken } from "./CheckForgotTokenApi";

const initialState = {
   data: {
      message: '',
      success: null
   },
   status: 'idle',
   error: null,
   authUser:false,
   loading: 'pending',
   };

const checkForgotTokenSlice = createSlice({
    name: 'checkForgotToken',
    initialState,
    reducers: {
      
    },
 
   
 
    extraReducers: (builder) => {
       builder
          .addCase(postCheckForgotToken.pending, (state) => {
             state.status = 'loading';
          })
          .addCase(postCheckForgotToken.fulfilled, (state, action) => {
            state.data = action.payload
            state.data.isAuth = true
            state.loading = 'fulfilled'
             state.status = 'succes';
          })
          .addCase(postCheckForgotToken.rejected, (state, action) => {
             if(action.payload){
                state.data.error = action.payload
                state.data.isAuth = false
                
               }
               state.loading = 'rejected'
               state.status = 'failed'; 
          });
    },
 });
 

export const selectCheckForgotToken = (state) => state.checkForgotToken

export const selectCheckForgotTokenLoading = (state) => state.checkForgotToken.loading


 export const {} = checkForgotTokenSlice.actions


export const checkForgotTokenReducer =  checkForgotTokenSlice.reducer