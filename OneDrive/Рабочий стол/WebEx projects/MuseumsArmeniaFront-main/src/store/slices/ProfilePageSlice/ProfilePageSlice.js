import { createSlice } from '@reduxjs/toolkit';
import { getNotification, getOrders, getQr, postChangeUserPass, postEditUser, postQrItem } from './ProfilePageApi';

const initialState = {
  notification: [],
  editUser: {},
  editPassword: {},
  orderHistory: {},
  qrData: {},
  qrResult: {},
  activeSideBar : false,
  loading: 'pending'
};

export const profilePageSlice = createSlice({
  name: 'profilePage',
  initialState,
  reducers: {
    setSideBar(state, { payload }) {
      state.activeSideBar = payload;
   },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getNotification.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.notification = action.payload
        console.log(state.notification,'go');
      })
      .addCase(getNotification.pending, (state, action) => {
        console.log('pending');
      })

      .addCase(getNotification.rejected, (state, action) => {
        state.loading = 'rejected'
      })

      // =============================================

      .addCase(postEditUser.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.editUser = action.payload
      })
      .addCase(postEditUser.pending, (state, action) => {
        console.log('pending');
      })

      .addCase(postEditUser.rejected, (state, action) => {
        state.loading = 'rejected'
      })



      // ====================================================


      .addCase(postChangeUserPass.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.editPassword = action.payload
      })
      .addCase(postChangeUserPass.pending, (state, action) => {
        console.log('pending');
      })

      .addCase(postChangeUserPass.rejected, (state, action) => {
        state.loading = 'rejected'
        state.editPassword = action.payload
      })


      // ========================================================

      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.orderHistory = action.payload
      })
      .addCase(getOrders.pending, (state, action) => {
        console.log('pending');
      })

      .addCase(getOrders.rejected, (state, action) => {
        state.loading = 'rejected'
      })



      // ===================================================

      .addCase(getQr.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.qrData = action.payload
      })
      .addCase(getQr.pending, (state, action) => {
        console.log('pending');
      })

      .addCase(getQr.rejected, (state, action) => {
        state.loading = 'rejected'

      })

      // ===========================================


      .addCase(postQrItem.fulfilled, (state, action) => {
        state.loading = 'fulfilled'
        state.qrResult = action.payload
      })
      .addCase(postQrItem.pending, (state, action) => {
        console.log('pending');
      })

      .addCase(postQrItem.rejected, (state, action) => {
        state.loading = 'rejected'

      });
  },
});



export const getChatProfileDates = (state) => state.profilePage;

export const profilePageLoading = (state) => state.profilePage.loading
export const selectNotification = (state) => state.profilePage.notification
export const selectOrders = (state) => state.profilePage.orderHistory
export const selectQrData = (state) => state.profilePage.qrData
export const selectQrResult = (state) => state.profilePage.qrResult
export const selectSideBar = (state) => state.profilePage.activeSideBar
export const selectEditUser = (state) => state.profilePage.editUser
export const selectEditUserPass = (state) => state.profilePage.editPassword

export const {
  setSideBar
} = profilePageSlice.actions;

export const profilePageReducer = profilePageSlice.reducer;
