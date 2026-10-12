import { createSlice } from "@reduxjs/toolkit";
import { getSingleEvent } from "./SingleEventApi";

const initialState = {
   data: {},
   status: 'idle',
   loading: 'pending',
   isActiveModal: false
   };

const singleEventSlice = createSlice({
    name: 'singleEvent',
    initialState,
    reducers: {
       setIsActiveModal: (state, action) => {
          state.isActiveModal = action.payload
       }
    },
 
   
 
    extraReducers: (builder) => {
       builder
          .addCase(getSingleEvent.pending, (state) => {
             state.status = 'loading';
          })
          .addCase(getSingleEvent.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = 'fulfilled'
             state.status = 'succes';
          })
          .addCase(getSingleEvent.rejected, (state, action) => {
             if(action.payload){
                state.data.error = action.payload
               }
               state.loading = 'rejected'
               state.status = 'failed';
          })
          
    },
 });
 

export const selectSingleEvent = (state) => state.singleEvent

export const selectSingleEventLoading = (state) => state.singleEvent.loading

export const selectSingleEventIsActiveModal = (state) => state.singleEvent.isActiveModal

 export const {setIsActiveModal} = singleEventSlice.actions


export const singleEventReducer =  singleEventSlice.reducer