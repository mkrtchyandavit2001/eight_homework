import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";

export const postResendForgot = createAsyncThunk(
    'resendForgot/postResendForgot',

    async (body, thunkAPI) => {
        try {
          console.log(body,'verify');
          const config = {
            method: "post",
            url: "resend-forgot",
            data: body,
          };
          
          const response = await instance(config);
          return response?.data;
        } catch (error) {
          return thunkAPI.rejectWithValue(error.response.data.error.both);
        }
      }
)