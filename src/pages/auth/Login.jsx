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
    <div
      className="
        relative min-h-screen flex items-center justify-center p-4
        bg-gradient-to-br from-[#0b0b1a] via-[#141428] to-[#05050f]
        overflow-hidden
      "
    >
      {/* Glow blobs */}
      <div className="absolute -top-40 -right-40 w-[30rem] h-[30rem] bg-pink-500/20 blur-[160px]" />
      <div className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] bg-purple-600/20 blur-[180px]" />

      <div className="relative z-10 w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-6">
          <img
            src={import.meta.env.VITE_API_LOGO}
            alt="logo"
            className="w-14 mx-auto mb-2 drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]"
          />
          <h2 className="text-2xl font-bold tracking-wide text-white">
            {import.meta.env.VITE_API_COMPANY_NAME}
          </h2>
        </div>

        {/* Card */}
        <div
          className="
            bg-white/5 backdrop-blur-xl
            border border-white/10
            rounded-3xl
            p-8
            shadow-[0_0_50px_rgba(236,72,153,0.15)]
          "
        >
          <h2 className="text-4xl font-extrabold mb-2 text-center text-white">
            Log in
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Welcome back
          </p>

          <div className="space-y-6">
            {/* Email */}
            <div className="relative">
              <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition ${
                  isFocused.email ? "text-pink-400" : "text-gray-500"
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
                  bg-black/40
                  border border-white/10
                  rounded-2xl
                  text-gray-200 placeholder-gray-500
                  focus:outline-none
                  focus:border-pink-400
                  focus:ring-2 focus:ring-pink-400/40
                  transition
                "
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition ${
                  isFocused.password ? "text-pink-400" : "text-gray-500"
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
                  bg-black/40
                  border border-white/10
                  rounded-2xl
                  text-gray-200 placeholder-gray-500
                  focus:outline-none
                  focus:border-pink-400
                  focus:ring-2 focus:ring-pink-400/40
                  transition
                "
              />
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="
                w-full py-4 rounded-2xl
                bg-gradient-to-r from-pink-400 to-purple-500
                hover:from-pink-300 hover:to-purple-400
                text-[#141428]
                font-semibold
                flex items-center justify-center gap-2
                hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]
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
                className="text-sm text-pink-400 cursor-pointer hover:underline"
              >
                Forgot password?
              </span>
            </div>

            {/* Status Message */}
            {message && (
              <div
                className="
                  text-center p-3
                  bg-white/5 backdrop-blur
                  rounded-xl
                  text-pink-400
                "
              >
                {message}
              </div>
            )}
          </div>

          {/* Signup */}
          <p className="text-center text-gray-400 mt-6">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-pink-400 font-semibold cursor-pointer hover:underline"
            >
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
