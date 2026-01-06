// components/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LogOut,
  User,
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function Navbar({ isDashboard = false, onMenuClick }) {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isAdmin = user?.role === "ADMIN" || user?.role === "OWNER";

  /* =========================
     INITIALS
  ========================= */
  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "U";
    const parts = name.trim().split(" ").filter(Boolean);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (
      parts[0][0] + parts[parts.length - 1][0]
    ).toUpperCase();
  };

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-xl transition font-medium
     ${
       isActive
         ? "bg-cyan-400 text-[#062028]"
         : "text-gray-300 hover:text-cyan-400"
     }`;

  return (
    <header className="fixed top-0 left-0 w-full h-[80px] z-50">
      <div className="h-full backdrop-blur-xl bg-[#0f1f26]/90 border-b border-[#1f3a44]">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            {isDashboard && (
              <button onClick={onMenuClick} className="md:hidden text-cyan-400">
                <Menu size={26} />
              </button>
            )}

            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img
                src={import.meta.env.VITE_API_LOGO}
                alt="logo"
                className="w-8"
              />
              <span className="text-xl font-bold text-white">
                {import.meta.env.VITE_API_COMPANY_NAME}
              </span>
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>

            {!user ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-5 py-2 rounded-xl bg-cyan-400 text-[#062028] font-semibold"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-5 py-2 rounded-xl border border-cyan-400 text-cyan-400"
                >
                  Signup
                </button>
              </>
            ) : (
              <div className="relative">
                {/* AVATAR */}
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2"
                >
                  {user.avatar?.url ? (
                    <img
                      src={user.avatar.url}
                      alt="profile"
                      className="w-10 h-10 rounded-full object-cover border-2 border-cyan-400"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full flex items-center justify-center 
                                    bg-gradient-to-br from-cyan-500 to-blue-500 
                                    text-sm font-bold text-[#062028]">
                      {getInitials(user.name)}
                    </div>
                  )}
                </button>

                {/* DROPDOWN */}
                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-[#020617] border border-white/10 rounded-xl shadow-xl overflow-hidden">
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setProfileOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left text-gray-300 hover:bg-[#0f1f26] flex items-center gap-2"
                    >
                      <User size={16} /> Profile
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => {
                          navigate("/dashboard");
                          setProfileOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left text-gray-300 hover:bg-[#0f1f26] flex items-center gap-2"
                      >
                        <LayoutDashboard size={16} /> Dashboard
                      </button>
                    )}

                    <button
                      onClick={logout}
                      className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-300"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden absolute top-[80px] left-0 w-full bg-[#0f1f26]/95 border-t border-[#1f3a44] px-6 py-6 space-y-4">
            <NavLink to="/" onClick={() => setOpen(false)} className={navLinkClass}>Home</NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)} className={navLinkClass}>About</NavLink>
            <NavLink to="/contact" onClick={() => setOpen(false)} className={navLinkClass}>Contact</NavLink>

            {user && (
              <>
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full py-2 rounded-xl border border-cyan-400 text-cyan-400"
                >
                  Profile
                </button>

                {isAdmin && (
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="w-full py-2 rounded-xl bg-cyan-400 text-[#062028] font-semibold"
                  >
                    Dashboard
                  </button>
                )}

                <button
                  onClick={logout}
                  className="w-full py-2 rounded-xl bg-red-500 text-white"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
