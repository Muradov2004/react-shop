import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getAllOrderFetch} from "../../store/fetchs";
import {Card, Empty} from "antd";
import Map from '../Map';
import OrderImageList from "./OrderImageList";

let AdminOrders = () => {
  let orders = useSelector((state) => state.products.orderArray)
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrderFetch());
  }, [dispatch]);

  if (orders.length === 0) {
    return (
      <div style={{height: '100vw'}}>
        <Empty description='No order sent yet' style={{marginTop: 200}}/>
      </div>
    );
  }

  return (
    <div>
      <h1>All Orders</h1>
      <ul style={{display: "flex", flexWrap: "wrap", justifyContent: "space-evenly"}}>
        {orders.map((item, index) => {
          return (
            <Card key={index}
                  style={{width: 300, marginTop: '10px'}}
                  cover={<div style={{width: 300, height: 250, borderRadius: 5}}><Map lng={item.longitude}
                                                                                      lat={item.latitude}
                                                                                      canChangeMarker={false}/></div>}>
              <div>
                <p>{item.firstName} {item.lastName}</p>
                <p>address: {item.address}</p>
                <p>gmail: {item.email}</p>
                <p>phone number: {item.phoneNumber}</p>
                <p>total
                  price: {item.ordersArr.reduce((total, order) => total + order.product_price * order.count, 0)}</p>
                <h4>products</h4>
                <OrderImageList ordersArr={item.ordersArr}/>
              </div>
            </Card>
          )
        })}
      </ul>
    </div>
  )
}

export default AdminOrders;