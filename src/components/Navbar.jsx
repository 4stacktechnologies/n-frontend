// components/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function Navbar({ isDashboard = false, onMenuClick }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isAdmin = user?.role === "ADMIN" || user?.role === "OWNER";

  const navLinkClass = ({ isActive }) =>
    `
      block w-full px-4 py-3 rounded-lg text-sm font-medium transition
      ${isActive ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"}
    `;

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-[76px] flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            {isDashboard && (
              <button onClick={onMenuClick} className="md:hidden text-gray-600">
                <Menu size={22} />
              </button>
            )}

            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-3 cursor-pointer"
            >
              <img src={import.meta.env.VITE_API_LOGO} alt="logo" className="w-8" />
              <span className="text-lg font-bold text-gray-900">
                {import.meta.env.VITE_API_COMPANY_NAME}
              </span>
            </div>
          </div>

          {/* ================= DESKTOP NAV ================= */}
          <div className="hidden md:flex items-center gap-4">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            <NavLink to="/products" className={navLinkClass}>Explore</NavLink>

            {!user ? (
              <div className="flex gap-3 ml-4">
                <button
                  onClick={() => navigate("/login")}
                  className="px-5 py-2 rounded-full bg-gray-900 text-white text-sm"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-5 py-2 rounded-full border text-sm"
                >
                  Signup
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-4">
                {/* PROFILE – NORMAL USER */}
                {!isAdmin && (
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-9 h-9 rounded-full border flex items-center justify-center overflow-hidden"
                  >
                    {user.avatar?.url ? (
                      <img
                        src={user.avatar.url}
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white text-xs font-semibold">
                        {getInitials(user.name)}
                      </div>
                    )}
                  </button>
                )}

                {/* DASHBOARD – SAME STYLE AS OTHERS */}
                {isAdmin && (
                  <NavLink to="/dashboard" className={navLinkClass}>
                    <div className="flex items-center gap-2">
                      <LayoutDashboard size={16} />
                      Dashboard
                    </div>
                  </NavLink>
                )}

                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-full border text-sm flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button onClick={() => setOpen(true)} className="md:hidden">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ================= MOBILE SIDEBAR ================= */}
      <div
        className={`fixed top-0 left-0 h-full w-[260px] bg-white z-50 transform transition-transform duration-300 md:hidden
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-[76px] px-5 flex items-center justify-between border-b">
          <span className="font-semibold">Menu</span>
          <button onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-2">
          <NavLink to="/" onClick={() => setOpen(false)} className={navLinkClass}>Home</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)} className={navLinkClass}>About</NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)} className={navLinkClass}>Contact</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)} className={navLinkClass}>Explore</NavLink>

          <div className="pt-4 mt-2 border-t flex flex-col gap-2">
            {!user ? (
              <>
                <button
                  onClick={() => { setOpen(false); navigate("/login"); }}
                  className="w-full py-3 rounded-lg bg-gray-900 text-white text-sm"
                >
                  Login
                </button>
                <button
                  onClick={() => { setOpen(false); navigate("/signup"); }}
                  className="w-full py-3 rounded-lg border text-sm"
                >
                  Signup
                </button>
              </>
            ) : (
              <>
                {!isAdmin && (
                  <button
                    onClick={() => { setOpen(false); navigate("/profile"); }}
                    className="w-full py-3 rounded-lg border text-sm flex items-center justify-center"
                  >
                    Profile
                  </button>
                )}

                {isAdmin && (
                  <NavLink
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className={navLinkClass}
                  >
                    Dashboard
                  </NavLink>
                )}

                <button
                  onClick={() => { setOpen(false); logout(); }}
                  className="w-full py-3 rounded-lg border text-sm"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
