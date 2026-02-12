import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const isAdmin = true; // abhi example ke liye

  if (!isAdmin) {
    return <Navigate to="/login" />;
  }

  return children; // 👈 YAHI MAIN CHEEZ HAI
};

export default AdminRoute;