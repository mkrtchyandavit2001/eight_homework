import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../../axios';

export const postUserMessages = createAsyncThunk(
   'NewMessages/postAuthUserMessages',

   async (body, thunkAPI) => {
      try {
         const config = {
            method: 'post',
            url: 'chat/add-message',
            data: body,
         };

         const { data } = await instance(config);

         return data;
      } catch (error) {
         console.log(error, 'error');
         return thunkAPI.rejectWithValue(error.response.data.error.both);
      }
   },
);

export const getAuthUserAllMessages = createAsyncThunk(
   'NewMessages/getAuthUserMessages',

   async (body, thunkAPI) => {
      try {
         const response = await instance(`chat/get-museum-message/${body}`);
         return response?.data;
      } catch (error) {
         console.log(error, 'error');
         return thunkAPI.rejectWithValue(error.response.data.error.both);
      }
   },
);

export const deleteMuseumMessages = createAsyncThunk(
   'NewMessages/deleteMuseumMessages',

   async (body, thunkAPI) => {
      try {
         const response = await instance(`chat/delete-chat/${body}`);

         //  return response?.data;
      } catch (error) {
         console.log(error, 'error');
         return thunkAPI.rejectWithValue(error.response.data.error.both);
      }
   },
);

export const postMessageProfile = createAsyncThunk(
   'messageProfile/postMessageProfile',

   async (body, thunkAPI) => {
      try {
         const config = {
            method: 'post',
            url: 'chat/add-profile-message',
            data: body,
         };

         const { data } = await instance(config);

         return data.message;
      } catch (error) {
         console.log(error, 'error');
         return thunkAPI.rejectWithValue(error.response.data);
      }
   },
);
