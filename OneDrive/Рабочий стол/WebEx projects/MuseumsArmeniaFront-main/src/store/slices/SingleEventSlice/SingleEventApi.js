import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";

export const getSingleEvent = createAsyncThunk(
  'singleEvent/getSingleEvent',
  async (id, thunkAPI) => {

      try {
        const config = {
          method: "get",
          url: `events/single-event/${id}`,
        };
        
        const response = await instance(config); 
        return response?.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
)