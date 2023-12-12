import {Button, Form, Input, Modal} from "antd";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {changePriceFetch, getProductsFetch} from "./store/fetchs";

let UpdateProductModal = ({isUpdateProductModalOpen, setIsUpdateProductModalOpen, product, setProduct}) => {
  let dispatch = useDispatch();
  let [price, setPrice] = useState(null);
  useEffect(() => {
    setPrice(product.product_price);
  }, [product]);
  let handleUpdate = () => {
    dispatch(changePriceFetch(product, price))
      .then(() => dispatch(getProductsFetch()));
    setIsUpdateProductModalOpen(false);
    setProduct({});
  }

  return (
    <Modal
      title="Add Product"
      open={isUpdateProductModalOpen}
      onCancel={() => setIsUpdateProductModalOpen(false)}
      footer={[
        <Button key="cancel" onClick={() => setIsUpdateProductModalOpen(false)}>
          Cancel
        </Button>,
        <Button key="add" type="primary" onClick={handleUpdate}>
          Update
        </Button>,
      ]}>
      <Form layout='vertical'>
        <Form.Item label='Product name'>
          <Input disabled={true}
                 placeholder="Product Name"
                 value={product.product_name}/>
        </Form.Item>
        <Form.Item label='Description'>
          <Input disabled={true}
                 placeholder="Product Description"
                 value={product.product_description}/>
        </Form.Item>
        <Form.Item label='Price'>
          <Input placeholder="Product Price"
                 value={price}
                 onChange={(e) => setPrice(parseInt(e.target.value))}/>
        </Form.Item>
        <Form.Item label='Store name'>
          <Input disabled={true}
                 placeholder="Store Name"
                 value={product.store_name}/>
        </Form.Item>
        <Form.Item label='Store Address'>
          <Input disabled={true}
                 placeholder="Store Address"
                 value={product.store_address}/>
        </Form.Item>
        <Form.Item label='Image link'>
          <Input disabled={true}
                 placeholder="Product Image Link"
                 value={product.product_image}/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UpdateProductModal;