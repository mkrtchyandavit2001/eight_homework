import { createSlice } from '@reduxjs/toolkit';
import { getAllNewses, getPaginatePages, getSearchesNewses, getSingleNews } from './NewsesApi';

const initialState = {
  DataAllNews: [],
  loading: true,
  paginateLength: 0,
  SingleNewsData: [],
  // types: [],
  // typeLoading: false,
};

export const NewsesSlice = createSlice({
  name: 'newses',
  initialState,
  reducers: {
    // setType: (state, action) => {
    //   state.types = action.payload;
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllNewses.fulfilled, (state, action) => {
        // console.log(action.payload, 'action.payload,  fulfiled');
        state.DataAllNews = action.payload.data;
        state.loading = false;
      })
      .addCase(getSearchesNewses.fulfilled, (state, action) => {
        // console.log(action.payload, "action.payload,  fulfiled")
        state.DataAllNews = action.payload.data;
        state.paginateLength = action.payload.meta.last_page;
        state.loading = false;
      })
      .addCase(getPaginatePages.fulfilled, (state, action) => {
        state.DataAllNews = action.payload.data;
        state.paginateLength = action.payload.meta.last_page;
        state.loading = false;
      })
      .addCase(getSingleNews.fulfilled, (state, action) => {
        state.SingleNewsData = action.payload.data;
        state.loading = false;
      })
      .addCase(getAllNewses.pending, (state, action) => {
        console.log('pending');
      })
      .addCase(getSearchesNewses.pending, (state, action) => {
        console.log('pending');
      })
      .addCase(getPaginatePages.pending, (state, action) => {
        console.log('pending');
      })
      .addCase(getSingleNews.pending, (state, action) => {
        console.log('pending');
      })
      .addCase(getAllNewses.rejected, (state, action) => {
        console.log('pending');
      })
      .addCase(getSearchesNewses.rejected, (state, action) => {
        console.log('pending');
      })
      .addCase(getPaginatePages.rejected, (state, action) => {
        console.log('pending');
      })
      .addCase(getSingleNews.rejected, (state, action) => {
        console.log('pending');
      });
  },
});

// export const {
//   //   setErrorMessage,
// } = currentLessonSlice.actions;

export const getDataAllNewses = (state) => state.newses.DataAllNews;
export const getLoadingNewses = (state) => state.newses.loading;
export const getPaginateLength = (state) => state.newses.paginateLength;
export const getSingleNewsDate = (state) => state.newses.SingleNewsData;

export const NewsesReducer = NewsesSlice.reducer;
