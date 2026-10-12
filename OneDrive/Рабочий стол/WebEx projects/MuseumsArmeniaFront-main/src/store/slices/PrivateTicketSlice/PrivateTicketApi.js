import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";

export const getPrivateTicket = createAsyncThunk(
  'privateTicket/getPrivateTicket',
  async (body, thunkAPI) => {

        const start_date = body.startDate ? `&start_date=${body.startDate}` : ''
        const end_date = body.endDate ? `&end_date=${body.endDate}` : ''

        const museumId = body.museumId ? `&museum_id=${body.museumId}` : '' 

      try {
        const config = {
          method: "get",
          url: `tickets?type=${body.type}${start_date}${end_date}${museumId}`,
        };
        
        const response = await instance(config); 
        return response?.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error.both);
      }
    }
)



export const getUnitedCount = createAsyncThunk(
  'unitedCount/getUnitedCount',
  async (body, thunkAPI) => {

      try {
        const config = {
          method: "get",
          url: 'tickets/united',
        };
        
        const response = await instance(config); 
        return response?.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.error.both);
      }
    }
)