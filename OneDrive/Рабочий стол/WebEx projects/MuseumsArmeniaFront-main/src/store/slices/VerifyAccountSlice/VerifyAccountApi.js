import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";

export const postVerifyAccount = createAsyncThunk(
    'verifyAccount/postVerifyAccount',

    async (body, thunkAPI) => {
      const leng = localStorage.getItem('lang')
        try {
          console.log(body,'gggg');
          const config = {
            method: "post",
            url: "auth/check-verify-token",
            data: body,
          };
          
          const response = await instance(config);
          console.log(response.data, 5564312)
          if(response?.data?.success){
           window.location.pathname = `/${leng}/login`
          }
          return response?.data;
        } catch (error) {
          return thunkAPI.rejectWithValue(error.response.data.error.both);
        }
      }
)