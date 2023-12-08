import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {deleteFromOrderFetch, getOrderFetch, updateOrderCountFetch} from "./store/fetchs";
import {InputNumber} from "antd";

let Order = () => {
  let [filterOrders, setFilterOrders] = useState([]);
  let orderedProducts = useSelector((state) => state.products.myBagArray);
  let info = useSelector((state) => state.products.updateOrderCountInfo);
  let [content, setContent] = useState('asc');
  let [searchValue, setSearchValue] = useState('');
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderFetch())
  }, [dispatch]);
  useEffect(() => {
    setFilterOrders(orderedProducts);
  }, [orderedProducts]);
  useEffect(() => {
    console.log(info);
  }, [info]);
  useEffect(() => {
    let newArr = orderedProducts.filter((item) => {
      const regex = new RegExp(searchValue, "i");
      return regex.test(item.product_name);
    });
    setFilterOrders(newArr);
  }, [searchValue]);

  let handleSortAscDesc = () => {
    console.log("salam");
    if (content === 'asc') {
      setContent('desc');
      setFilterOrders([...filterOrders].sort((a, b) => a.product_price - b.product_price))
    } else if (content === 'desc') {
      setContent('asc');
      setFilterOrders([...filterOrders].sort((a, b) => b.product_price - a.product_price))
    }
  }
  let handleCountChanged = (id, value) => {
    dispatch(updateOrderCountFetch(id, value));
  }
  let handleDelete = (id) => {
    dispatch(deleteFromOrderFetch(id));
    dispatch(getOrderFetch());
  }

  return (
    <div>
      <h1>Orders</h1>
      <input
        type="text"
        placeholder="Search by product name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button onClick={handleSortAscDesc}>{content}</button>
      <ul>{filterOrders.map((item, index) => {
        return (
          <div key={index}>
            <img src={item.product_image} alt="#"/>
            <p>{item.id}</p>
            <p>{item.product_name}</p>
            <p>{item.product_description}</p>
            <p>{item.product_price}</p>
            <p>{item.store_name}</p>
            <p>{item.store_address}</p>
            <InputNumber min={1} defaultValue={item.count}
                         onChange={(value) => handleCountChanged(item.id, value)}/>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        )
      })}</ul>
    </div>
  )
}

export default Order;