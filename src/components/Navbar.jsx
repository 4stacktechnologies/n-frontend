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
    `px-4 py-2 rounded-xl transition font-medium
     ${
       isActive
         ? "bg-pink-400 text-[#141428]"
         : "text-gray-300 hover:text-pink-400"
     }`;

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <header className="fixed top-0 left-0 w-full h-[80px] z-50">
      <div className="h-full backdrop-blur-xl bg-[#1b1b33]/85 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-3">
            {isDashboard && (
              <button
                onClick={onMenuClick}
                className="md:hidden text-pink-400"
              >
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
              <span className="text-xl font-bold text-white tracking-wide">
                {import.meta.env.VITE_API_COMPANY_NAME}
              </span>
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            <NavLink to="/products" className={navLinkClass}>Explore</NavLink>

            {!user ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-5 py-2 rounded-xl
                             bg-pink-400 text-[#141428]
                             font-semibold hover:bg-pink-300 transition"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="px-5 py-2 rounded-xl
                             border border-pink-400
                             text-pink-400
                             hover:bg-pink-400 hover:text-[#141428]
                             transition"
                >
                  Signup
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">

                {/* PROFILE */}
                <button onClick={() => navigate("/profile")}>
                  {user.avatar?.url ? (
                    <img
                      src={user.avatar.url}
                      alt="profile"
                      className="w-10 h-10 rounded-full object-cover
                                 border-2 border-pink-400"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full
                                    flex items-center justify-center
                                    bg-gradient-to-br
                                    from-pink-400 to-purple-500
                                    text-sm font-bold text-[#141428]">
                      {getInitials(user.name)}
                    </div>
                  )}
                </button>

                {/* DASHBOARD */}
                {isAdmin && (
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-2 px-5 py-2
                               rounded-xl bg-pink-400 text-[#141428]
                               font-semibold hover:bg-pink-300 transition"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </button>
                )}

                {/* LOGOUT */}
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-5 py-2
                             rounded-xl bg-red-500/90
                             text-white hover:bg-red-500 transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-300"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden absolute top-[80px] left-0 w-full
                          bg-[#1b1b33]/95 backdrop-blur-xl
                          border-t border-white/10
                          px-6 py-6 space-y-4">

            <NavLink to="/" onClick={() => setOpen(false)} className={navLinkClass}>Home</NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)} className={navLinkClass}>About</NavLink>
            <NavLink to="/contact" onClick={() => setOpen(false)} className={navLinkClass}>Contact</NavLink>
            <NavLink to="/products" onClick={() => setOpen(false)} className={navLinkClass}>Explore</NavLink> 
            {user && (
              <>
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full py-2 rounded-xl
                             border border-pink-400
                             text-pink-400 hover:bg-pink-400
                             hover:text-[#141428] transition"
                >
                  Profile
                </button>

                {isAdmin && (
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="w-full py-2 rounded-xl
                               bg-pink-400 text-[#141428]
                               font-semibold hover:bg-pink-300 transition"
                  >
                    Dashboard
                  </button>
                )}

                <button
                  onClick={logout}
                  className="w-full py-2 rounded-xl
                             bg-red-500/90 text-white"
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
