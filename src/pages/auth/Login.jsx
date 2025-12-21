import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // 👇 THIS IS THE MAGIC
  const from = location.state?.from || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_AUTH_URL}/login`,
        { email, password }
      );

      toast.success("Login successful");
      localStorage.setItem("token", res.data.token);

      // ✅ Redirect to ORIGINAL page
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="input"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="input"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn-primary">Login</button>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() =>
              navigate("/signup", { state: { from } })
            }
            className="text-indigo-600 cursor-pointer"
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}
