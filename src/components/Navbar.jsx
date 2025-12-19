import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();
  return (
    <div className="h-14 bg-white shadow px-6 flex justify-between items-center">
      <h1 className="font-bold">RBAC App</h1>
      <button onClick={logout} className="text-red-500">Logout</button>
    </div>
  );
}
