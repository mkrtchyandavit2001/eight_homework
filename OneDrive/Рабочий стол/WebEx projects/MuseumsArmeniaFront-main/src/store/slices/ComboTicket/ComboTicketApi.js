import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../../axios';

export const getComboTickets = createAsyncThunk(
  'shop/getComboTickets',
   async (id, thunkAPI) => {
  try {
    const config = {
      method: 'get',
      url: `tickets?type=united`,
    };
    const response = await instance(config);
    console.log(response);
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.both);
  }
});
