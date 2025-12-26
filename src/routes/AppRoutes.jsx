import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import RoleGuard from "../auth/RoleGuard";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../pages/auth/Login";
import Products from "../pages/user/Products";
import ProductDetails from "../pages/user/ProductDetails";
import Signup from "../pages/auth/Signup";
import Home from "../pages/Home";
import ResetPassword from "../pages/auth/ResetPassword";
import Navbar from "../components/Navbar";

export default function AppRoutes() {
  return (
    <>
      <Navbar />
      <div className="pt-20">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />


          <Route path="/login" element={<Login />} />

          <Route path="/products" element={
            <ProtectedRoute><Products /></ProtectedRoute>
          } />

          <Route path="/products/:id" element={
            <ProtectedRoute><ProductDetails /></ProtectedRoute>
          } />

          <Route path="/admin/*" element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["ADMIN"]}>
                <DashboardLayout />
              </RoleGuard>
            </ProtectedRoute>
          } />

          <Route path="/superadmin/*" element={
            <ProtectedRoute>
              <RoleGuard allowedRoles={["SUPERADMIN"]}>
                <DashboardLayout />
              </RoleGuard>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </>
  );
}
