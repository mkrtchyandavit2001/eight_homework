import { createSlice } from '@reduxjs/toolkit';
import { getChatProfileData } from './ChatProfileApi';

const initialState = {
  chatProfileData: [],
  loading: 'pending'
};

export const ChatProfileSlice = createSlice({
  name: 'chatprofile',
  initialState,
  reducers: {
    // setType: (state, action) => {
    //   state.types = action.payload;
    // },

    setNewMessage: (state, {payload}) => {
      state.chatProfileData.map(el => {
        if(payload.chatId === el.chat_id){
          el.messages.push(payload)
        }
      })
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getChatProfileData.fulfilled, (state, action) => {
        state.chatProfileData = action.payload.data
        state.loading = 'fulfilled'
      })
      .addCase(getChatProfileData.pending, (state, action) => {
        console.log('pending');
      })

      .addCase(getChatProfileData.rejected, (state, action) => {
        state.loading = 'rejected'
      });
  },
});

export const {
  //   setErrorMessage,
  setNewMessage
} = ChatProfileSlice.actions;


export const getChatProfileDates = (state) => state.chatprofile.chatProfileData;

export const getChatProfileLoading = (state) => state.chatprofile.loading

export const ChatProfileReducer = ChatProfileSlice.reducer;
