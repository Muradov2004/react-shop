import AddProductModal from "./AddProductModal";
import React, {useEffect, useState} from "react";
import {Button, Card, Input, notification} from "antd";
import {deleteFromProductsFetch, getProductsFetch, searchProductFetch} from "./store/fetchs";
import {useDispatch, useSelector} from "react-redux";
import UpdateProductModal from "./UpdateProductModal";
import './AdminProduct.css';

const {Search} = Input;
const {Meta} = Card;

let AdminProducts = () => {
  const [isUpdateProductModalOpen, setIsUpdateProductModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [content, setContent] = useState("asc");
  const [product, setProduct] = useState({});

  const products = useSelector((state) => state.products.productArray);
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.info({
      message: "salam",
      placement: "bottom",
      style: {
        minHeight: "min-content",
      },
    });
  };

  useEffect(() => {
    dispatch(getProductsFetch());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts([...products]);
  }, [products]);

  useEffect(() => {
    if (searchValue !== "") dispatch(searchProductFetch(searchValue));
    else dispatch(getProductsFetch());
  }, [searchValue]);


  const handleRemove = (obj) => {
    dispatch(deleteFromProductsFetch(obj))
      .then(() => dispatch(getProductsFetch()))
  };
  const handleSortAscDesc = () => {
    if (content === "asc") {
      setContent("desc");
      setFilteredProducts(
        filteredProducts.sort((a, b) => a.product_price - b.product_price)
      );
    } else if (content === "desc") {
      setContent("asc");
      setFilteredProducts(
        filteredProducts.sort((a, b) => b.product_price - a.product_price)
      );
    }
  };

  const handleAddProduct = () => {
    setIsAddProductModalOpen(true);
  };
  const handleUpdate = (item) => {
    setIsUpdateProductModalOpen(true);
    setProduct({...item});
  }

  return (
    <div>
      <Search type="text"
              placeholder="Search by product name"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              style={{width:500,marginRight:10}}/>
      <Button onClick={handleSortAscDesc} style={{marginRight:10}}>{content}</Button>
      <Button onClick={handleAddProduct} type='primary'>Add Product</Button>
      <ul id='cards-playground'>
        {filteredProducts.map((item, index) => {
          return (

            <Card hoverable
                  key={index}
                  style={{width: '230px', marginTop: '10px'}}
                  cover={<img src={item.product_image} alt="Product Img"/>}>
              <div style={{marginBottom: 10}}>
                <Meta title={item.product_name} description={item.product_description}/>
                <Meta description={`Price : ${item.product_price}`}/>
                <Meta description={item.store_name}/>
                <Meta description={item.store_address}/>
              </div>
              <Button onClick={() => handleUpdate(item)}>Change Price</Button>
              <Button onClick={() => handleRemove(item)}>Remove</Button>
            </Card>

          );
        })}
      </ul>
      <AddProductModal isAddProductModalOpen={isAddProductModalOpen}
                       setIsAddProductModalOpen={setIsAddProductModalOpen}/>
      <UpdateProductModal isUpdateProductModalOpen={isUpdateProductModalOpen}
                          setIsUpdateProductModalOpen={setIsUpdateProductModalOpen}
                          product={product}
                          setProduct={setProduct}/>
      {contextHolder}
    </div>
  );


}

export default AdminProducts;