import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {addToOrderFetch, getProductsFetch} from "./store/fetchs";
import {Link} from "react-router-dom";
import {notification} from "antd";


let Products = () => {
  let [filteredProducts, setFilteredProducts] = useState([]);
  let [searchValue, setSearchValue] = useState('');
  let [content, setContent] = useState('asc');
  let products = useSelector((state) => state.products.productArray)
  let addInfo = useSelector((state) => state.products.addBagInfo)
  let dispatch = useDispatch()
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: addInfo,
      placement,
      style: {
        minHeight: 'min-content',
      },
    });
  };

  useEffect(() => {
    dispatch(getProductsFetch())
  }, [dispatch]);
  useEffect(() => {
    sortArray(localStorage.getItem("male"), localStorage.getItem("female"));
  }, [products]);
  useEffect(() => {
    if (addInfo) {
      openNotification('bottom');
    }
  }, [addInfo]);
  useEffect(() => {
    let newArr = products.filter((item) => {
      const regex = new RegExp(searchValue, "i");
      return regex.test(item.product_name);
    });
    setFilteredProducts(newArr);
  }, [searchValue]);

  let sortArray = (man, female) => {
    let newArr = [...products];
    newArr.sort((a, b) => {
      if (man < female) {
        if (a.product_name.includes("Qadın") && !b.product_name.includes("Qadın")) {
          return -1;
        } else if (!a.product_name.includes("Qadın") && b.product_name.includes("Qadın")) {
          return 1;
        }
      } else if (man > female) {
        if (a.product_name.includes("Kişi") && !b.product_name.includes("Kişi")) {
          return -1;
        } else if (!a.product_name.includes("Kişi") && b.product_name.includes("Kişi")) {
          return 1;
        }
      }
      return 0;
    });
    setFilteredProducts(newArr);
  }
  let handleClick = (name) => {
    if (name.includes('Qadın')) {
      if (localStorage.getItem('female')) {
      } else {
        localStorage.setItem('female', 0)
      }
      let i = localStorage.getItem('female')
      i++
      localStorage.setItem('female', i)
    } else if (name.includes('Kişi')) {
      if (!localStorage.getItem('male')) {
        localStorage.setItem('male', 0)
      }
      let i = localStorage.getItem('male')
      i++
      localStorage.setItem('male', i)
    }
  };
  let handleAddToCart = (obj) => {
    handleClick(obj.product_name);
    dispatch(addToOrderFetch(obj));
  }
  let handleSortAscDesc = () => {
    if (content === 'asc') {
      setContent('desc');
      setFilteredProducts(filteredProducts.sort((a, b) => a.product_price - b.product_price))
    } else if (content === 'desc') {
      setContent('asc');
      setFilteredProducts(filteredProducts.sort((a, b) => b.product_price - a.product_price))
    }
  }

  return (
    <div>
      <h1>Products</h1>
      <input
        type="text"
        placeholder="Search by product name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button onClick={handleSortAscDesc}>{content}</button>
      <ul>
        {filteredProducts.map((item, index) => {
          return (
            <div key={index}>
              <Link to={`/product/${item.id}`} onClick={() => handleClick(item.product_name)} key={index}>
                <div>
                  <img src={item.product_image} alt="Product Img"/>
                  <p>{item.product_name}</p>
                  <p>{item.product_price}</p>
                </div>
              </Link>
              <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
            </div>
          )
        })}
      </ul>
      {contextHolder}
    </div>
  );
}

export default Products;