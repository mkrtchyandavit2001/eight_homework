import { createSlice } from "@reduxjs/toolkit";
import { getSouvinersProd } from "./SouvinersProdApi";

const initialState = {
   data: [],
   status: 'idle',
   loading: 'pending',
   };

const souvinersProdSlice = createSlice({
    name: 'souvinersProd',
    initialState,
    reducers: {
      
    },
 
   
 
    extraReducers: (builder) => {
       builder
          .addCase(getSouvinersProd.pending, (state) => {
             state.status = 'loading';
          })
          .addCase(getSouvinersProd.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = 'fulfilled'
             state.status = 'succes';
          })
          .addCase(getSouvinersProd.rejected, (state, action) => {
             if(action.payload){
                state.data.error = action.payload
               }
               state.loading = 'rejected'
               state.status = 'failed'; 
          });
    },
 });
 

export const selectSouvinersProd = (state) => state.souvinersProd

export const selectSouvinersProdLoading = (state) => state.souvinersProd.loading


 export const {} = souvinersProdSlice.actions


export const souvinersProdReducer =  souvinersProdSlice.reducer