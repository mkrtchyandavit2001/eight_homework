import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../axios";

export const getEventsPage = createAsyncThunk(
    'eventsPage/getEventsPage',
    async (body, thunkAPI) => {
        const region = body.region ? `&museum_geographical_location_id=${body.region}` : ''
        const museum = body.museum ? `&museum_id=${body.museum}` : ''

        try {
            const config = {
                method: "get",
                url: `events/events-list?page=${body.pageIndex}${region}${museum}`,
            };

            const response = await instance(config);
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.error.both);
        }
    }
)
// =======================Events_home=================================

export const getEventsHome = createAsyncThunk(
    'eventsHome/getEventsHome',
    async (thunkAPI) => {

        try {
            const config = {
                method: "get",
                url: 'header/event-list',
            };

            const response = await instance(config);
            return response?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)