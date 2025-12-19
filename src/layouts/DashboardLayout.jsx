import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
