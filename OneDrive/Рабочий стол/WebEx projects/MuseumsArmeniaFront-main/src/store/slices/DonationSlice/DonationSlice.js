import { createSlice } from "@reduxjs/toolkit";
import { getDonationList, getDonationPriceList, sendDonationPerson } from "./DonationApi";

const initialState = {
    priceList: [],
    selectedAmount: null,
    loading: 'loading',
    error: null,
    isOpenModal: false,
    redirectUrl: '',
    donationList: []
};

const donationSlice = createSlice({
    name: 'donation',
    initialState,
    reducers: {
        openDonationModal: (state) => {
            state.isOpenModal = true
        },

        closeDonationModal: (state) => {
            state.isOpenModal = false
        },

        selectAmount: (state, { payload }) => {
            state.selectedAmount = payload
        },

    },



    extraReducers: (builder) => {
        builder
            .addCase(getDonationPriceList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getDonationPriceList.fulfilled, (state, action) => {
                state.priceList = action.payload
                state.loading = 'fulfilled'
                state.status = 'succes';
            })
            .addCase(getDonationPriceList.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload
                }
                state.loading = 'rejected'
                state.status = 'failed';
            })
            // ========================

            .addCase(sendDonationPerson.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(sendDonationPerson.fulfilled, (state, action) => {
                state.redirectUrl = action.payload
                state.loading = 'fulfilled'
                state.status = 'succes';
            })
            .addCase(sendDonationPerson.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload
                }
                state.loading = 'rejected'
                state.status = 'failed';
            })
            // ========================

            .addCase(getDonationList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getDonationList.fulfilled, (state, action) => {
                state.donationList = action.payload
                state.loading = 'fulfilled'
                state.status = 'succes';
            })
            .addCase(getDonationList.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload
                }
                state.loading = 'rejected'
                state.status = 'failed';
            })
    },
});


export const selectDonation = (state) => state.donation
export const selectDonationPriceList = (state) => state.donation.priceList

export const selectDonationLoading = (state) => state.donation.loading
export const selectDonationError = (state) => state.donation.error

export const selectDonationModal = (state) => state.donation.isOpenModal

export const selectDonationRedirectUrl = (state) => state.donation.redirectUrl

export const selectDonationSelectedAmount = (state) => state.donation.selectedAmount

export const selectDonationList = (state) => state.donation.donationList


export const { openDonationModal, closeDonationModal, selectAmount } = donationSlice.actions


export const donationReducer = donationSlice.reducer