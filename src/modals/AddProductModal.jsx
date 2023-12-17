import {Button, Form, Input, Modal} from "antd";
import {useState} from "react";
import {addProductAdminFetch, getProductsFetch} from "../store/fetchs";
import {useDispatch} from "react-redux";

let AddProductModal = ({isAddProductModalOpen, setIsAddProductModalOpen}) => {
  const dispatch = useDispatch();

  const [newProduct, setNewProduct] = useState({
    product_name: "",
    product_description: "",
    product_price: null,
    store_name: "",
    store_address: "",
    product_image: "",
  });

  const handleAdd = () => {
    dispatch(addProductAdminFetch(newProduct))
      .then(() => dispatch(getProductsFetch()));
    setNewProduct({
      product_name: "",
      product_description: "",
      product_price: null,
      store_name: "",
      store_address: "",
      product_image: "",
    });
    setIsAddProductModalOpen(false);
  };

  return (
    <div>
      <Modal
        title="Add Product"
        open={isAddProductModalOpen}
        onCancel={() => setIsAddProductModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsAddProductModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="add" type="primary" onClick={handleAdd}>
            Add
          </Button>,
        ]}>
        <Form layout='vertical'>
          <Form.Item label='Product name'>
            <Input
              placeholder="Product Name"
              value={newProduct.product_name}
              onChange={(e) =>
                setNewProduct({...newProduct, product_name: e.target.value})
              }/>
          </Form.Item>
          <Form.Item label='Description'>
            <Input
              placeholder="Product Description"
              value={newProduct.product_description}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  product_description: e.target.value,
                })
              }/>
          </Form.Item>
          <Form.Item label='Price'>
            <Input
              placeholder="Product Price"
              value={newProduct.product_price}
              onChange={(e) =>
                setNewProduct({...newProduct, product_price: parseInt(e.target.value)})
              }/>
          </Form.Item>
          <Form.Item label='Store name'>
            <Input
              placeholder="Store Name"
              value={newProduct.store_name}
              onChange={(e) =>
                setNewProduct({...newProduct, store_name: e.target.value})
              }
            />
          </Form.Item>
          <Form.Item label='Store Address'>
            <Input
              placeholder="Store Address"
              value={newProduct.store_address}
              onChange={(e) =>
                setNewProduct({...newProduct, store_address: e.target.value})
              }/>
          </Form.Item>
          <Form.Item label='Image link'>
            <Input
              placeholder="Product Image Link"
              value={newProduct.product_image}
              onChange={(e) =>
                setNewProduct({...newProduct, product_image: e.target.value})
              }/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AddProductModal;