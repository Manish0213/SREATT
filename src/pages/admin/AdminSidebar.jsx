import React from "react";
import "./AdminSidebar.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminSidebar = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };


  return (
    <aside className={`admin-sidebar ${open ? "open" : ""}`}>

      {/* Close button (mobile) */}
      <button className="sidebar-close" onClick={onClose}>
        <i className="fa-solid fa-xmark"></i>
      </button>

      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon"><i class="fa-brands fa-black-tie"></i></div>
        <div>
          <h3>Admin Panel</h3>
          <p>Inventory Management</p>
        </div>
      </div>

      {/* Menu */}
      <ul className="sidebar-menu">
        {/* <li>
          <NavLink to="/admin/products" onClick={onClose} className={({ isActive }) => isActive ? "active" : ""}>
            <i className="fa-solid fa-box"></i>
            <span>Products</span>
          </NavLink>
        </li> */}
        <li>
          <NavLink to="/admin/create-product" onClick={onClose} className={({ isActive }) => isActive ? "active" : ""}>
            <i className="fa-solid fa-box-open"></i>
            <span>Create Product</span>
          </NavLink>
        </li>
        <li className="">
          <NavLink to="/admin/inventory" onClick={onClose} className={({ isActive }) => isActive ? "active" : ""}>
            <i className="fa-solid fa-warehouse"></i>
            <span>Inventory</span>
          </NavLink>
        </li>
        <li className="">
          <NavLink to="/admin/dealermanagement" onClick={onClose} className={({ isActive }) => isActive ? "active" : ""}>
            <i class="fa-solid fa-users"></i>
            <span>Manage Dealer</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/warrantymanagement" onClick={onClose} className={({ isActive }) => isActive ? "active" : ""}>
            <i class="fa-solid fa-shield"></i>
            <span>Manage Warranty</span>
          </NavLink>
        </li>
        {/* <li>
          <i className="fa-solid fa-users"></i>
          <span>Customers</span>
        </li> */}
        {/* <li>
          <i className="fa-solid fa-chart-line"></i>
          <span>Reports</span>
        </li> */}
        <li onClick={handleLogout}>
          <i class="fa-solid fa-power-off"></i>
          <span>Logout</span>
        </li>
      </ul>

      {/* Bottom */}
      <div className="sidebar-bottom">
        <div className="settings">
          <i className="fa-solid fa-gear"></i>
          <span>Settings</span>
        </div>

        <div className="profile">
          <img
            src="https://i.pravatar.cc/40"
            alt="user"
          />
          <div>
            <h4>Alex Rivera</h4>
            <p>Manager</p>
          </div>
        </div>
      </div>

    </aside>
  );
};

export default AdminSidebar;