import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../pages/admin/AdminSidebar";
import "./AdminLayout.css";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Overlay (mobile only) */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      {/* <div className="admin-content"> */}
        {/* Mobile toggle button */}
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(true)}
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        <Outlet />
      </div>
    // </div>
  );
};

export default AdminLayout;
