import {createSlice} from "@reduxjs/toolkit"

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    productArray: [],
    myBagArray: [],
    orderArray: [],
    addBagInfo: null,
    sendOrderInfo: null,
    deleteFromBagInfo: null,
    deleteProductsInfo: null,
    adminEdited: null,
    adminAdded: null,
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
    getSendOrderData: (state, action) => {
      return {...state, sendOrderInfo: action.payload}
    },
    getDeletedBag: (state, action) => {
      return {...state, deleteFromBagInfo: action.payload}
    },
    deletedProducts: (state, action) => {
      return {...state, deleteProductsInfo: action.payload}
    },
    getEditData: (state, action) => {
      return {...state, adminEdited: action.payload}
    },
    getAdminAdded: (state, action) => {
      return {...state, adminAdded: action.payload};
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
  getSendOrderData,
  getDeletedBag,
  deletedProducts,
  getEditData,
  getAdminAdded,
  updateOrderCount
} = productsSlice.actions

export default productsSlice.reducer