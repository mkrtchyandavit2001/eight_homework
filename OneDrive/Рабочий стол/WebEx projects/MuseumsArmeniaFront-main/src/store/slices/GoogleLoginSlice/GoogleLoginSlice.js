import { createSlice } from "@reduxjs/toolkit";
import { postGoogleLogin } from "./GoogleLoginApi";

const initialState = {
   data: {
      authUser: {},
      access_token: '',
      isAuth: null,
      error: null
   },
   status: 'idle',
   error: null,
   authUser:false,
   loading: true,
   };

const googleLoginSlice = createSlice({
    name: 'googleLogin',
    initialState,
    reducers: {
      
    },
 
   
 
    extraReducers: (builder) => {
       builder
          .addCase(postGoogleLogin.pending, (state) => {
             state.status = 'loading';
          })
          .addCase(postGoogleLogin.fulfilled, (state, action) => {
            state.data = action.payload
            state.data.isAuth = true
            state.loading = false
             state.status = 'succes';
          })
          .addCase(postGoogleLogin.rejected, (state, action) => {
             if(action.payload){
                state.data.error = action.payload
                state.data.isAuth = false
                
               }
               state.loading = false
               state.status = 'failed'; 
          });
    },
 });
 

export const selectgoogleLogin = (state) => state.googleLogin

export const selectgoogleLoginLoading = (state) => state.googleLogin.loading


 export const {} = googleLoginSlice.actions


export const googleLoginReducer =  googleLoginSlice.reducer