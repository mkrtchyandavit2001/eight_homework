import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";

export const postRepeatVerifyCode = createAsyncThunk(
    'repeatVerifyCode/postRepeatVerifyCode',

    async (body, thunkAPI) => {
      const leng = localStorage.getItem('lang')
        try {
          console.log(body,'verify');
          const config = {
            method: "post",
            url: "auth/resend-verify",
            data: body,
          };
          
          const response = await instance(config);
          return response?.data;
        } catch (error) {
          return thunkAPI.rejectWithValue(error.response.data.error.both);
        }
      }
)