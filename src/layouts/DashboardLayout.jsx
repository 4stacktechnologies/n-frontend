import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Dashboard Navbar */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <Navbar isDashboard onMenuClick={() => setOpen(true)} />
      </div>

      {/* Sidebar */}
      <Sidebar open={open} onClose={() => setOpen(false)} />

      {/* Main Content */}
      <main
        className="
          pt-[88px]
          md:ml-64
          px-4 md:px-6
          pb-6
          transition-all
        "
      >
        {/* Content Wrapper */}
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
