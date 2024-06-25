import React from "react";

export const BookContext = React.createContext();

export const inisealState = {
  product: [
    {
      id: 101,
      title: "Psychlogy",
      price: 20000,
      photo:
        "https://m.media-amazon.com/images/I/81LDP+GDKVL._AC_UF1000,1000_QL80_.jpg",
    },
    {
      id: 102,
      title: "Byology",
      price: 30000,
      photo: "https://cdn.gramedia.com/uploads/items/THE_BIOLOGY_BOOK.jpg",
    },
    {
      id: 103,
      title: "Philosophy",
      price: 45000,
      photo:
        "https://www.morvaykrisztina.hu/wp-content/uploads/The_Philosophy_Book_-_Big_Ideas_Simply_Explained.jpg",
    },
    {
      id: 104,
      title: "Religions",
      price: 15000,
      photo: "https://images.booksense.com/images/433/408/9781465408433.jpg",
    },
    {
      id: 105,
      title: "The Art",
      price: 35000,
      photo: "https://images.booksense.com/images/372/453/9781465453372.jpg",
    },
  ],
  bascet: [],
};

export const reducer = (state, action) => {
  switch (action.tyte) {
    case "MOVE":
      return {
        ...state,
        bascet: state.product.filter((x) => x.id === action.payload),
      };
    case "ADD":
      return {
        bascet: state.bascet.filter((x) => x.id === action.payload).count++,
      };
    case "REDUCE":
      return {
        bascet: state.bascet.filter((x) => x.id === action.payload).count--,
      };
    case "DELETE":
      return {
        bascet: state.bascet.filter((x) => x.id != action.payload),
      };
    default:
      return state;
  }
};
