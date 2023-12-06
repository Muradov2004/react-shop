import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getFetchProducts} from "./store/fetchs";
import {useParams} from "react-router-dom";

let ProductInfo = () => {
  let products = useSelector((state) => state.products.productsArray)
  let {productId} = useParams();
  let dispatch = useDispatch()
  useEffect(() => {
    if (products.length === 0) {
      dispatch(getFetchProducts());
    }
  }, [dispatch, products]);

  const product = products[parseInt(productId) - 1];
  if (!product) {
    return <div>Sorry,Product not found</div>;
  }

  return (
    <div>
      <img src={product.product_image} alt=""/>
      <p>{product.product_name}</p>
      <p>{product.product_description}</p>
      <p>{product.product_price}</p>
    </div>
  );
}

export default ProductInfo;