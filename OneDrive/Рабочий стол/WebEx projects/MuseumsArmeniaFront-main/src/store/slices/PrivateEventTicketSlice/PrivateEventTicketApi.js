import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";

export const getEvents = createAsyncThunk(
  'events/getEvents',
  async (body, thunkAPI) => {
    const startDate = body.start_date ? `&start_date=${body.start_date}` : ''
    const endDate = body.end_date ? `&end_date=${body.end_date}` : ''
    const museumId = body.museumId ? `&museum_id=${body.museumId}` : ''

      try {
        const config = {
          method: "get",
          url: `tickets/museum/events?${museumId}${startDate}${endDate}`,
        };
        
        const response = await instance(config);
        console.log(response.data);
        return response?.data.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error.both);
      }
    }
)