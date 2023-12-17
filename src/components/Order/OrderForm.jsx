import React, {useEffect, useState} from 'react';
import {Form, Input, Button, Modal} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {sendOrderFetch} from "../../store/fetchs";
import Map from '../Map';
import {getSendOrderData} from "../../store/reducer";

const OrderForm = ({orders, openNotification}) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(null);
  const [mapCoordinates, setMapCoordinates] = useState({latitude: null, longitude: null});
  const [isDisabled, setIsDisabled] = useState(true);
  let infoSend = useSelector((state) => state.products.sendOrderInfo);

  useEffect(() => {
    let sum = 0;
    orders.forEach(item => sum += (item.product_price * item.count));
    setTotalPrice(sum);
    if (sum === 0) setIsDisabled(true);
    else setIsDisabled(false);
  }, [orders]);
  useEffect(() => {
    if (infoSend) {
      openNotification(infoSend);
      dispatch(getSendOrderData(null));
    }
  }, [infoSend]);


  let dispatch = useDispatch();
  const showModal = () => {
    setIsMapOpen(true);
  };

  const handleCancel = () => {
    setIsMapOpen(false);
  };

  const onFinish = (values) => {
    let obj = {...values, ordersArr: [...orders], ...mapCoordinates};
    dispatch(sendOrderFetch(obj));
  };

  const handleMapCoordinates = (latitude, longitude) => {
    setMapCoordinates({latitude, longitude});
  };

  const validateCoordinates = (_, value) => {
    if (mapCoordinates.longitude === null && mapCoordinates.latitude === null) {
      return Promise.reject('Please select a location from the map.');
    }
    return Promise.resolve();
  };

  return (
    <div>
      <Form layout='vertical'
            style={{
              width: 400,
              border: '1px solid #dbdbdb',
              borderRadius: '8px',
              padding: 10,
              marginLeft: 10,
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

        <Form.Item label="Longitude"
                   name='longitude'
                   rules={[{required: true, validator: validateCoordinates}]}>
          <p>{mapCoordinates.longitude}</p>
        </Form.Item>

        <Form.Item label="Latitude"
                   name='latitude'
                   rules={[{required: true, validator: validateCoordinates}]}>
          <p>{mapCoordinates.latitude}</p>
        </Form.Item>

        <Form.Item style={{margin: 10}}>
          <Button type="primary" htmlType="submit" disabled={isDisabled}>Send</Button>
          <Button type="default" onClick={showModal} style={{marginLeft: '8px'}}>Open Google Map</Button>
        </Form.Item>
        <Form.Item>
          <h2>Total price {totalPrice}</h2>
        </Form.Item>
      </Form>

      <Modal title="Google Map"
             open={isMapOpen}
             onCancel={handleCancel}
             footer={<Button onClick={handleCancel}>OK</Button>}
             width={800}>
        <div style={{height: '400px', width: '100%'}}>
          <Map onCoordinatesChange={handleMapCoordinates}/>
        </div>
      </Modal>
    </div>
  );
};

export default OrderForm;
