import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../../axios';

export const getAllNewses = createAsyncThunk('newses/getAllNewses', async (_, thunkAPI) => {
  try {
    const config = {
      method: 'get',
      url: 'news/get-news',
    };

    const response = await instance(config);
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.both);
  }
});

export const getSearchesNewses = createAsyncThunk(
  'newses/getSearchesNewses',
  async (searchText, thunkAPI) => {
    try {
      const config = {
        method: 'get',
        url: `news/get-news?title=${searchText}`,
      };

      const response = await instance(config);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.both);
    }
  },
);

export const getPaginatePages = createAsyncThunk(
  'newses/getPaginatePages',
  async (pageNum, thunkAPI) => {
    try {
      const config = {
        method: 'get',
        url: `news/get-news?page=${pageNum}`,
      };

      const response = await instance(config);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.both);
    }
  },
);

export const getSingleNews = createAsyncThunk('newses/getSingleNews', async (id, thunkAPI) => {
  try {
    const config = {
      method: 'get',
      url: `news/get-news/${id}`,
    };

    const response = await instance(config);
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.both);
  }
});
