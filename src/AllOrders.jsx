import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllOrderFetch} from "./store/fetchs";

let AllOrders = () => {
  let orders = useSelector((state) => state.products.orderArray)
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrderFetch());
  }, [dispatch]);

  return (
    <div>
      <h1>All Orders</h1>
      <ul>
        {orders.map((item, index) => {
          return (
            <div key={index}>
              <div>
                <p>{item.firstName} {item.lastName}</p>
                <p>{item.ordersArr[0].product_name}</p>
              </div>
            </div>
          )
        })}
      </ul>
    </div>
  )
}

export default AllOrders;