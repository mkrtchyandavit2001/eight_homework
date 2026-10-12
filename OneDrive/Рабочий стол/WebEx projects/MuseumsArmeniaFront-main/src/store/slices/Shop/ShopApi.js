import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../../axios';

export const getAllShop = createAsyncThunk('shop/getAllShop', async (data, thunkAPI) => {
  // alert('getAllShop');
  console.log(data, 'dataaa');
  try {
    const config = {
      method: 'get',
      url: `shop/product-list?page=${data.currentPage}&museum_id=${data.museum_id}&product_category_id=${data.categora_id}&name=${data.searchText}`,
    };

    const response = await instance(config);
    console.log(response, 88888888888);
    // alert(333);
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.both);
  }
});

export const getCategoryShop = createAsyncThunk('shop/getcategoryshop', async (_, thunkAPI) => {
  try {
    const config = {
      method: 'get',
      url: 'shop/product-category',
    };

    const response = await instance(config);
    console.log(response, 777777777);
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.both);
  }
});

export const getMuseumNames = createAsyncThunk('shop/getmuseumnames', async (_, thunkAPI) => {
  try {
    const config = {
      method: 'get',
      url: 'museum-list',
    };
    const response = await instance(config);
    console.log(response, 666666666);
    return response?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error.both);
  }
});

export const getSearchesShop = createAsyncThunk(
  'shop/getSearchesShop',
  async (searchText, thunkAPI) => {
    try {
      const config = {
        method: 'get',
        url: `shop/product-list?name=${searchText}`,
      };
      const response = await instance(config);
      console.log(response, 9999999999999999999999);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.both);
    }
  },
);

export const getFilteredShop = createAsyncThunk(
  'shop/getFilteredShop',
  async ({ category, museum, currentPage }, thunkAPI) => {
    try {
      const config = {
        method: 'get',
        url: `shop/product-list?museum_id=${museum}&product_category_id=${category}&page=${currentPage}`,
      };
      const response = await instance(config);
      console.log(response);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.both);
    }
  },
);

export const getSingleDataShop = createAsyncThunk(
  'shop/getSingleDataShop',
  async (id, thunkAPI) => {
    try {
      const config = {
        method: 'get',
        url: `shop/product/${id}`,
      };
      const response = await instance(config);
      console.log(response);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.both);
    }
  },
);

/////////////api for send backend product//////////////

export const postShopCardData = createAsyncThunk(
  'shop/postShopCardData',
  async (body, thunkAPI) => {
    try {
      const cardData = {
        items: [
          {
            type: 'product',
            product_id: body.id,
            quantity: 1,
          },
        ],
      };
      const config = {
        method: 'post',
        url: `cart/store`,
        data: cardData,
      };
      const response = await instance(config);
      console.log(response);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.both);
    }
  },
);

export const postSingleShopCardData = createAsyncThunk(
  'shop/postSingleShopCardData',
  async (body, thunkAPI) => {
    try {
      const singleCardData = {
        items: [
          {
            type: 'product',
            product_id: body.id,
            quantity: body.productCount,
          },
        ],
      };
      const config = {
        method: 'post',
        url: `cart/store`,
        data: singleCardData,
      };
      const response = await instance(config);
      console.log(response);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.both);
    }
  },
);

//////////////////delate product//////////////////////////

export const getDelateProductBasket = createAsyncThunk(
  'shop/getDelateProductBasket',
  async (id, thunkAPI) => {
    try {
      const config = {
        method: 'get',
        url: `cart/item/${id}/delete`,
      };
      const response = await instance(config);
      console.log(response);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.both);
    }
  },
);

// =============================================>

export const postTicketCart = createAsyncThunk(
  'ticketCart/postTicketCart',
  async (body, thunkAPI) => {
    try {
      const config = {
        method: 'post',
        url: `cart/store`,
        data: body,
      };
      const response = await instance(config);
      console.log(response);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
/////////////shop icon click modal open///////////////////////

export const getShopIconBasketDatas = createAsyncThunk(
  'shop/getShopIconBasketDatas',
  async (_, thunkAPI) => {
    try {
      const config = {
        method: 'get',
        url: 'cart/items',
      };

      const response = await instance(config);
      console.log(response);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error.both);
    }
  },
);
// ==============================================>
/////////////////do baskek  buy proces///////////////////////////
// export const postAllBasketDataDoingPurchase = createAsyncThunk(
//   'shop/postAllBasketDataDoingPurchase',
//   async (body, thunkAPI) => {
//     try {
//       const config = {
//         method: 'post',
//         url: `purchase/store`,
//         data: body,
//       };
//       const response = await instance(config);
//       console.log(response);
//       return response?.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   },
// );







export const postAllBasketDataDoingPurchase = createAsyncThunk(
  'shop/postAllBasketDataDoingPurchase',
  async (body, thunkAPI) => {
    try {
      const config = {
        method: 'post',
        url: `purchase/store`,
        data: body,
      };
      const response = await instance(config);
      console.log(response);
      return response?.data;
    } catch (error) {
      // Օգտագործեք optional chaining, որպեսզի runtime error չտա
      return thunkAPI.rejectWithValue(error?.response?.data || error?.message);
    }
  },
);
/////////////////end do baskek  buy proces///////////////////////////


/////////////api for send combo tickets//////////////

export const postComboTickets = createAsyncThunk(
  'shop/postComboTickets',
  async (body, thunkAPI) => {
    try {
      const cardData = {
        items: [
          {
            type: 'united',
            museum_ids: body.selectedItemIds,
            quantity: body.count,
          },
        ],
      };
      const config = {
        method: 'post',
        url: `cart/store`,
        data: cardData,
      };
      const response = await instance(config);
      console.log(response);
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);