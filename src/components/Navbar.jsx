// components/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function Navbar({ isDashboard = false, onMenuClick }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isAdmin = user?.role === "ADMIN" || user?.role === "OWNER";

  const navLinkClass = ({ isActive }) =>
    `
      px-4 py-2 rounded-full text-sm font-medium transition
      ${
        isActive
          ? "bg-gray-900 text-white"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
      }
    `;

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-[76px] flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          {isDashboard && (
            <button
              onClick={onMenuClick}
              className="md:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu size={22} />
            </button>
          )}

          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src={import.meta.env.VITE_API_LOGO}
              alt="logo"
              className="w-8"
            />
            <span className="text-lg font-bold tracking-tight text-gray-900">
              {import.meta.env.VITE_API_COMPANY_NAME}
            </span>
          </div>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
          <NavLink to="/products" className={navLinkClass}>Explore</NavLink>

          {!user ? (
            <div className="flex items-center gap-3 ml-4">
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="px-5 py-2 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 transition"
              >
                Signup
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4 ml-4">

              {/* PROFILE */}
              <button onClick={() => navigate("/profile")}>
                {user.avatar?.url ? (
                  <img
                    src={user.avatar.url}
                    alt="profile"
                    className="w-9 h-9 rounded-full object-cover border border-gray-300"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-900 text-white text-xs font-semibold">
                    {getInitials(user.name)}
                  </div>
                )}
              </button>

              {/* DASHBOARD */}
              {isAdmin && (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </button>
              )}

              {/* LOGOUT */}
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-100 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-600 hover:text-gray-900"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-6 space-y-4">
          <NavLink to="/" onClick={() => setOpen(false)} className={navLinkClass}>Home</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)} className={navLinkClass}>About</NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)} className={navLinkClass}>Contact</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)} className={navLinkClass}>Explore</NavLink>

          {!user ? (
            <div className="space-y-3 pt-4">
              <button
                onClick={() => navigate("/login")}
                className="w-full py-2 rounded-full bg-gray-900 text-white text-sm"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="w-full py-2 rounded-full border border-gray-300 text-gray-700 text-sm"
              >
                Signup
              </button>
            </div>
          ) : (
            <div className="space-y-3 pt-4">
              <button
                onClick={() => navigate("/profile")}
                className="w-full py-2 rounded-full border border-gray-300 text-gray-700"
              >
                Profile
              </button>

              {isAdmin && (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full py-2 rounded-full bg-gray-900 text-white"
                >
                  Dashboard
                </button>
              )}

              <button
                onClick={logout}
                className="w-full py-2 rounded-full border border-gray-300 text-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
