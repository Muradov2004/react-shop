import {createSlice} from "@reduxjs/toolkit"

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    productArray: [],
    myBagArray: [],
    orderArray: [],
    addBagInfo: null,
    deleteFromBagInfo: null,
    deleteDataFromGoods: null,
    adminEdited: null,
    updateOrderCountInfo: null,
    isLoading: false,
    error: null
  },
  reducers: {
    getProducts: (state, action) => {
      return {...state, productArray: action.payload}
    },
    getOrder: (state, action) => {
      return {...state, myBagArray: action.payload}
    },
    getPostData: (state, action) => {
      return {...state, addBagInfo: action.payload}
    },
    getDeletedBag: (state, action) => {
      return {...state, deleteFromBagInfo: action.payload}
    },
    getDeletedGoods: (state, action) => {
      return {...state, deleteDataFromGoods: action.payload}
    },
    getEditData: (state, action) => {
      return {...state, adminEdited: action.payload}
    },
    updateOrderCount: (state, action) => {
      return {...state, updateOrderCountInfo: action.payload};
    }
  }
})

export const {
  getProducts,
  getOrder,
  getPostData,
  getDeletedBag,
  getDeletedGoods,
  getEditData,
  updateOrderCount
} = productsSlice.actions

export default productsSlice.reducer