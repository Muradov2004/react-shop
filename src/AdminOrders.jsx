import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getAllOrderFetch} from "./store/fetchs";
import {Card} from "antd";
import Map from './Map';

let AdminOrders = () => {
  let orders = useSelector((state) => state.products.orderArray)
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrderFetch());
  }, [dispatch]);

  return (
    <div>
      <h1>All Orders</h1>
      <div style={{width: '100px', height: '100px'}}>

      </div>
      <ul>
        {orders.map((item, index) => {
          return (
            <Card key={index}
                  style={{width: '250px', marginTop: '10px'}}
                  cover={<div style={{width: 250, height: 250, borderRadius: 5}}><Map lng={item.longitude}
                                                                                      lat={item.latitude}
                                                                                      canChangeMarker={false}/></div>}>
              <div key={index}>
                <div>
                  <p>{item.firstName} {item.lastName}</p>
                  <p>{item.ordersArr[0].product_name}</p>
                </div>
              </div>
            </Card>
          )
        })}
      </ul>
    </div>
  )
}

export default AdminOrders;