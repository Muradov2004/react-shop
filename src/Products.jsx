import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getFetchProducts} from "./store/fetchs";
import {Link} from "react-router-dom";

let Products = () => {
  let [filteredProducts, setFilteredProducts] = useState([]);
  let products = useSelector((state) => state.products.productsArray)
  let dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getFetchProducts());
      console.log(products);
      sortArray(localStorage.getItem("male"), localStorage.getItem("female"));
    };

    fetchData();  }, [dispatch]);

  let sortArray = (man, female) => {
    let newArr = [...products];
    newArr.sort((a, b) => {
      if (man < female) {
        if (a.product_name.includes("Qadın") && !b.product_name.includes("Qadın")) {
          return 1;
        } else if (!a.product_name.includes("Qadın") && b.product_name.includes("Qadın")) {
          return -1;
        }
        if (a.product_name.includes("Kişi") && !b.product_name.includes("Kişi")) {
          return 1;
        } else if (!a.product_name.includes("Kişi") && b.product_name.includes("Kişi")) {
          return -1;
        }
      } else if (man > female) {
        if (a.product_name.includes("Qadın") && !b.product_name.includes("Qadın")) {
          return -1;
        } else if (!a.product_name.includes("Qadın") && b.product_name.includes("Qadın")) {
          return 1;
        }
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

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {filteredProducts.map((item, index) => {
          return (
            <Link to={`/product/${item.id}`} onClick={() => handleClick(item.product_name)} key={index}>
              <div key={index}>
                <img src={item.product_image} alt="Product Img"/>
                <p>{item.product_name}</p>
                <p>{item.product_price}</p>
              </div>
            </Link>
          )
        })}
      </ul>
    </div>
  );
}

export default Products;