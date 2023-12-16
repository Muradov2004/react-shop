import React, {useState} from 'react';
import {Form, Input, Button, Modal} from 'antd';
import {useDispatch} from "react-redux";
import {sendOrderFetch} from "./store/fetchs";

const OrderForm = ({orders}) => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  let dispatch = useDispatch();
  const showModal = () => {
    setIsMapOpen(true);
  };

  const handleCancel = () => {
    setIsMapOpen(false);
  };

  const onFinish = (values) => {
    let obj = {...values, ordersArr: [...orders]};
    dispatch(sendOrderFetch(obj));
  };


  return (
    <div>
      <Form layout='vertical'
            style={{
              width: '38vw',
              border: '1px solid #dbdbdb',
              borderRadius: '8px',
              padding: 10,
              marginLeft: 10
            }}
            initialValues={{remember: true}}
            onFinish={onFinish}>
        <Form.Item label="First Name"
                   name="firstName"
                   rules={[{required: true, message: 'Please input your first name!'}]}>
          <Input/>
        </Form.Item>

        <Form.Item label="Last Name"
                   name="lastName"
                   rules={[{required: true, message: 'Please input your last name!'}]}>
          <Input/>
        </Form.Item>

        <Form.Item label="Email"
                   name="email"
                   rules={[
                     {required: true, message: 'Please input your email!'},
                     {type: 'email', message: 'Please enter a valid email address!'},
                   ]}>
          <Input/>
        </Form.Item>

        <Form.Item label="Phone Number"
                   name="phoneNumber"
                   rules={[{required: true, message: 'Please input your phone number!'}]}>
          <Input/>
        </Form.Item>

        <Form.Item label="Address"
                   name="address"
                   rules={[{required: true, message: 'Please input your address!'}]}>
          <Input/>
        </Form.Item>

        <Form.Item style={{margin: 10}}>
          <Button type="primary" htmlType="submit">Send</Button>
          <Button type="default" onClick={showModal} style={{marginLeft: '8px'}}>Open Google Map</Button>
        </Form.Item>
      </Form>

      <Modal title="Google Map"
             open={isMapOpen}
             onCancel={handleCancel}
             footer={null}
             width={800}>
        <div style={{height: '400px', width: '100%'}}>
          {/*<MapContainer*/}
          {/*  center={[40.4093, 49.8671,]}*/}
          {/*  zoom={10}*/}
          {/*  style={{height: '100%', width: '100%'}}*/}
          {/*>*/}
          {/*  <TileLayer*/}
          {/*    url={`https://api.maptiler.com/maps/streets/style.json?key=COhoD3buRwSyj1Hvp2As`}*/}
          {/*    attribution="MapTiler"*/}
          {/*  />*/}
          {/*</MapContainer>*/}
        </div>
      </Modal>
    </div>
  );
};

export default OrderForm;
