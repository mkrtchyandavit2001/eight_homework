import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";

export const postLogin = createAsyncThunk(
    'login/postLogin',

    async (body, thunkAPI) => {
      const leng = localStorage.getItem('lang')
        try {
          const signInData = {
            email: body.email,
            password: body.password,
          };

          const config = {
            method: "post",
            url: "auth/login",
            data: signInData,
          };
    
          const response = await instance(config);
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("isAuth", true);
          return response?.data
        } catch (error) {
          return thunkAPI.rejectWithValue(error.response.data);
        }
      }
)