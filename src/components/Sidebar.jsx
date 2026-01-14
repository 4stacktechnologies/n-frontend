// components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import {
  LayoutDashboard,
  Package,
  UsersIcon,
  CreativeCommons,
  X,
} from "lucide-react";

const MENU = {
  OWNER: [
    ["/dashboard", "Dashboard", LayoutDashboard],
    ["/dashboard/users", "Users", UsersIcon],
    ["/dashboard/products", "Products", Package],
    ["/dashboard/products/create", "Create Product", CreativeCommons],
  ],
};

export default function Sidebar({ open, onClose }) {
  const { user } = useAuth();
  if (!user || user.role === "USER") return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 md:hidden
          bg-black/50
          transition-opacity duration-300
          ${open ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      <aside
        className={`
          fixed top-[80px] left-0 z-50
          w-60 h-[calc(100vh-80px)]
          bg-white/95
          backdrop-blur-sm
          border-r border-gray-200
          shadow-md
          text-gray-700
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={onClose}
            className="
              p-2 rounded-full
              bg-gray-100 text-gray-600
              hover:bg-gray-200
              transition
            "
          >
            <X />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-6 space-y-2">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Navigation
          </h2>

          {MENU[user.role]?.map(([to, label, Icon]) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `
                  group relative flex items-center gap-3
                  px-4 py-3 rounded-lg
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-gray-200 text-gray-900 font-medium"
                      : "hover:bg-gray-100 hover:text-gray-800"
                  }
                `
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div
                      className="
                        absolute left-0 top-1/2 -translate-y-1/2
                        w-1.5 h-6
                        bg-pink-400
                        rounded-r
                      "
                    />
                  )}
                  <Icon className="w-5 h-5 text-gray-600 transition-colors" />
                  <span className="font-medium">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-6">
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
            <p className="text-sm text-gray-600">
              Welcome,{" "}
              <span className="text-gray-900 font-medium">
                {user?.name || "Admin"}
              </span>
            </p>
            <p className="text-xs text-gray-500 mt-1">{user?.role}</p>
          </div>
        </div>
      </aside>
    </>
  );
}
