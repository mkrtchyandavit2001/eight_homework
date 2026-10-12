import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import instance from '../../../axios';

export const postRegister = createAsyncThunk(
   'register/postregister',

   async (body, thunkAPI) => {
      try {
         console.log(body);
         const config = {
            method: 'post',
            url: 'auth/signup',
            data: body,
         };

         const response = await instance(config);
         sessionStorage.setItem('token', response.data.access_token);
         console.log(response.data, 'fff');
         return response.data;
      } catch (error) {
         return thunkAPI.rejectWithValue(error.response.data.errors);
      }
   },
);
