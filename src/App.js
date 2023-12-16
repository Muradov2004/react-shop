import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import Products from "./Products";
import Order from "./Order";
import Admin from "./Admin";
import ProductInfo from "./ProductInfo";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";
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
