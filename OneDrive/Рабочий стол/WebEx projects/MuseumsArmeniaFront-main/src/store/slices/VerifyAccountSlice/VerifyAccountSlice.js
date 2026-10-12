import { createSlice } from "@reduxjs/toolkit";
import { postVerifyAccount } from "./VerifyAccountApi";

const initialState = {
   data: {
      success: false,
      message: ""
   },
   status: 'idle',
   error: null,
   };

const verifyAccountSlice = createSlice({
    name: 'verifyAccount',
    initialState,
    reducers: {
      
    },
 
   
 
    extraReducers: (builder) => {
       builder
          .addCase(postVerifyAccount.pending, (state) => {
             state.status = 'loading';
          })
          .addCase(postVerifyAccount.fulfilled, (state, action) => {
            state.data = action.payload
            console.log(action.payload,'ffffwdsx');
             state.status = 'succes';
          })
          .addCase(postVerifyAccount.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            // state.data = action.payload
            // console.log(state.data, 'eeeeeee');
          });
    },
 });
 

export const selectVerifyAccount = (state) => state.verifyAccount
export const getData = (state) => state.verifyAccount.data

 export const {} = verifyAccountSlice.actions

export const verifyAccountReducer =  verifyAccountSlice.reducer