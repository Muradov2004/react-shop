import {
  getProducts,
  getOrder,
  getAllOrders,
  getPostData,
  getSendOrderData,
  getDeletedBag,
  deletedProducts,
  getEditData,
  getAdminAdded,
  updateOrderCount
} from './reducer'

export const getProductsFetch = () => dispatch =>
  fetch('http://localhost:5000/goods')
    .then(res => res.json())
    .then(data => dispatch(getProducts(data)))
    .catch(err => console.log(err))
export const addToOrderFetch = (obj) => dispatch => {
  return fetch('http://localhost:5000/add-mybag', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(obj)
  })
    .then(res => {
      if (!res.ok) {
        console.log(res.statusText)
      }
      return res.text()
    })
    .then(data => dispatch(getPostData(data)))
    .catch(err => console.log(err))
}
export const getOrderFetch = () => dispatch =>
  fetch('http://localhost:5000/my-bag')
    .then(res => res.json())
    .then(data => dispatch(getOrder(data)))
    .catch(err => console.log(err))
export const getAllOrderFetch = () => dispatch =>
  fetch('http://localhost:5000/orders')
    .then(res => res.json())
    .then(data => dispatch(getAllOrders(data)))
    .catch(err => console.log(err))
export const deleteFromOrderFetch = (id) => dispatch =>
  fetch(`http://localhost:5000/delete-mybag/${id}`, {
    method: 'DELETE',
  })
    .then(res => res.text())
    .then(data => dispatch(getDeletedBag(data)))
    .catch(err => console.log(err))
export const updateOrderCountFetch = (id, count) => dispatch => {
  return fetch(`http://localhost:5000/update-order-count/${id}`, {
    method: 'PUT',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({count})
  })
    .then(res => {
      if (!res.ok) {
        console.log(res.statusText);
        throw new Error('Failed to update order count');
      }
      return res.text();
    })
    .then(data => {
      dispatch(updateOrderCount(data));
      return data;
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};
export const sendOrderFetch = (obj) => dispatch => {
  fetch('http://localhost:5000/add-orders', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(obj)
  })
    .then(res => {
      if (!res.ok) {
        console.log(res.statusText)
      }
      return res.text()
    })
    .then(data => dispatch(getSendOrderData(data)))
    .catch(err => console.log(err))
}
export const deleteFromProductsFetch = (obj) => dispatch =>
  fetch(`http://localhost:5000/delete-admin/${obj.id}`, {
    method: 'DELETE',
  })
    .then(res => res.text())
    .then(data => dispatch(deletedProducts(data)))
    .catch(err => console.log(err))
export const searchProductFetch = (searchValue) => dispatch =>
  fetch(`http://localhost:5000/search-goods/${searchValue}`, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(data => dispatch(getProducts(data)))
    .catch(err => console.log(err))
export const addProductAdminFetch = (obj) => dispatch =>
  fetch('http://localhost:5000/add-admin', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(obj)
  })
    .then(res => res.text())
    .then(data => dispatch(getAdminAdded(data)))
    .catch(err => console.log(err))
export const changePriceFetch = (changedObject, price) => async (dispatch) => {
  try {
    let obj = {...changedObject, product_price: price};

    const response = await fetch(`http://localhost:5000/change-admin/${changedObject.id}`, {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      console.log(response.statusText);
      throw new Error('Failed to update price');
    }

    const data = await response.text();
    dispatch(getEditData(data));

  } catch (err) {
    console.error(err);
  }
};

