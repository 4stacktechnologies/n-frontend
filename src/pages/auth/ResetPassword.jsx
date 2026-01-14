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
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 p-4 overflow-hidden">
      <Toaster position="top-right" />

      {/* Soft background blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gray-200/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gray-200/20 rounded-full blur-[140px]" />

      {/* Branding */}
      <div className="absolute top-10 text-center z-10">
        <img
          src={import.meta.env.VITE_API_LOGO}
          alt="logo"
          className="w-14 mx-auto mb-2 drop-shadow-sm"
        />
        <h2 className="text-2xl font-bold tracking-wide text-gray-800">
          {import.meta.env.VITE_API_COMPANY_NAME}
        </h2>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white border border-gray-300 rounded-3xl p-8 shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Reset Password
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
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
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100 transition"
          />

          <button
            disabled={loadingSend || otpSent}
            className={`w-full py-3 rounded-xl font-semibold transition ${
              otpSent
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-800 shadow-sm hover:shadow-md"
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
          <div className="mt-6 space-y-4 border-t border-gray-200 pt-4">
            <input
              maxLength="6"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-center tracking-widest text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100 transition"
            />

            <input
              type="password"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100 transition"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100 transition"
            />

            <button
              onClick={handleResetPassword}
              disabled={loadingReset}
              className="w-full py-3 rounded-xl bg-black text-white font-semibold disabled:opacity-50 shadow-sm hover:shadow-md transition"
            >
              {loadingReset ? "Updating..." : "Reset Password"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
