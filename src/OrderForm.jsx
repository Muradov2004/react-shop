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
      <Form
        labelCol={{span: 8}}
        wrapperCol={{span: 16}}
        initialValues={{remember: true}}
        onFinish={onFinish}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{required: true, message: 'Please input your first name!'}]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{required: true, message: 'Please input your last name!'}]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {required: true, message: 'Please input your email!'},
            {type: 'email', message: 'Please enter a valid email address!'},
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[{required: true, message: 'Please input your phone number!'}]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{required: true, message: 'Please input your address!'}]}
        >
          <Input/>
        </Form.Item>

        <Form.Item wrapperCol={{offset: 8, span: 16}}>
          <Button type="primary" htmlType="submit">Send</Button>
          <Button type="default" onClick={showModal} style={{marginLeft: '8px'}}>Open Google Map</Button>
        </Form.Item>
      </Form>

      <Modal
        title="Google Map"
        open={isMapOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        {/*<div style={{ height: '400px', width: '100%' }}>*/}
        {/*  <GoogleMapReact*/}
        {/*    bootstrapURLKeys={{ key: 'AIzaSyCZGW1Q9MWGjAbkmvcTc_Ro8s5ME5vKewE' }}*/}
        {/*    defaultCenter={defaultProps.center}*/}
        {/*    defaultZoom={defaultProps.zoom}*/}
        {/*    onClick={onMapClick}*/}
        {/*  />*/}
        {/*</div>*/}
      </Modal>
    </div>
  );
};

export default OrderForm;
