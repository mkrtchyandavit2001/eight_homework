import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import instance from '../../../axios';

export const postContactUsData = createAsyncThunk(
  'contactus/postContactUsData',
  async (body, thunkAPI) => {
    try {
      const config = {
        method: 'post',
        url: `chat/add-admin-message`,
        data: body,
      };
      const response = await instance(config);
      console.log(response);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.both);
    }
  },
);
