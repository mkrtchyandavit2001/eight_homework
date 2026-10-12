import { createSlice } from '@reduxjs/toolkit';
import {
  getAllShop,
  getCategoryShop,
  getDelateProductBasket,
  getFilteredShop,
  getMuseumNames,
  getSearchesShop,
  getShopIconBasketDatas,
  getSingleDataShop,
  postAllBasketDataDoingPurchase,
  postComboTickets,
  postShopCardData,
  postSingleShopCardData,
  postTicketCart,
} from './ShopApi';
import { message } from 'antd';

const initialState = {
  shopAllData: [],
  loading: true,
  loadingSingle: true,
  categories: [],
  museumes: [],
  singleShopData: [],
  modalIsOpenShop: false,
  // basketData: [],
  basketAllData: [],
  productLength: 0,
  redirectShopUrl: '',
  message: '',
  cardErrorModal: false,
  // searchCountLengthShop: 0,
  // storageProductId: localStorage.getItem('CardArray')
  //   ? JSON.parse(localStorage.getItem('CardArray'))
  //   : [],
  // basketLength: localStorage.getItem('CardArray')
  //   ? JSON.parse(localStorage.getItem('CardArray')).length
  //   : 0,
  // totalPrice: 0,
};

export const ShopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setModalIsOpenShop(state, { payload }) {
      state.modalIsOpenShop = payload;
    },

    setCardErrorModal(state, { payload }) {
      state.cardErrorModal = payload;
    }
    // setBasketData(state, { payload }) {
    //   state.basketData = [...state.basketData, payload];
    //   // state.totalPrice = state.basketData.reduce((total, obj) => total + obj.price, 0);
    // },
    // removeElemBasket(state, payload) {
    //   console.log('idddd', payload);
    //   const id = payload.payload;
    //   const newData = state.basketData.filter((el) => el.id !== id);
    //   state.basketData = newData;
    //   // state.totalPrice = state.totalPrice - state.basketData.find((el) => el.id === id)?.price || 0;
    //   // localStorage.setItem('CardArray', JSON.stringify(newData));
    // },
    // setStorageProduct(state, payload) {
    //   console.log(payload, 'payloadpayload');
    //   // state.basketData = payload.filter((product) => state.storageProductId.includes(product.id));
    //   state.basketData = state.storageProductId
    // },
    //////
    // totalPriceBasket(state, payload) {
    //   const totalPrice = state.basketData.reduce((total, obj) => total + obj.price, 0);
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllShop.pending, (state, action) => {
        console.log('pending');
        // state.loading = true;
      })
      .addCase(getAllShop.fulfilled, (state, action) => {
        state.shopAllData = action.payload;
        // alert(1);
        // ShopSlice.caseReducers.setStorageProduct(state, action.payload.data);
        // state.basketData = state.storageProductId;
        state.loading = false;
      })
      .addCase(getAllShop.rejected, (state, action) => {
        console.log('chdarav');
      })
      .addCase(getCategoryShop.fulfilled, (state, action) => {
        state.categories = action.payload.data;
        state.loading = false;
      })
      .addCase(getMuseumNames.fulfilled, (state, action) => {
        state.museumes = action.payload.data;
        state.loading = false;
      })
      .addCase(getSearchesShop.fulfilled, (state, action) => {
        state.shopAllData = action.payload;
        state.loading = false;
        // state.searchCountLengthShop = action.payload.data.length;
      })
      .addCase(getFilteredShop.fulfilled, (state, action) => {
        state.shopAllData = action.payload;
        state.loading = false;
      })
      .addCase(getSingleDataShop.fulfilled, (state, action) => {
        state.singleShopData = action.payload.data;
        state.loadingSingle = false;
      })
      .addCase(postShopCardData.fulfilled, (state, action) => {
        state.productLength = action.payload.params.items_count;
        state.basketAllData = action.payload.data;
        console.log('basketAllDatabasketAllData', action.payload.data);
      })
      .addCase(postSingleShopCardData.fulfilled, (state, action) => {
        state.productLength = action.payload.params.items_count;
        state.basketAllData = action.payload.data;
      })
      .addCase(postTicketCart.fulfilled, (state, action) => {
        console.log('postTicketCartpostTicketCartpostTicketCart');
        state.productLength = action.payload.params.items_count;
        state.basketAllData = action.payload.data;
      })
      .addCase(getDelateProductBasket.fulfilled, (state, action) => {
        state.productLength = action.payload.params.items_count;
        console.log('action.payload.data.id', action.payload.data.id);
        let id = parseInt(action.payload.data.id);
        state.basketAllData.products = state.basketAllData.products.filter(
          (product) => product.id !== id,
        );
        if (action.payload.data.id !== null) {
          state.basketAllData.tickets = state.basketAllData.tickets.filter(
            (ticket) => ticket.id !== id,
          );
        }
        else {
          state.basketAllData.tickets = []
          state.productLength = 0
        }
        
      })
      .addCase(getShopIconBasketDatas.fulfilled, (state, action) => {
        console.log('a11111111');
        state.basketAllData = action.payload.data;
        console.log('a22222222222');
        state.productLength = action.payload.params.items_count;
        console.log('a33333333333333');
      })
      .addCase(postComboTickets.fulfilled, (state,action) => {
        state.basketAllData = action.payload.data;
        state.productLength = action.payload.params.items_count;
      })
      .addCase(postAllBasketDataDoingPurchase.fulfilled, (state, action) => {
        state.redirectShopUrl = action.payload.data.redirect_url;
      })

      

      .addCase(postAllBasketDataDoingPurchase.rejected, (state, action) => {
          state.message = action.payload
      });

  },
});

export const getAllShopDate = (state) => state.shop.shopAllData;
export const getLoadingShop = (state) => state.shop.loading;
export const getCategories = (state) => state.shop.categories;
export const getMuseumsNames = (state) => state.shop.museumes;
export const getSingleShopDatas = (state) => state.shop.singleShopData;
export const getSingleShopLoading = (state) => state.shop.loadingSingle;
export const getSetModalIsOpenShop = (state) => state.shop.modalIsOpenShop;
// export const getSetBasketData = (state) => state.shop.basketData;
// export const getStorageProductId = (state) => state.shop.storageProductId;
// export const getBasketLength = (state) => state.shop.basketLength;
// export const getBaskettotalPrice = (state) => state.shop.totalPrice;
export const getProductLength = (state) => state.shop.productLength;
export const getSetAllBasketData = (state) => state.shop.basketAllData;
export const getRedirectUrl = (state) => state.shop.redirectShopUrl;
export const getErrorMessage = (state) => state.shop.message
export const getCardErrorModal = (state) => state.shop.cardErrorModal
// export const getSearchLengthShop = (state) => state.shop.searchCountLengthShop;

export const { setModalIsOpenShop, setBasketData, removeElemBasket, totalPriceBasket, setCardErrorModal } =
  ShopSlice.actions;

export const ShopReducer = ShopSlice.reducer;
