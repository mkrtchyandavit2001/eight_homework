import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";

export const postNewPassword = createAsyncThunk(
    'newPassword/postNewPassword',

    async (body, thunkAPI) => {
        try {
          const leng = localStorage.getItem('lang')
    
          const config = {
            method: "post",
            url: "/send-new-password",
            data: body,
          };
    
          const response = await instance(config);

          if(response.data.success === true){
            window.location.pathname = `/${leng}/login`
          }
          
          return response?.data;
        } catch (error) {
          return thunkAPI.rejectWithValue(error.response.data.error.both);
        }
      }
)