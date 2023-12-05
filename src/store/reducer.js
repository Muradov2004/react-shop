import {createSlice} from "@reduxjs/toolkit"

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    productsArray: [],
    orderArray: [],
    postData: null,
    deleteDataFromBag: null,
    deleteDataFromGoods: null,
    adminEdited: null,
    isLoading: false,
    error: null
  },
  reducers: {
    getProducts: (state, action) => {
      return {...state, productsArray: action.payload}
    },
    getMyBag: (state, action) => {
      return {...state, myBagArray: action.payload}
    },
    getPostData: (state, action) => {
      return {...state, postData: action.payload}
    },
    getDeletedBag: (state, action) => {
      return {...state, deleteDataFromBag: action.payload}
    },
    getDeletedGoods: (state, action) => {
      return {...state, deleteDataFromGoods: action.payload}
    },
    getEditData: (state, action) => {
      return {...state, adminEdited: action.payload}
    },
  }
})

export const {getProducts, getMyBag, getPostData, getDeletedBag, getDeletedGoods, getEditData} = productsSlice.actions

export default productsSlice.reducer