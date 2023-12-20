import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getProductsFetch, searchProductFetch} from "../../store/fetchs";
import {Link} from "react-router-dom";
import {Button, Card, Empty, Input} from "antd";
import '../../styles/Products.css';
import ProductCarousel from "./ProductCarousel";

const {Search} = Input;
const {Meta} = Card;

let Products = () => {
  let [filteredProducts, setFilteredProducts] = useState([]);
  let [searchValue, setSearchValue] = useState('');
  let [content, setContent] = useState('asc');
  let products = useSelector((state) => state.products.productArray)
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductsFetch())
  }, [dispatch]);
  useEffect(() => {
    sortArray(parseInt(localStorage.getItem("male")), parseInt(localStorage.getItem("female")));
  }, [products]);
  useEffect(() => {
    if (searchValue !== '') dispatch(searchProductFetch(searchValue));
    else dispatch(getProductsFetch());
  }, [searchValue]);

  let sortArray = (man, female) => {
    let newArr = [...products];
    newArr.sort((a, b) => {
      if (man < female) {
        if (a.gender === 'women' && !(b.gender === 'women')) {
          return -1;
        } else if (!(a.gender === 'women') && b.gender === 'women') {
          return 1;
        }
      } else if (man > female) {
        if (a.gender === 'men' && !(b.gender === 'men')) {
          return -1;
        } else if (!(a.gender === 'men') && b.gender === 'men') {
          return 1;
        }
      }
      return 0;
    });
    setFilteredProducts(newArr);
  }
  let handleClick = (gender) => {
    console.log(gender);
    if (gender === 'women') {
      if (localStorage.getItem('female')) {
      } else {
        localStorage.setItem('female', 0)
      }
      let i = localStorage.getItem('female')
      i++
      localStorage.setItem('female', i)
    } else if (gender === 'men') {
      if (!localStorage.getItem('male')) {
        localStorage.setItem('male', 0)
      }
      let i = localStorage.getItem('male')
      i++
      localStorage.setItem('male', i)
    }
  };
  let handleSortAscDesc = () => {
    if (content === 'asc') {
      setContent('desc');
      setFilteredProducts(filteredProducts.sort((a, b) => a.product_price - b.product_price))
    } else if (content === 'desc') {
      setContent('asc');
      setFilteredProducts(filteredProducts.sort((a, b) => b.product_price - a.product_price))
    }
  }

  if (filteredProducts.length === 0) {
    return (
      <div>
        <h1>Products</h1>
        <Empty/>
      </div>
    );
  }

  return (
    <div className='product'>
      <ProductCarousel products={filteredProducts}/>
      <div className='top'>
        <h1>Products</h1>
        <Search placeholder="Search by product name"
                allowClear
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                style={{width: 300}}/>
        <Button onClick={handleSortAscDesc}>{content}</Button>
      </div>
      <ul id='components-grid-demo-playground'>
        {filteredProducts.map((item, index) => {
          return (
            <Link key={index} to={`/product/${item.id}`} onClick={() => handleClick(item.gender)}
                  style={{width: '240px'}}>
              <Card hoverable
                    cover={<img src={item.product_image} alt="Product Img"/>}>
                <Meta title={item.product_name} description={`price : ${item.product_price}`}/>
              </Card>
            </Link>
          )
        })}
      </ul>
    </div>
  );
}

export default Products;