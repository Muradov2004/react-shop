import './styles/App.css';
import {Link, Route, Routes} from "react-router-dom";
import Products from "./components/Product/Products";
import Order from "./components/Order/Order";
import Admin from "./components/Admin/Admin";
import ProductInfo from "./components/Product/ProductInfo";
import AdminProducts from "./components/Admin/AdminProducts";
import AdminOrders from "./components/Admin/AdminOrders";
import {useState} from "react";

function App() {
  const [isLinkClicked, setIsLinkClicked] = useState(false);

  const handleLinkClick = () => {
    setIsLinkClicked(false);
  };

  return (
    <div className='App'>
      <div className="navbar">
        <Link to='/' onClick={handleLinkClick}>Products</Link>
        <Link to='/orders' onClick={handleLinkClick}>Orders</Link>
        <Link to='/admin' onClick={handleLinkClick}>Admin</Link>
      </div>

      <Routes>
        <Route path='/' element={<Products/>}/>
        <Route path='/orders' element={<Order/>}/>
        <Route path='/admin' element={<Admin isLinkClicked={isLinkClicked} setIsLinkClicked={setIsLinkClicked}/>}>
          <Route path='products' element={<AdminProducts/>}/>
          <Route path='orders' element={<AdminOrders/>}/>
        </Route>
        <Route path='/product/:productId' element={<ProductInfo/>}/>
      </Routes>
    </div>
  );
}

export default App;
