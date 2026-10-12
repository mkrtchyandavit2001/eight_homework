import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../../axios';

export const getChatProfileData = createAsyncThunk(
  'chatprofile/getChatProfileData',
  async (_, thunkAPI) => {
    try {
      const config = {
        method: 'get',
        url: 'chat/get-all-museums-messages',
      };

      const response = await instance(config);
      console.log(response);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.both);
    }
  },
);