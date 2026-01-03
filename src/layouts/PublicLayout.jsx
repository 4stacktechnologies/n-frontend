import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <main className="pt-[80px] min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
