import { createSlice } from '@reduxjs/toolkit';
import { postLogin } from '../LoginSlice/LoginApi';
import { getCurrentUser } from './AuthApi';
// import { editUser } from '../Profile/ProfileApi';

const initialState = {
  authUser: {},
  isAuth: false,
  temp: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.authUser = action.payload;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
      
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(postLogin.fulfilled, (state, action) => {
        state.authUser = action.payload.authUser; 
        state.isAuth = true;
      })
      
    .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.authUser = action.payload
        state.isAuth = true
    })
    .addCase(getCurrentUser.rejected, (state, action) => {
      state.temp = true
  })
  },
});

export const { setAuth, setIsAuth } = authSlice.actions;

// export const {getAuthUser} = loginSlice.actions
export const getAuthUser = (state) => state.auth.authUser;
export const getIsAuth = (state) => state.auth.isAuth;
export const getIsTemp = (state) => state.auth.temp

export const authReduser = authSlice.reducer;
