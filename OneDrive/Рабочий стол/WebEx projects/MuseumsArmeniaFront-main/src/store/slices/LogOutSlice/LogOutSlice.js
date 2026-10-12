import { createSlice } from "@reduxjs/toolkit";
import { getLogOut } from "./LogOutApi";

const initialState = {
   data: {
      succses: ''
   },
   status: 'idle',
   error: null,
   authUser:false,
   loading: true,
   };

const logOutSlice = createSlice({
    name: 'logOut',
    initialState,
    reducers: {
      
    },
 
   
 
    extraReducers: (builder) => {
       builder
          .addCase(getLogOut.pending, (state) => {
             state.status = 'loading';
          })
          .addCase(getLogOut.fulfilled, (state, action) => {
            state.data = action.payload
            state.data.isAuth = true
            state.loading = false
             state.status = 'succes';
          })
          .addCase(getLogOut.rejected, (state, action) => {
             if(action.payload){
                state.data.error = action.payload
                state.data.isAuth = false
               }
               state.loading = false
               state.status = 'failed'; 
          });
    },
 });
 

export const selectlogOutSlice = (state) => state.logOut

export const selectLogOutLoading = (state) => state.logOut.loading


 export const {} = logOutSlice.actions


export const logOutReducer =  logOutSlice.reducer