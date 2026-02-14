import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import AdminRoute from './routes/AdminRoute';

import Home from './pages/Home';
import RegisterWarranty from './pages/RegisterWarranty';
import ViewWarranty from './pages/ViewWarranty';
import DistributerWarranty from './pages/DistributerWarranty';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';

import AdminDashboard from './pages/admin/AdminDashboard';
import CreateProduct from './pages/admin/CreateProduct';
import Inventory from './pages/admin/Inventory';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 👇 USER ROUTES */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register-warranty" element={<RegisterWarranty />} />
          <Route path="/view-warranty" element={<ViewWarranty />} />
          <Route path="/distributer-warranty" element={<DistributerWarranty />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Route>

        {/* 👇 ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="inventory" element={<Inventory />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;