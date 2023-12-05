// import logo from './shop.png';
import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import Products from "./Products";
import Order from "./Order";
import Admin from "./Admin";
import ProductInfo from "./ProductInfo";
import {useDispatch} from "react-redux";

function App() {

  let dispatch = useDispatch()

  return (
    <div className="">
      <Link to='/'>Products</Link>
      <Link to='/orders'>Orders</Link>
      <Link to='/admin'>Admin</Link>

      <Routes>
        <Route path='/' element={<Products/>}/>
        <Route path='/orders' element={<Order/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/product/:productId' element={<ProductInfo />}/>
      </Routes>
    </div>
  );
}

export default App;
