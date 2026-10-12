import { createSlice } from "@reduxjs/toolkit";
import { getEventsHome, getEventsPage } from "./EventsPageApi";

const initialState = {
   data: [],
   status: 'idle',
   loading: 'pending',
   homeList: []
   };

const eventPageSlice = createSlice({
    name: 'eventPage',
    initialState,
    reducers: {
      
    },
 
   
 
    extraReducers: (builder) => {
       builder
          .addCase(getEventsPage.pending, (state) => {
             state.status = 'loading';
          })
          .addCase(getEventsPage.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = 'fulfilled'
             state.status = 'succes';
          })
          .addCase(getEventsPage.rejected, (state, action) => {
             if(action.payload){
                state.data.error = action.payload
               }
               state.loading = 'rejected'
               state.status = 'failed';
          })
          .addCase(getEventsHome.fulfilled, (state, action) => {
            state.homeList = action.payload
          })
    },
 });
 

export const selectEventPage = (state) => state.eventPage
export const selectHome_list= (state) => state.eventPage.homeList

export const selectEventPageLoading = (state) => state.eventPage.loading


 export const {} = eventPageSlice.actions


export const eventPageReducer =  eventPageSlice.reducer