import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { LayoutDashboard, Package, UsersIcon, CreativeCommons } from "lucide-react";

const MENU = {
  OWNER: [
    ["/dashboard", "Dashboard", LayoutDashboard],
    ["/dashboard/users", "Users", UsersIcon],
    ["/dashboard/products", "Products", Package],
    ["/dashboard/products/create", "Create Product", CreativeCommons],
  ],
};

export default function Sidebar() {
  const { user } = useAuth();
  if (!user || user.role === "USER") return null;

  return (
    <aside className="
      fixed top-[80px] left-0
      w-64 h-[calc(100vh-80px)]
      bg-gradient-to-b from-[#0a1922] via-[#0f1f26] to-[#0a1922]
      backdrop-blur-xl
      border-r border-cyan-400/10
      shadow-2xl shadow-cyan-500/5
      text-gray-300
      hidden md:flex flex-col
    ">
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30" />
      
      <nav className="p-6 space-y-2 mt-4">
        <div className="mb-6 px-4">
          <h2 className="text-xs font-semibold text-cyan-400/60 uppercase tracking-wider">
            Navigation
          </h2>
        </div>
        
        {MENU[user.role]?.map(([to, label, Icon]) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
              ${
                isActive
                  ? "bg-gradient-to-r from-cyan-400/20 to-cyan-500/10 text-cyan-400 shadow-lg shadow-cyan-500/20"
                  : "hover:bg-white/5 hover:text-cyan-300 hover:translate-x-1"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-400 rounded-r-full shadow-lg shadow-cyan-400/50" />
                )}
                
                {/* Icon */}
                <Icon 
                  className={`w-5 h-5 transition-all duration-300 ${
                    isActive ? "text-cyan-400" : "text-gray-400 group-hover:text-cyan-300"
                  }`}
                />
                
                {/* Label */}
                <span className={`font-medium transition-all duration-300 ${
                  isActive ? "text-cyan-400" : ""
                }`}>
                  {label}
                </span>
                
                {/* Hover glow effect */}
                {!isActive && (
                  <div className="absolute inset-0 rounded-xl bg-cyan-400/0 group-hover:bg-cyan-400/5 transition-all duration-300" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      
      {/* Bottom decoration */}
      <div className="mt-auto p-6">
        <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-400/10 to-transparent border border-cyan-400/20">
          <p className="text-xs text-cyan-400/70 font-medium">
            Welcome back, {user?.name || 'Admin'}
          </p>
          <p className="text-[10px] text-gray-500 mt-1">
            {user?.role} Dashboard
          </p>
        </div>
      </div>
    </aside>
  );
}