import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { Routes, Route, Link } from "react-router-dom"
import Navbar from './components/includes/Navbar';
import Footer from './components/Footer';
import Car from './components/Car';
import {ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Agreement from './components/Agreement';
import Agreements from './components/Agreements';
import NotFound from './components/includes/NotFound';
import Register from './components/Register';
import AdminLogin from './components/AdminLogin';
import AdminAgreements from './components/AdminAgreements';
import AdminCars from './components/AdminCars';
import AdminAddCars from './components/AdminAddCars';
import AdminEditCar from './components/AdminEditCar';

function App() {
  return (
    <>
    
    <Navbar/>
   
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="car/:id" element={<Car />} />
         <Route path="login" element={<Login />} />
         <Route path="agreement/:id" element={<Agreement />} />
         <Route path="agreement" element={<Agreements />} />
        <Route path="register" element={<Register />} />
        <Route path="admin" element={<AdminAgreements />} />
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin/cars" element={<AdminCars />} />
        <Route path="admin/cars/add" element={<AdminAddCars />} />
        <Route path="admin/cars/edit/:id" element={<AdminEditCar />} />
        {/*<Route path="cart" element={<Cart />} />
        <Route path="orders" element={<Orders />} />
        <Route path="admin-products" element={<AdminProducts />} />
        <Route path="add-product" element={<AddProduct />} />
      <Route path="edit-product/:pid" element={<EditProduct />} />*/}
        <Route path="*" element={<NotFound/>} /> 
      </Routes>
      <ToastContainer />
<Footer/>
    </>
  );
}

export default App;
