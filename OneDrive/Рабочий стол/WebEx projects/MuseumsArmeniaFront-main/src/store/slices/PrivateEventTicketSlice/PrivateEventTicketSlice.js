import { createSlice } from '@reduxjs/toolkit';
import { getEvents } from './PrivateEventTicketApi';
// import { editUser } from '../Profile/ProfileApi';

const initialState = {
 data: []
};

export const eventsTicketSlice = createSlice({
  name: 'eventsTicket',
  initialState,
  reducers: {
  },
  
  extraReducers: (builder) => {
    builder
     .addCase(getEvents.fulfilled, (state, action) => {
          state.data = action.payload
      })   
  },
});


export const getEventsTicket = (state) => state.eventsTicket;


export const eventsTicketReducer = eventsTicketSlice.reducer;




