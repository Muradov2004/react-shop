import React from 'react';
import {Carousel} from 'antd';
import '../../styles/Carousel.css'

const ProductCarousel = ({products}) => {
  const chunkArray = (array, size) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  };

  const chunkedProducts = chunkArray(products, 3);

  return (
    <Carousel autoplay autoplaySpeed={2000} dotPosition='bottom'>
      {chunkedProducts.map((chunk, index) => (
        <div key={index}>
          <div className="carousel-row">
            {chunk.map((item, itemIndex) => (
              <img key={itemIndex} src={item.product_image} alt={`Product ${itemIndex + 1}`}
                   className="carousel-image"/>
            ))}
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
