// import logo from './shop.png';
import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import Products from "./Products";
import Order from "./Order";
import Admin from "./Admin";
import ProductInfo from "./ProductInfo";

function App() {
  return (
    <div className='App'>
      <div className="navbar">
        <Link to='/' activeClassName='active-link'>Products</Link>
        <Link to='/orders' activeClassName='active-link'>Orders</Link>
        <Link to='/admin' activeClassName='active-link'>Admin</Link>
      </div>

      <Routes>
        <Route path='/' element={<Products/>}/>
        <Route path='/orders' element={<Order/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/product/:productId' element={<ProductInfo/>}/>
      </Routes>
    </div>
  );
}

export default App;
