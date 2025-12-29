import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen pt-[80px] bg-[#0b1a20]">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="flex-1 ml-64 overflow-hidden">
        <main className="h-[calc(100vh-80px)] overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
