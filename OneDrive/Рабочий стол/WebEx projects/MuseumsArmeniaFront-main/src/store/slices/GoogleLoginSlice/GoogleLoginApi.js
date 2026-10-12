import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";

export const postGoogleLogin = createAsyncThunk(
    'googleLogin/postGoogleLogin',

    async (body, thunkAPI) => {
      const leng = localStorage.getItem('lang')
        try {
         
          const config = {
            method: "post",
            url: "auth/signup-google",
            data: body,
          };
    
          const response = await instance(config);
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("isAuth", true);
          if(response.data.success){
            window.location.pathname = `/${leng}/`
          }
          return response?.data
        } catch (error) {
          return thunkAPI.rejectWithValue(error.response.data);
        }
      }
)