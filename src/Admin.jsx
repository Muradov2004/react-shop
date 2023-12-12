import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {notification, Button, Card} from "antd";
import {deleteFromProductsFetch, getProductsFetch, searchProductFetch} from "./store/fetchs";
import AddProductModal from "./store/AddProductModal";
import UpdateProductModal from "./UpdateProductModal";
import AllOrders from "./AllOrders";

let Admin = () => {
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isUpdateProductModalOpen, setIsUpdateProductModalOpen] = useState(false);
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
      <h1>Admin</h1>
      <input
        type="text"
        placeholder="Search by product name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button onClick={handleSortAscDesc}>{content}</button>
      <button onClick={handleAddProduct}>Add Product</button>
      <ul>
        {filteredProducts.map((item, index) => {
          return (
            // <Card></Card>
            <div key={index}>
              <div>
                <img src={item.product_image} alt="Product Img"/>
                <p>{item.product_name}</p>
                <p>{item.product_price}</p>
                <p>{item.product_description}</p>
                <p>{item.store_name}</p>
                <p>{item.store_address}</p>
              </div>
              <Button onClick={() => handleUpdate(item)}>Change Price</Button>
              <Button onClick={() => handleRemove(item)}>Remove</Button>
            </div>
          );
        })}
      </ul>
      <AllOrders />
      <AddProductModal isAddProductModalOpen={isAddProductModalOpen}
                       setIsAddProductModalOpen={setIsAddProductModalOpen}/>
      <UpdateProductModal isUpdateProductModalOpen={isUpdateProductModalOpen}
                          setIsUpdateProductModalOpen={setIsUpdateProductModalOpen}
                          product={product}
                          setProduct={setProduct}/>

      {contextHolder}
    </div>
  );
};

export default Admin;