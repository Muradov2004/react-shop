import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {addToOrderFetch, getProductsFetch} from "./store/fetchs";
import {useParams} from "react-router-dom";
import "./ProductInfo.css";
import {Button, Image} from "antd";

let ProductInfo = () => {
  let products = useSelector((state) => state.products.productArray)
  let {productId} = useParams();
  let dispatch = useDispatch()
  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProductsFetch());
    }
  }, [dispatch, products]);

  const product = products.find((item) => item.id === parseInt(productId));
  if (!product) {
    return <div>Sorry,Product not found</div>;
  }

  return (
    <div className='productinfo-div'>
      <Image src={product.product_image} alt=""
             style={{width: 500, height: 400, objectFit: "contain"}}/>
      <div className='info-div'>
        <h1>{product.product_name}</h1>
        <h3>${product.product_price}</h3>
        <p>{product.product_description}</p>
      </div>
      <Button onClick={() => {
        dispatch(addToOrderFetch(product))
      }} type='primary'>Add To Cart</Button>
    </div>
  );
}

export default ProductInfo;