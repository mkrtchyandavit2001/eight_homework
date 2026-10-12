import { createSlice } from '@reduxjs/toolkit';


const initialState = {
   messagesType: null,
   educationProgramType: null
};

const MessagesBotSlice = createSlice({
   name: 'MessagesBot',
   initialState,
   reducers: {
      setMessagesType(state, { payload }) {
         state.messagesType = payload;
      },
      setEducationProgramType(state, { payload }) {
         state.educationProgramType = payload;
      },
     
   },
   
});

export const MessagesBot = MessagesBotSlice.reducer;
export const { setMessagesType, setEducationProgramType } = MessagesBotSlice.actions;