import { useState } from 'react'
import './App.css'
import { Home } from './pages/Home'
import RegisterWarranty from './pages/RegisterWarranty'
import ViewWarranty from './pages/ViewWarranty'
import DistributerWarranty from './pages/DistributerWarranty'
import ContactUs from './pages/ContactUs'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import About from './pages/About'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'

function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/register-warranty' element={<RegisterWarranty/>} />
      <Route path='/view-warranty' element={<ViewWarranty/>} />
      <Route path='/distributer-warranty' element={<DistributerWarranty/>} />
      <Route path='/contact-us' element={<ContactUs/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/sign-up' element={<SignUp/>} />
      <Route path='/about' element={<About />} />
      <Route path='/product' element={<Products />} />
      {/* <Route path='/product-detail' element={<ProductDetail />} /> */}
      <Route path="/product/:id" element={<ProductDetail />} />
    </Routes>
    <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
      