import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {addToOrderFetch, getProductsFetch} from "../../store/fetchs";
import {useParams} from "react-router-dom";
import "../../styles/ProductInfo.css";
import {Button, Empty, Image, notification} from "antd";
import {getPostData} from "../../store/reducer";

let ProductInfo = () => {
  let products = useSelector((state) => state.products.productArray)
  let addInfo = useSelector((state) => state.products.addBagInfo)
  let {productId} = useParams();
  let dispatch = useDispatch()
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
    if (products.length === 0) {
      dispatch(getProductsFetch());
    }
  }, [dispatch, products]);
  useEffect(() => {
    if (addInfo) {
      openNotification(addInfo);
      dispatch(getPostData(null));
    }
  }, [addInfo]);

  const product = products.find((item) => item.id === parseInt(productId));
  if (!product) {
    return <div>
     <h1>Sorry,Product not found</h1>
     <Empty/>
    </div>;
  }

  const handleAddToCart = () => dispatch(addToOrderFetch(product))

  return (
    <div className='productinfo-div'>
      <Image src={product.product_image} alt=""
             style={{width: 500, height: 400, objectFit: "contain"}}/>
      <div className='info-div'>
        <h1>{product.product_name}</h1>
        <h3>${product.product_price}</h3>
        <p>{product.product_description}</p>
        <p>Market: {product.store_name}</p>
        <p>Market Address: {product.store_address}</p>
      </div>
      <Button onClick={handleAddToCart} type='primary'>Add To Cart</Button>
      {contextHolder}
    </div>
  );
}

export default ProductInfo;