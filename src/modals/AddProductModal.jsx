import {Button, Form, Input, message, Modal, Select} from "antd";
import {useState} from "react";
import {addProductAdminFetch, getProductsFetch} from "../store/fetchs";
import {useDispatch} from "react-redux";

let AddProductModal = ({isAddProductModalOpen, setIsAddProductModalOpen}) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [newProduct, setNewProduct] = useState({
    product_name: "",
    product_description: "",
    product_price: null,
    store_name: "",
    store_address: "",
    product_image: "",
    gender: ""
  });

  const handleAdd = () => {
    if (!(newProduct.product_name === "" ||
      newProduct.product_description === "" ||
      newProduct.product_price === null ||
      newProduct.store_name === "" ||
      newProduct.store_address === "" ||
      newProduct.product_image === "" ||
      newProduct.gender === "")) {
      dispatch(addProductAdminFetch(newProduct))
        .then(() => dispatch(getProductsFetch()));
      setNewProduct({
        product_name: "",
        product_description: "",
        product_price: null,
        store_name: "",
        store_address: "",
        product_image: "",
        gender: ""
      });
      setIsAddProductModalOpen(false);
    } else {
      message.warning("Please fill in all fields");
    }

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
        <Form form={form} layout='vertical'>
          <Form.Item label='Product name'
                     rules={[{required: true, message: 'Please input your product name!'}]}>
            <Input placeholder="Product Name"
                   value={newProduct.product_name}
                   onChange={(e) =>
                     setNewProduct({...newProduct, product_name: e.target.value})
                   }/>
          </Form.Item>
          <Form.Item label='Description'
                     rules={[{required: true, message: 'Please input description!'}]}>
            <Input placeholder="Product Description"
                   value={newProduct.product_description}
                   onChange={(e) =>
                     setNewProduct({
                       ...newProduct,
                       product_description: e.target.value,
                     })
                   }/>
          </Form.Item>
          <Form.Item label='Price'
                     rules={[{required: true, message: 'Please input price!'}]}>
            <Input placeholder="Product Price"
                   value={newProduct.product_price}
                   onChange={(e) =>
                     setNewProduct({...newProduct, product_price: parseInt(e.target.value)})
                   }/>
          </Form.Item>
          <Form.Item label='Store name'
                     rules={[{required: true, message: 'Please input store name!'}]}>
            <Input placeholder="Store Name"
                   value={newProduct.store_name}
                   onChange={(e) =>
                     setNewProduct({...newProduct, store_name: e.target.value})
                   }
            />
          </Form.Item>
          <Form.Item label='Store Address'
                     rules={[{required: true, message: 'Please input store address!'}]}>
            <Input placeholder="Store Address"
                   value={newProduct.store_address}
                   onChange={(e) =>
                     setNewProduct({...newProduct, store_address: e.target.value})
                   }/>
          </Form.Item>
          <Form.Item label='Image link'
                     rules={[{required: true, message: 'Please input image link!'}]}>
            <Input placeholder="Product Image Link"
                   value={newProduct.product_image}
                   onChange={(e) =>
                     setNewProduct({...newProduct, product_image: e.target.value})
                   }/>
          </Form.Item>
          <Form.Item label='Gender'
                     rules={[{required: true, message: 'Please select gender!'}]}>
            <Select placeholder="Select Gender"
                    value={newProduct.gender}
                    onChange={(value) => setNewProduct({...newProduct, gender: value})}>
              <Select.Option value="men">Men</Select.Option>
              <Select.Option value="women">Women</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AddProductModal;