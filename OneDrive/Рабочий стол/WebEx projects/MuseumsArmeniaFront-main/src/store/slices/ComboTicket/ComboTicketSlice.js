import { createSlice } from '@reduxjs/toolkit';
import { getComboTickets } from './ComboTicketApi';

const initialState = {
  comboTickets: [],
  loading: true,
  // clickedMuseumIds: []
  comboTicketTypeData: [],
};

export const ComboTicketsSlice = createSlice({
  name: 'combotickets',
  initialState,
  reducers: {
    setClickComboTicketData(state, { payload }) {
      state.comboTicketTypeData = [payload];
      console.log("comboTicketTypeData",state.comboTicketTypeData);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getComboTickets.pending, (state, action) => {
        console.log('pending');
      })
      .addCase(getComboTickets.fulfilled, (state, action) => {
        state.comboTickets = action.payload;
        state.loading = false;
      })
      .addCase(getComboTickets.rejected, (state, action) => {
        console.log('chdarav');
      });
  },
});

export const getAllComboTickets = (state) => state.combotickets.comboTickets;
export const getLoadingComboTickets = (state) => state.combotickets.loading;
export const getComboTicketsData = (state) => state.combotickets.comboTicketTypeData;


export const { setClickComboTicketData } = ComboTicketsSlice.actions;

export const ComboTicketsReducer = ComboTicketsSlice.reducer;
