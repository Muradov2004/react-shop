import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {deleteFromOrderFetch, getOrderFetch, updateOrderCountFetch} from "../../store/fetchs";
import {InputNumber, Input, Button, Card, notification, Empty} from "antd";
import OrderForm from "./OrderForm";
import '../../styles/Order.css';
import {getDeletedBag, updateOrderCount} from "../../store/reducer";

const {Search} = Input;
const {Meta} = Card;

let Order = () => {
  let [filterOrders, setFilterOrders] = useState([]);
  let orderedProducts = useSelector((state) => state.products.myBagArray);
  let infoChange = useSelector((state) => state.products.updateOrderCountInfo);
  let infoDelete = useSelector((state) => state.products.deleteFromBagInfo);
  let [content, setContent] = useState('asc');
  let [searchValue, setSearchValue] = useState('');
  let dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (msg) => {
    api.info({
      message: msg,
      placement: "bottom",
      style: {
        minHeight: "min-content",
      },
    });
  };
  useEffect(() => {
    dispatch(getOrderFetch())
  }, [dispatch]);
  useEffect(() => {
    setFilterOrders(orderedProducts);
  }, [orderedProducts]);
  useEffect(() => {
    if (infoChange) {
      openNotification(infoChange);
      dispatch(updateOrderCount(null));
    }
  }, [infoChange]);
  useEffect(() => {
    if (infoDelete) {
      openNotification(infoDelete);
      dispatch(getDeletedBag(null));
    }
  }, [infoDelete]);
  useEffect(() => {
    let newArr = orderedProducts.filter((item) => {
      const regex = new RegExp(searchValue, "i");
      return regex.test(item.product_name);
    });
    setFilterOrders(newArr);
  }, [searchValue]);

  let handleSortAscDesc = () => {
    if (content === 'asc') {
      setContent('desc');
      setFilterOrders([...filterOrders].sort((a, b) => a.product_price - b.product_price))
    } else if (content === 'desc') {
      setContent('asc');
      setFilterOrders([...filterOrders].sort((a, b) => b.product_price - a.product_price))
    }
  }
  let handleCountChanged = (id, value) => {
    dispatch(updateOrderCountFetch(id, value))
      .then(() => dispatch(getOrderFetch()));
  }
  let handleDelete = (id) => {
    dispatch(deleteFromOrderFetch(id))
      .then(() => dispatch(getOrderFetch()));
  }

  if (filterOrders.length === 0) {
    return (
      <div style={{height: '100vw'}}>
        <Empty description='Your bag is empty' style={{marginTop: 200}}/>
      </div>
    )
  }

  return (
    <div className='order'>
      <div className='top'>
        <h1>Orders</h1>
        <Search placeholder="Search by product name"
                allowClear
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                style={{width: 300}}/>
        <Button onClick={handleSortAscDesc}>{content}</Button>
      </div>
      <div className='order-main'>
        <ul id='cards-playground'>{filterOrders.map((item, index) => {
          return (
            <Card key={index}
                  hoverable cover={<img src={item.product_image} alt="#"/>}
                  style={{width: '230px', marginTop: '10px'}}>
              <div style={{marginBottom: 10}}>
                <Meta title={item.product_name} description={item.product_description}/>
                <Meta description={`Price : ${item.product_price}`}/>
                <Meta description={item.store_name}/>
                <Meta description={item.store_address}/>
              </div>
              <InputNumber min={1} defaultValue={item.count}
                           onChange={(value) => handleCountChanged(item.id, value)}
                           style={{marginRight: 3}}/>
              <Button onClick={() => handleDelete(item.id)}>Delete</Button>
            </Card>
          )
        })}</ul>
        <OrderForm orders={orderedProducts} openNotification={openNotification}/>
      </div>
      {contextHolder}
    </div>
  )
}

export default Order;