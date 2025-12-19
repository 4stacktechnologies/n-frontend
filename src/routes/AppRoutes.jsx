import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import RoleGuard from "../auth/RoleGuard";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../pages/auth/Login";
import Products from "../pages/user/Products";
import ProductDetails from "../pages/user/ProductDetails";
import VerifyOtp from "../pages/VerifyOtp";
import Signup from "../pages/auth/Login";
import Home from "../pages/Home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
              <Route path="/verify-otp" element={<VerifyOtp />} />

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
  );
}
