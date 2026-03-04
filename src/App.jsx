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
import DealerManagement from './pages/admin/DealerManagement';
import WarrantyManagement from './pages/admin/WarrantyManagement';
import EditProduct from './pages/admin/EditProduct';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './pages/roleroutes/ProtectedRoute';
import AdminProductDetail from './pages/admin/AdminProductDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
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
          <Route path="/product/:serialno" element={<ProductDetail />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>

        {/* USER Protected Routes */}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          {/* <Route path="register-warranty" element={<RegisterWarranty />} /> */}
          {/* <Route path="view-warranty" element={<ViewWarranty />} /> */}
        </Route>

        {/* 👇 ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            // <AdminRoute>
            //   <AdminLayout />
            // </AdminRoute>
            <ProtectedRoute allowedRole="ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* <Route index element={<AdminDashboard />} /> */}
          <Route index element={<Inventory />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="dealermanagement" element={<DealerManagement />} />
          <Route path="warrantymanagement" element={<WarrantyManagement />} />
          <Route path="edit-product/:serialNo" element={<EditProduct />} />
          <Route path="product-details/:serialno" element={<AdminProductDetail />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;