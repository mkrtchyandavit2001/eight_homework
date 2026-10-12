import { createSlice } from "@reduxjs/toolkit";
import { getBanner } from "./BanerApi";

const initialState = {
   data: [],
   status: 'idle',
   loading: true,
   };

const BannerSlice = createSlice({
    name: 'banner',
    initialState,
    reducers: {
      
    },
 
   
 
    extraReducers: (builder) => {
       builder
          .addCase(getBanner.pending, (state) => {
             state.status = 'loading';
          })
          .addCase(getBanner.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = false
             state.status = 'succes';
          })
          .addCase(getBanner.rejected, (state, action) => {
             if(action.payload){
                state.data.error = action.payload
               }
               state.loading = false
               state.status = 'failed'; 
          });
    },
 });
 

export const selectBanner = (state) => state.banner

export const selectBannerLoading = (state) => state.banner.loading


 export const {} = BannerSlice.actions


export const bannerReducer =  BannerSlice.reducer