import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";

export const postCheckForgotToken = createAsyncThunk(
    'checkForgotToken/postCheckForgotToken',

    async (body, thunkAPI) => {
        const leng = localStorage.getItem('lang')
        try {
          const config = {
            method: "post",
            url: "check-forgot-token",
            data: body,
          };
    
          const response = await instance(config);
          console.log(response.data);
         
          return response?.data
        } catch (error) {
          return thunkAPI.rejectWithValue(error.response.data.error);
        }
      }
)