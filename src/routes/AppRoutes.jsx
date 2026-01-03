import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import RoleGuard from "../auth/RoleGuard";
import DashboardLayout from "../layouts/DashboardLayout";
import PublicLayout from "../layouts/PublicLayout";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ResetPassword from "../pages/auth/ResetPassword";
import Home from "../pages/Home";
import Userproducts from "../pages/user/Userproducts";
import ProductDetails from "../pages/user/ProductDetails";
import Profile from "../pages/Profile";
import CreateProduct from "../pages/user/CreateProduct";
import EditProduct from "../pages/user/EditProducts";
import NotFound from "../pages/NotFound";
import Products from "../pages/user/Products";
import CreateUser from "../pages/user/CreateUser";

export default function AppRoutes() {
  return (
    <Routes>
      {/* 🌐 PUBLIC ROUTES */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/products" element={<Userproducts />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Route>

      {/* 🔐 DASHBOARD ROUTES */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <RoleGuard allowedRoles={["ADMIN", "OWNER"]}>
              <DashboardLayout />
            </RoleGuard>
          </ProtectedRoute>
        }
      >
        <Route index element={<Profile />} />
        {/* <Route path="users" element={<Users />} /> */}
        <Route path="users/create" element={<CreateUser />} />

        <Route path="products" element={<Products />} />
        <Route path="products/create" element={<CreateProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
      </Route>

      {/* ❌ 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
