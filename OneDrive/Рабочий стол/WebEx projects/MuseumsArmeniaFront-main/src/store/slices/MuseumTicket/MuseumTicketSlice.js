import { createSlice } from '@reduxjs/toolkit';

import { postMuseumTicket } from './MuseumTicketApi';
import { postMuseumOnePages } from '../MuseumPagesSlice/MuseumPagesApi';
import { getPrivateTicket } from '../PrivateTicketSlice/PrivateTicketApi';

const DEFAULT_MAX = 10;

const defaultTickets = () => [
   { id: 1, price: 100, min: 0, max: 10, type: 'standart', count: 0 },
   { id: 1, price: 50, min: 0, max: 10, type: 'discount', count: 0 },
   { id: 1, price: 0, min: 0, max: 10, type: 'free', count: 0 },
   { id: 2, price: 20000, min: 0, max: 5, type: 'subscription', count: 0 },
];

const initialState = {
   modalTicketIsOpen: false,
   ticketType: { kindOf: null, type: null, ticketType: '' },
   tickets: defaultTickets(),
   // Առանձին պահվող 'special' տոմս, քանի որ museum/get-museum/{id} endpoint-ը
   // դեռ չի վերադարձնում այն. բեռնում ենք առանձին tickets?type=special հարցումով
   // և merge ենք անում ցուցադրման ժամանակ (BuyTicketBlock-ում)։
   specialTicket: null,
   dataItems: [],
   ticketLoading: '',
   success: null,
   responseMessages: '',
   paymentsUrl: '',
   statusInfoModal: { status: false, text: '' },
};

const MuseumTicketSlice = createSlice({
   name: 'MuseumTicketSlice',
   initialState,
   reducers: {
      setModalTicketIsOpen(state, { payload }) {
         state.modalTicketIsOpen = payload;
      },
      setTicketType(state, { payload }) {
         state.ticketType = payload;
      },
      setStatusInfoModal(state, { payload }) {
         state.statusInfoModal = payload;
      },
      setDataItems(state, { payload }) {
         const { dovnUp, obj } = payload;
         const isSpecial = obj.type === 'special';

         const ticket = isSpecial
            ? state.specialTicket
            : state.tickets.find((el) => el.type === obj.type);

         if (!ticket) return;

         // max-ը կարող է բացակայել backend-ից եկած տոմսի վրա
         const max = ticket.max ?? DEFAULT_MAX;
         const dataItem = state.dataItems.find((el) => el.type === obj.type);

         if (dovnUp === 'up') {
            if (ticket.count >= max) return;

            ticket.count += 1;
            if (dataItem) {
               dataItem.quantity += 1;
            } else {
               state.dataItems.push({
                  type: ticket.type,
                  id: ticket.id,
                  quantity: 1,
               });
            }
         } else if (dovnUp === 'down') {
            if (ticket.count <= 0) return;

            ticket.count -= 1;
            if (dataItem) {
               dataItem.quantity -= 1;
               if (ticket.count === 0) {
                  state.dataItems = state.dataItems.filter((el) => el.type !== obj.type);
               }
            }
         }
      },
      setResetDataItems(state) {
         state.dataItems = [];
         state.tickets = state.tickets.map((el) => ({ ...el, count: 0 }));
         state.specialTicket = state.specialTicket
            ? { ...state.specialTicket, count: 0 }
            : null;
         state.responseMessages = '';
         state.ticketType = { kindOf: null, type: null, ticketType: '' };
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(postMuseumTicket.pending, (state) => {
            state.ticketLoading = 'loading';
         })
         .addCase(postMuseumTicket.fulfilled, (state, { payload }) => {
            state.ticketLoading = 'fulfilled';
            state.paymentsUrl = payload?.data?.redirect_url ?? '';
            state.success = payload?.success ?? false;
         })
         .addCase(postMuseumTicket.rejected, (state, { payload, error }) => {
            state.ticketLoading = 'rejected';
            state.success = payload?.success ?? false;
            state.responseMessages = payload?.message ?? error?.message ?? '';
         })

         .addCase(postMuseumOnePages.pending, (state) => {
            // Նոր թանգարանի տվյալները սկսում են բեռնվել՝ մաքրում ենք նախորդ
            // թանգարանի 'special' տոմսը, որպեսզի սխալ museum-ի տոմս չառաջանա
            state.specialTicket = null;
         })
         .addCase(postMuseumOnePages.fulfilled, (state, { payload }) => {
            if (payload.data?.tickets) {
               state.tickets = payload.data.tickets.map((el) => ({ ...el, count: 0 }));

               const specialFromMainEndpoint = payload.data.tickets.find(
                  (el) => el.type === 'special',
               );
               if (specialFromMainEndpoint) {
                  state.specialTicket = { ...specialFromMainEndpoint, count: 0 };
               }
            }
         })
         .addCase(postMuseumOnePages.rejected, (state) => {
            state.tickets = defaultTickets();
            state.specialTicket = null;
         })

         // ---- Fallback՝ /tickets?type=special&museum_id={id} endpoint-ից ----
         .addCase(getPrivateTicket.fulfilled, (state, { payload, meta }) => {
            if (meta.arg?.type !== 'special') return;
            if (state.specialTicket) return;

            const museumData = payload?.data?.[0];
            const specialTicket = museumData?.tickets?.find((el) => el.type === 'special');

            if (specialTicket) {
               state.specialTicket = { ...specialTicket, count: 0 };
            }
         });
   },
});

export const MuseumTicketReducer = MuseumTicketSlice.reducer;
export const {
   setModalTicketIsOpen,
   setTicketType,
   setDataItems,
   setResetDataItems,
   setStatusInfoModal,
} = MuseumTicketSlice.actions;