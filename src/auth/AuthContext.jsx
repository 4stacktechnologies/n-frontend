import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* =========================
     LOAD USER FROM COOKIE
  ========================= */
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_AUTH_URL}/me`,
          { withCredentials: true }
        );
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  /* =========================
     LOGIN (AFTER API SUCCESS)
  ========================= */
  const login = (userData) => {
    setUser(userData);

    if (userData.role === "USER") navigate("/products");
    if (userData.role === "ADMIN") navigate("/admin/dashboard");
    if (userData.role === "OWNER" || userData.role === "SUPERADMIN")
      navigate("/superadmin/dashboard");
  };

  /* =========================
     LOGOUT
  ========================= */
  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_AUTH_URL}/logout`,
        {},
        { withCredentials: true }
      );
    } finally {
      setUser(null);
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
