import { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../auth/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState({ email: false, password: false });
  const [message, setMessage] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Email and password required");
    }

    setMessage("🔄 Logging in...");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_AUTH_URL}/login`,
        { email, password },
        { withCredentials: true }
      );

      toast.success(res.data.msg || "Login successful");
      login(res.data.user);
      navigate(from, { replace: true });
    } catch (err) {
      setMessage("");
      toast.error(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-gray-50 overflow-hidden">
      {/* Optional subtle background blobs */}
      <div className="absolute -top-40 -right-40 w-[30rem] h-[30rem] bg-gray-200/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] bg-gray-200/20 rounded-full blur-[140px]" />

      <div className="relative z-10 w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-6">
          <img
            src={import.meta.env.VITE_API_LOGO}
            alt="logo"
            className="w-14 mx-auto mb-2 drop-shadow-sm"
          />
          <h2 className="text-2xl font-bold tracking-wide text-gray-800">
            {import.meta.env.VITE_API_COMPANY_NAME}
          </h2>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-gray-300 rounded-3xl p-8 shadow-md">
          <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-800">
            Log in
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Welcome back
          </p>

          <div className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition ${
                  isFocused.email ? "text-gray-800" : "text-gray-400"
                }`}
              >
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused({ ...isFocused, email: true })}
                onBlur={() => setIsFocused({ ...isFocused, email: false })}
                className="
                  w-full pl-12 pr-4 py-4
                  bg-white
                  border border-gray-300
                  rounded-2xl
                  text-gray-800 placeholder-gray-400
                  focus:outline-none
                  focus:border-gray-500
                  focus:ring-2 focus:ring-gray-200
                  transition
                "
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition ${
                  isFocused.password ? "text-gray-800" : "text-gray-400"
                }`}
              >
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsFocused({ ...isFocused, password: true })}
                onBlur={() => setIsFocused({ ...isFocused, password: false })}
                className="
                  w-full pl-12 pr-4 py-4
                  bg-white
                  border border-gray-300
                  rounded-2xl
                  text-gray-800 placeholder-gray-400
                  focus:outline-none
                  focus:border-gray-500
                  focus:ring-2 focus:ring-gray-200
                  transition
                "
              />
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="
                w-full py-4 rounded-2xl
                bg-gray-800 hover:bg-gray-700
                text-white
                font-semibold
                flex items-center justify-center gap-2
                shadow-sm hover:shadow-md
                transition
              "
            >
              <span>Log in</span>
              <LogIn className="w-5 h-5" />
            </button>

            {/* Forgot Password */}
            <div className="text-center">
              <span
                onClick={() => navigate("/reset-password")}
                className="text-gray-600 cursor-pointer hover:underline"
              >
                Forgot password?
              </span>
            </div>

            {/* Status Message */}
            {message && (
              <div className="text-center p-3 bg-gray-100 rounded-xl text-gray-800">
                {message}
              </div>
            )}
          </div>

          {/* Signup Prompt */}
          <p className="text-center text-gray-500 mt-6">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-gray-800 font-semibold cursor-pointer hover:underline"
            >
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
