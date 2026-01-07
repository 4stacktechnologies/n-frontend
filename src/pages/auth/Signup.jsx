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
        { email: form.email, otp, purpose: "VERIFY_EMAIL" }
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
    <div
      className="
        relative min-h-screen flex items-center justify-center p-4
        bg-gradient-to-br from-[#141428] via-[#1b1b33] to-[#0f0f23]
        overflow-hidden
      "
    >
      <Toaster position="top-right" />

      {/* Glow blobs */}
      <div className="absolute -top-40 -right-40 w-[30rem] h-[30rem] bg-pink-500/20 blur-[160px]" />
      <div className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] bg-purple-600/20 blur-[180px]" />

      <div
        className="
          relative z-10 w-[420px]
          bg-white/5 backdrop-blur-xl
          border border-white/10
          p-8 rounded-3xl
          shadow-[0_0_50px_rgba(236,72,153,0.15)]
        "
      >
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
          <p className="text-gray-400 text-sm">
            Create your account
          </p>
        </div>

        {/* Signup Form */}
        <div className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="
              w-full px-4 py-3
              bg-black/40
              border border-white/10
              rounded-xl
              text-gray-200 placeholder-gray-500
              focus:outline-none
              focus:border-pink-400
              focus:ring-2 focus:ring-pink-400/40
              transition
            "
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="
              w-full px-4 py-3
              bg-black/40
              border border-white/10
              rounded-xl
              text-gray-200 placeholder-gray-500
              focus:outline-none
              focus:border-pink-400
              focus:ring-2 focus:ring-pink-400/40
              transition
            "
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="
              w-full px-4 py-3
              bg-black/40
              border border-white/10
              rounded-xl
              text-gray-200 placeholder-gray-500
              focus:outline-none
              focus:border-pink-400
              focus:ring-2 focus:ring-pink-400/40
              transition
            "
          />

          <input
            name="mobile"
            placeholder="Mobile (optional)"
            onChange={handleChange}
            className="
              w-full px-4 py-3
              bg-black/40
              border border-white/10
              rounded-xl
              text-gray-200 placeholder-gray-500
              focus:outline-none
              focus:border-pink-400
              focus:ring-2 focus:ring-pink-400/40
              transition
            "
          />

          <button
            onClick={signup}
            disabled={loadingSignup}
            className="
              w-full py-3 rounded-xl
              bg-gradient-to-r from-pink-400 to-purple-500
              hover:from-pink-300 hover:to-purple-400
              text-[#141428]
              font-semibold
              disabled:opacity-50
              hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]
              transition
            "
          >
            {loadingSignup ? "Sending OTP..." : "Signup"}
          </button>
        </div>

        {/* OTP Section */}
        {otpSent && (
          <div className="mt-6 border-t border-white/10 pt-4 space-y-4">
            <input
              maxLength="6"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="
                w-full px-4 py-3
                bg-black/40
                border border-white/10
                rounded-xl
                text-center tracking-widest
                text-gray-200 placeholder-gray-500
                focus:outline-none
                focus:border-pink-400
                focus:ring-2 focus:ring-pink-400/40
                transition
              "
            />

            <button
              onClick={verifyOtp}
              disabled={loadingOtp}
              className="
                w-full py-3 rounded-xl
                bg-gradient-to-r from-pink-400 to-purple-500
                hover:from-pink-300 hover:to-purple-400
                text-[#141428]
                font-semibold
                disabled:opacity-50
                hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]
                transition
              "
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
                  className="text-pink-400 font-semibold hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </div>
        )}

        {/* Login link */}
        <p className="text-center text-sm mt-6 text-gray-400">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login", { state: { from } })}
            className="text-pink-400 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
