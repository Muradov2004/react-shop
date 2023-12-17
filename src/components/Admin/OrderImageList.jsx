const OrderImageList = ({ordersArr}) => {
  return (
    <div style={{maxHeight: 100, overflow: 'auto'}}>
      {ordersArr.map((order, index) => (
        <img key={index}
             src={order.product_image}
             alt={`Order ${index}`}
             style={{width: 50, height: 50,objectFit:"contain", marginRight: 5, borderRadius: 5}}/>
      ))}
    </div>
  );
};

export default OrderImageList;