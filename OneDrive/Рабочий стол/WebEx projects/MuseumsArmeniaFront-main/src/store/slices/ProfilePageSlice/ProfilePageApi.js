import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../../axios';

export const getNotification = createAsyncThunk(
  'notification/getNotification',
  async (page, thunkAPI) => {
    try {
      const config = {
        method: 'get',
        url: `auth/notification/unread?page=${page}`,
      };

      const response = await instance(config);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.both);
    }
  },
);


// ===================================================


export const postEditUser = createAsyncThunk(
  'editUser/postEditUser',

  async (body, thunkAPI) => {
      try {

        const config = {
          method: "post",
          url: "user/edit",
          data: body,
        };
  
        const response = await instance(config);
        return response?.data
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
)


// ===========================================================================

export const postChangeUserPass = createAsyncThunk(
  'changeUserPass/postChangeUserPass',

  async (body, thunkAPI) => {
      try {

        const config = {
          method: "post",
          url: "user/editPassword",
          data: body,
        };
  
        const response = await instance(config);
        return response?.data
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
)



// ============================================================================


export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async (page, thunkAPI) => {
    try {
      const config = {
        method: 'get',
        url: `user/order-history?page=${page}`,
      };

      const response = await instance(config);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.both);
    }
  },
);




// =======================================================



export const getQr = createAsyncThunk(
  'qr/getQr',
  async (_, thunkAPI) => {
    try {
      const config = {
        method: 'get',
        url: 'user/list-active-qr',
      };

      const response = await instance(config);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.both);
    }
  },
);


// ======================================



export const postQrItem = createAsyncThunk(
  'qrItem/postQrItem',

  async (id, thunkAPI) => {
      try {

        const config = {
          method: "get",
          url: `user/send-qr-to-mail/${id}`,
        };
  
        const response = await instance(config);
        return response?.data
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
)