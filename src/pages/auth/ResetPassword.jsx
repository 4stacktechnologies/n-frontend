import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
  const navigate = useNavigate();

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
    } finally {
      setLoadingSend(false);
    }
  };

  /* =====================
     VERIFY OTP & RESET PASSWORD
  ===================== */
  const handleResetPassword = async () => {
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

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Reset failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#141428] via-[#1b1b33] to-[#0f0f23] p-4 overflow-hidden">
      <Toaster position="top-right" />

      {/* Glow blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-500/20 blur-[160px]" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 blur-[180px]" />

      {/* Branding */}
      <div className="absolute top-10 text-center z-10">
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
      <div className="relative z-10 w-[400px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(236,72,153,0.15)]">
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
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/40 transition"
          />

          <button
            disabled={loadingSend || otpSent}
            className={`w-full py-3 rounded-xl font-semibold transition ${
              otpSent
                ? "bg-white/10 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-300 hover:to-purple-400 text-[#141428] hover:shadow-[0_0_25px_rgba(236,72,153,0.6)]"
            }`}
          >
            {otpSent
              ? "OTP Sent"
              : loadingSend
              ? "Sending OTP..."
              : "Send OTP"}
          </button>
        </form>

        {/* OTP + PASSWORD */}
        {otpSent && (
          <div className="mt-6 space-y-4 border-t border-white/10 pt-4">
            <input
              maxLength="6"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-center tracking-widest text-gray-200 placeholder-gray-500 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/40 transition"
            />

            <input
              type="password"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/40 transition"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/40 transition"
            />

            <button
              onClick={handleResetPassword}
              disabled={loadingReset}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-300 hover:to-purple-400 text-[#141428] font-semibold disabled:opacity-50 hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] transition"
            >
              {loadingReset ? "Updating..." : "Reset Password"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
