import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const MENU = {
  ADMIN: [
    ["/admin/dashboard", "Dashboard"],
    ["/admin/shops", "Shops"],
    ["/admin/products", "Products"],
    ["/admin/users", "Users"]
  ],
  SUPERADMIN: [
    ["/superadmin/dashboard", "Dashboard"],
    ["/superadmin/create-admin", "Create Admin"],
    ["/superadmin/create-owner", "Create Owner"],
    ["/superadmin/shops", "Shops"],
    ["/superadmin/products", "Products"],
    ["/superadmin/users", "Users"]
  ]
};

export default function Sidebar() {
  const { user } = useAuth();
  if (user?.role === "USER") return null;

  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      {MENU[user.role]?.map(([to, label]) => (
        <NavLink key={to} to={to} className="block py-2">
          {label}
        </NavLink>
      ))}
    </aside>
  );
}
