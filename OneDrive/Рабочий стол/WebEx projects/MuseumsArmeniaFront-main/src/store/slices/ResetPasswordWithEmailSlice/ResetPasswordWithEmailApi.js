import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";

export const postResetPasswordWithEmail = createAsyncThunk(
    'resetPasswordWithEmail/postResetPasswordWithEmail',

    async (body, thunkAPI) => {
        try {

          const config = {
            method: "post",
            url: "forgot-password",
            data: body,
          };
    
          const response = await instance(config);
          return response?.data
        } catch (error) {
          return thunkAPI.rejectWithValue(error.response.data);
        }
      }
)