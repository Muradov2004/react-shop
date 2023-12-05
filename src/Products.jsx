import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getFetchGoods, getFetchProducts} from "./store/fetchs";

let Products = () => {
  let products = useSelector((state) => state.products.productsArray)
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(getFetchProducts())
  }, [dispatch]);
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((item,index) => {
          return (
            <div key={index}>
              <img src={item.product_image} alt="image"/>
              <p>{item.product_name}</p>
              <p>{item.product_price}</p>
            </div>
          )
        })}
      </ul>
    </div>
  );
}

export default Products;