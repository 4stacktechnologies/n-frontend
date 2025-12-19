import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser(jwtDecode(token));
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser(decoded);

    if (decoded.role === "USER") navigate("/products");
    if (decoded.role === "ADMIN") navigate("/admin/dashboard");
    if (decoded.role === "SUPERADMIN") navigate("/superadmin/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
