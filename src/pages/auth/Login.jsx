import { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState({ email: false, password: false });
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("🔄 Logging in...");

    setTimeout(() => {
      setMessage("✅ Login successful! Redirecting...");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1c22] via-[#0f2027] to-[#13232a] p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-[#0f1f26]/90 backdrop-blur-xl rounded-3xl shadow-[0_0_60px_rgba(0,200,255,0.15)] p-8">
          
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAADICAYAAADGFbfiAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSogMAB"
              alt="FourStack Technologies"
              className="h-20 w-auto object-contain"
            />
          </div>

          {/* Title */}
          <h2 className="text-4xl font-bold mb-2 text-center text-white">
            Log in
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Welcome back
          </p>

          <div className="space-y-6">
            {/* Email */}
            <div className="relative">
              <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                  isFocused.email ? "text-cyan-400" : "text-gray-500"
                }`}
              >
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                placeholder="Email or username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused({ ...isFocused, email: true })}
                onBlur={() => setIsFocused({ ...isFocused, email: false })}
                className="w-full pl-12 pr-4 py-4 bg-[#132a33] border border-[#1f3a44] rounded-2xl focus:outline-none focus:border-cyan-400 text-gray-200 placeholder-gray-500 transition"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div
                className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                  isFocused.password ? "text-cyan-400" : "text-gray-500"
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
                className="w-full pl-12 pr-4 py-4 bg-[#132a33] border border-[#1f3a44] rounded-2xl focus:outline-none focus:border-cyan-400 text-gray-200 placeholder-gray-500 transition"
                required
              />
            </div>

            {/* Button */}
            <button
              onClick={handleLogin}
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-[#062028] py-4 rounded-2xl font-semibold shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Log in</span>
              <LogIn className="w-5 h-5" />
            </button>

            {/* Forgot */}
            <div className="text-center">
              <span
                onClick={() => setMessage("🔑 Redirecting to reset password...")}
                className="text-sm text-cyan-400 cursor-pointer hover:underline"
              >
                Forgot password?
              </span>
            </div>

            {/* Message */}
            {message && (
              <div className="text-center p-3 bg-[#132a33] rounded-xl text-cyan-400 font-medium">
                {message}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#1f3a44]"></div>
            <span className="text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-[#1f3a44]"></div>
          </div>

          {/* Signup */}
          <p className="text-center text-gray-400">
            Don’t have an account?{" "}
            <span
              onClick={() => setMessage("📝 Redirecting to signup...")}
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
