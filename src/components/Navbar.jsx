import { NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LogOut,
  User,
  LayoutDashboard
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-xl transition font-medium
     ${
       isActive
         ? "bg-cyan-400 text-[#062028]"
         : "text-gray-300 hover:text-cyan-400"
     }`;

  const isAdmin =
    user?.role === "ADMIN" || user?.role === "OWNER";

  return (
    <nav className="fixed top-0 left-0 w-full h-[80px] z-50">
      <div className="
        h-full
        backdrop-blur-xl bg-[#0f1f26]/90
        border-b border-[#1f3a44]
        shadow-[0_0_40px_rgba(0,200,255,0.08)]
      ">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

          {/* LOGO */}
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

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>

            {!user ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="ml-4 px-5 py-2 rounded-xl bg-cyan-400 text-[#062028] font-semibold hover:bg-cyan-300"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="px-5 py-2 rounded-xl border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-[#062028]"
                >
                  Signup
                </button>
              </>
            ) : (
              <>
                {isAdmin ? (
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-400 text-[#062028] font-semibold"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/profile")}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-[#062028]"
                  >
                    <User size={18} />
                    Profile
                  </button>
                )}

                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-red-500 text-white hover:bg-red-400"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
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
          <div className="
            md:hidden
            absolute top-[80px] left-0 w-full
            bg-[#0f1f26]/95 backdrop-blur-xl
            border-t border-[#1f3a44]
            px-6 py-6 space-y-4
          ">
            <NavLink onClick={() => setOpen(false)} to="/" className={navLinkClass}>Home</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/about" className={navLinkClass}>About</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/contact" className={navLinkClass}>Contact</NavLink>

            {!user ? (
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => navigate("/login")}
                  className="flex-1 py-2 rounded-xl bg-cyan-400 text-[#062028] font-semibold"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="flex-1 py-2 rounded-xl border border-cyan-400 text-cyan-400"
                >
                  Signup
                </button>
              </div>
            ) : (
              <div className="space-y-3 pt-4">
                {isAdmin ? (
                  <button
                    onClick={() => navigate("/admin/dashboard")}
                    className="w-full py-2 rounded-xl bg-cyan-400 text-[#062028] font-semibold"
                  >
                    Dashboard
                  </button>
                ) : (
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full py-2 rounded-xl border border-cyan-400 text-cyan-400"
                  >
                    Profile
                  </button>
                )}

                <button
                  onClick={logout}
                  className="w-full py-2 rounded-xl bg-red-500 text-white"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
