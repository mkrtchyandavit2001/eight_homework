import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";

export const getSouvinersProd = createAsyncThunk(
  'souvinersProd/getSouvinersProd',
  async (_, thunkAPI) => {

      try {
        const config = {
          method: "get",
          url: 'product/list',
        };
        
        const response = await instance(config); 
        return response?.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error.both);
      }
    }
)