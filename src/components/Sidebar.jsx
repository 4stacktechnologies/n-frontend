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
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <aside
        className={`
          fixed top-[80px] left-0 z-50
          w-64 h-[calc(100vh-80px)]
          bg-gradient-to-b from-[#0a1922] via-[#0f1f26] to-[#0a1922]
          border-r border-cyan-400/10
          shadow-2xl shadow-cyan-500/5
          text-gray-300
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Mobile close */}
        <div className="md:hidden flex justify-end p-4">
          <button onClick={onClose} className="text-cyan-400">
            <X />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-6 space-y-2">
          <h2 className="text-xs font-semibold text-cyan-400/60 uppercase tracking-wider px-2 mb-4">
            Navigation
          </h2>

          {MENU[user.role]?.map(([to, label, Icon]) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${
                  isActive
                    ? "bg-cyan-400/20 text-cyan-400 shadow-lg"
                    : "hover:bg-white/5 hover:text-cyan-300"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-400 rounded-r-full" />
                  )}
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-6">
          <div className="p-4 rounded-xl bg-cyan-400/10 border border-cyan-400/20">
            <p className="text-xs text-cyan-400">
              Welcome, {user?.name || "Admin"}
            </p>
            <p className="text-[10px] text-gray-500">{user?.role}</p>
          </div>
        </div>
      </aside>
    </>
  );
}
