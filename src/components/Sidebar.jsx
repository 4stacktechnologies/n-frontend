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
          bg-black/70 backdrop-blur-sm
          transition-opacity duration-300
          ${open ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      <aside
        className={`
          fixed top-[80px] left-0 z-50
          w-64 h-[calc(100vh-80px)]
          bg-gradient-to-b
          from-[#0b0b1a]
          via-[#141428]
          to-[#0b0b1a]
          backdrop-blur-xl
          border-r border-white/10
          shadow-[8px_0_40px_rgba(0,0,0,0.6)]
          text-gray-300
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Mobile close */}
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={onClose}
            className="
              p-2 rounded-full
              bg-white/5
              text-pink-400
              hover:bg-pink-400 hover:text-[#141428]
              transition
            "
          >
            <X />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-6 space-y-2">
          <h2 className="text-xs font-semibold text-pink-400/60 uppercase tracking-wider px-2 mb-4">
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
                  px-4 py-3 rounded-xl
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-pink-400/20 text-pink-400 shadow-[0_0_18px_rgba(236,72,153,0.4)]"
                      : "hover:bg-white/5 hover:text-pink-300"
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
                        w-1 h-8
                        bg-pink-400
                        rounded-r-full
                        shadow-[0_0_12px_rgba(236,72,153,0.8)]
                      "
                    />
                  )}
                  <Icon className="w-5 h-5 transition-colors" />
                  <span className="font-medium">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-6">
          <div
            className="
              p-4 rounded-xl
              bg-white/5 backdrop-blur-xl
              border border-white/10
            "
          >
            <p className="text-xs text-gray-400">
              Welcome,{" "}
              <span className="text-white font-medium">
                {user?.name || "Admin"}
              </span>
            </p>
            <p className="text-[10px] text-gray-500 mt-1">
              {user?.role}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
