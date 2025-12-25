import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);

  /* =====================
     SEND OTP
  ===================== */
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoadingSend(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_AUTH_URL}/reset-password`,
        { email }
      );

      toast.success(res.data.msg || "OTP sent");
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Error sending OTP");
    hookup;
    } finally {
      setLoadingSend(false);
    }
  };

  /* =====================
     VERIFY OTP & RESET PASSWORD
  ===================== */
  const handleResetPassword = async () => {
    if (otp.length !== 6)
      return toast.error("Enter 6-digit OTP");

    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");

    if (password !== confirmPassword)
      return toast.error("Passwords do not match");

    setLoadingReset(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_AUTH_URL}/verify-otp`,
        {
          email,
          otp,
          purpose: "RESET_PASSWORD",
          newPassword: password,
        }
      );

      toast.success(res.data.msg || "Password updated");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Reset failed");
    } finally {
      setLoadingReset(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b1c22] via-[#0f2027] to-[#13232a] p-4 relative overflow-hidden">
      <Toaster position="top-right" />

      {/* Glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-[400px] bg-[#0f1f26]/90 backdrop-blur-xl p-8 rounded-3xl shadow-[0_0_60px_rgba(0,200,255,0.15)]">
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          Reset Password
        </h2>
        <p className="text-center text-gray-400 text-sm mb-6">
          Securely reset your password
        </p>

        {/* EMAIL */}
        <form onSubmit={handleSendOtp} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setOtpSent(false);
              setOtp("");
            }}
            required
            className="w-full px-4 py-3 bg-[#132a33] border border-[#1f3a44] rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-400"
          />

          <button
            disabled={loadingSend}
            className="w-full bg-cyan-400 hover:bg-cyan-300 text-[#062028] py-3 rounded-xl font-semibold transition"
          >
            {loadingSend ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>

        {/* OTP + PASSWORD */}
        {otpSent && (
          <div className="mt-6 space-y-4 border-t border-[#1f3a44] pt-4">
            <input
              maxLength="6"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 bg-[#132a33] border border-[#1f3a44] rounded-xl text-center tracking-widest text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />

            <input
              type="password"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#132a33] border border-[#1f3a44] rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#132a33] border border-[#1f3a44] rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-400"
            />

            <button
              onClick={handleResetPassword}
              disabled={loadingReset}
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-[#062028] py-3 rounded-xl font-semibold transition"
            >
              {loadingReset ? "Updating..." : "Reset Password"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
