import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import RoleGuard from "../auth/RoleGuard";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../pages/auth/Login";
import Products from "../pages/user/Products";
import Userproducts from "../pages/user/Userproducts";
import ProductDetails from "../pages/user/ProductDetails";
import Signup from "../pages/auth/Signup";
import Home from "../pages/Home";
import ResetPassword from "../pages/auth/ResetPassword";
import Navbar from "../components/Navbar";
import Profile from "../pages/Profile";
import Users from "../pages/user/Users";
import CreateUser from "../pages/user/CreateUser";
import CreateProduct from "../pages/user/CreateProduct";
import EditProduct from "../pages/user/EditProducts";

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
            <Userproducts />
          } />

          <Route path="/products/:id" element={
            <ProductDetails />
          } />

          {/* DASHBOARD */}
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
            {/* DEFAULT */}
            <Route index element={<Profile />} />

            {/* USERS */}
            <Route path="users" element={<Users />} />
            <Route path="users/create" element={<CreateUser />} />

            <Route path="products" element={<Products />} />
            <Route path="products/create" element={<CreateProduct />} />
             <Route path="products/edit/:id" element={<EditProduct />} />
          </Route>

        </Routes>
      </div>
    </>
  );
}
