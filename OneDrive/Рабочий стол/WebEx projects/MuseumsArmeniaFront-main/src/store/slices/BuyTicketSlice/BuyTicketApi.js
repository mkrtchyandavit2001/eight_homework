import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";

export const postBuyTicket = createAsyncThunk(
    'buyTicket/postBuyTicket',
    async (body, thunkAPI) => {
      try {
        const config = {
          method: 'post',
          url: `purchase/store`,
          data: body,
        };
        const response = await instance(config);
        console.log(response);
        return response?.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    },
  );