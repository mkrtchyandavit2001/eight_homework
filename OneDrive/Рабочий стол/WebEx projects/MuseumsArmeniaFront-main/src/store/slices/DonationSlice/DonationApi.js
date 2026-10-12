import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";

export const getDonationPriceList = createAsyncThunk(
    'donationPriceList/getDonationPriceList',
    async (_, thunkAPI) => {
        try {
            const config = {
                method: "get",
                url: `donation-amounts`,
            };

            const response = await instance(config);
            return response?.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.error.both);
        }
    }
)


export const sendDonationPerson = createAsyncThunk(
    'donationPerson/sendDonationPerson',
    async (body, thunkAPI) => {
        try {
            const config = {
                method: "post",
                url: "purchase/donation/store",
                data: body,
            };

            const response = await instance(config);
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.error.both);
        }
    }
)

export const getDonationList = createAsyncThunk(
    'donationList/getDonationList',
    async (id, thunkAPI) => {
        try {
            const config = {
                method: "get",
                url: `user/donation-list`,
            };

            const response = await instance(config);
            return response?.data.purchases

            
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.error.both);
        }
    }
)


