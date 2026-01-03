import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b1a20]">
      {/* Dashboard Navbar */}
      <Navbar isDashboard onMenuClick={() => setOpen(true)} />

      {/* Sidebar */}
      <Sidebar open={open} onClose={() => setOpen(false)} />

      {/* Content */}
      <main className="pt-[80px] md:ml-64 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}
