import { createSlice } from "@reduxjs/toolkit";
import { postBuyTicket } from "./BuyTicketApi";

const initialState = {
   data: {},
   loading: 'pending',
   obj: {}
   };

const buyTicketSlice = createSlice({
    name: 'buyTicket',
    initialState,
    reducers: {
        setObj(state, { payload }) {
            state.obj = payload;
         },
    },
 
   
 
    extraReducers: (builder) => {
       builder
          .addCase(postBuyTicket.pending, (state) => {
          })
          .addCase(postBuyTicket.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = "fulfilled"
          })
          .addCase(postBuyTicket.rejected, (state, action) => {
             if(action.payload){
                state.data = action.payload
               }
               state.loading = "rejected"
          });
    },
 });
 

export const selectBuyTicket = (state) => state.buyTicket

export const selectBuyTicketLoading = (state) => state.buyTicket.loading


 export const {setObj} = buyTicketSlice.actions


export const buyTicketReducer =  buyTicketSlice.reducer