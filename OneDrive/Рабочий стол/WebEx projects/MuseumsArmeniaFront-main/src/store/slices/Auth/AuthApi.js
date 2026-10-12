import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, thunkAPI) => {
    const leng = localStorage.getItem('lang')
      try {
        const config = {
          method: "get",
          url: 'auth/me',
        };
        
        const response = await instance(config);
       
        return response?.data;
      } catch (error) {
        
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
)