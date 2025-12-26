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

  // 👇 Where to go after login
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
      
    login(res.data.user); // Update auth context
    // Redirect back to where user came from
    navigate(from, { replace: true });

  } catch (err) {
    setMessage("");
    toast.error(err.response?.data?.msg || "Login failed");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1c22] via-[#0f2027] to-[#13232a] p-4 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-6">
          <img src={import.meta.env.VITE_API_LOGO} alt="logo" className="w-14 mx-auto mb-2" />
          <h2 className="text-2xl font-bold text-white">
            {import.meta.env.VITE_API_COMPANY_NAME}
          </h2>
        </div>
        <div className="bg-[#0f1f26]/90 backdrop-blur-xl rounded-3xl shadow-[0_0_60px_rgba(0,200,255,0.15)] p-8">

          <h2 className="text-4xl font-bold mb-2 text-center text-white">
            Log in
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Welcome back
          </p>

          <div className="space-y-6">

            {/* Email */}
            <div className="relative">
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${isFocused.email ? "text-cyan-400" : "text-gray-500"}`}>
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused({ ...isFocused, email: true })}
                onBlur={() => setIsFocused({ ...isFocused, email: false })}
                className="w-full pl-12 pr-4 py-4 bg-[#132a33] border border-[#1f3a44] rounded-2xl focus:outline-none focus:border-cyan-400 text-gray-200 placeholder-gray-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${isFocused.password ? "text-cyan-400" : "text-gray-500"}`}>
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsFocused({ ...isFocused, password: true })}
                onBlur={() => setIsFocused({ ...isFocused, password: false })}
                className="w-full pl-12 pr-4 py-4 bg-[#132a33] border border-[#1f3a44] rounded-2xl focus:outline-none focus:border-cyan-400 text-gray-200 placeholder-gray-500"
              />
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-[#062028] py-4 rounded-2xl font-semibold flex items-center justify-center gap-2"
            >
              <span>Log in</span>
              <LogIn className="w-5 h-5" />
            </button>

            {/* Forgot Password */}
            <div className="text-center">
              <span
                onClick={() => navigate("/reset-password")}
                className="text-sm text-cyan-400 cursor-pointer hover:underline"
              >
                Forgot password?
              </span>
            </div>

            {/* Message */}
            {message && (
              <div className="text-center p-3 bg-[#132a33] rounded-xl text-cyan-400">
                {message}
              </div>
            )}
          </div>

          {/* Signup */}
          <p className="text-center text-gray-400 mt-6">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-cyan-400 font-semibold cursor-pointer hover:underline"
            >
              Create one
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}
