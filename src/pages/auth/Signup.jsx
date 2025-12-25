import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);

  const [loadingSignup, setLoadingSignup] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setOtpSent(false);
      setOtp("");
      setTimer(0);
    }
  };

  const signup = async () => {
    setLoadingSignup(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_AUTH_URL}/signup`,
        form
      );
      toast.success(res.data.msg || "OTP sent to email");
      setOtpSent(true);
      startTimer();
    } catch (err) {
      toast.error(err.response?.data?.msg || "Signup failed");
    } finally {
      setLoadingSignup(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) return toast.error("Enter 6-digit OTP");

    setLoadingOtp(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_AUTH_URL}/verify-otp`,
        { email: form.email, otp }
      );
      toast.success(res.data.msg || "Account created");
      navigate("/login", { state: { from } });
    } catch (err) {
      toast.error(err.response?.data?.msg || "OTP verification failed");
    } finally {
      setLoadingOtp(false);
    }
  };

  const resendOtp = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_AUTH_URL}/resend-otp`,
        { email: form.email }
      );
      toast.success("OTP resent");
      startTimer();
    } catch {
      toast.error("Failed to resend OTP");
    }
  };

  const startTimer = () => {
    setTimer(60);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1c22] via-[#0f2027] to-[#13232a] p-4 relative overflow-hidden">
      <Toaster position="top-right" />

      {/* Glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-[420px] bg-[#0f1f26]/90 backdrop-blur-xl p-8 rounded-3xl shadow-[0_0_60px_rgba(0,200,255,0.15)]">
        {/* LOGO */}
        <div className="text-center mb-6">
          <img src="/logo.png" alt="logo" className="w-14 mx-auto mb-2" />
          <h2 className="text-2xl font-bold text-white">
            YourCompany
          </h2>
          <p className="text-gray-400 text-sm">
            Create your account
          </p>
        </div>

        {/* SIGNUP FORM */}
        <div className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#132a33] border border-[#1f3a44] rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-400"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#132a33] border border-[#1f3a44] rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#132a33] border border-[#1f3a44] rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-400"
          />

          <input
            name="mobile"
            placeholder="Mobile (optional)"
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#132a33] border border-[#1f3a44] rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-400"
          />

          <button
            onClick={signup}
            disabled={loadingSignup}
            className="w-full bg-cyan-400 hover:bg-cyan-300 text-[#062028] py-3 rounded-xl font-semibold transition"
          >
            {loadingSignup ? "Sending OTP..." : "Signup"}
          </button>
        </div>

        {/* OTP SECTION */}
        {otpSent && (
          <div className="mt-6 border-t border-[#1f3a44] pt-4 space-y-4">
            <input
              maxLength="6"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 bg-[#132a33] border border-[#1f3a44] rounded-xl text-center tracking-widest text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />

            <button
              onClick={verifyOtp}
              disabled={loadingOtp}
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-[#062028] py-3 rounded-xl font-semibold transition"
            >
              {loadingOtp ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="text-center text-sm">
              {timer > 0 ? (
                <span className="text-gray-500">
                  Resend OTP in {timer}s
                </span>
              ) : (
                <button
                  onClick={resendOtp}
                  className="text-cyan-400 font-semibold"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </div>
        )}

        {/* LOGIN LINK */}
        <p className="text-center text-sm mt-6 text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login", { state: { from } })}
            className="text-cyan-400 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
