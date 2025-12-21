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

      // optional: redirect to login
      // navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Reset failed");
    } finally {
      setLoadingReset(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <Toaster position="top-right" />

      <div className="bg-white w-[400px] p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">
          Reset Password
        </h2>

        {/* EMAIL */}
        <form onSubmit={handleSendOtp} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setOtpSent(false);
              setOtp("");
            }}
            required
          />

          <button
            disabled={loadingSend}
            className="btn-primary"
          >
            {loadingSend ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>

        {/* OTP + PASSWORD */}
        {otpSent && (
          <div className="mt-6 space-y-4 border-t pt-4">
            <input
              maxLength="6"
              placeholder="Enter OTP"
              className="input text-center tracking-widest"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <input
              type="password"
              placeholder="New Password"
              className="input"
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="input"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              onClick={handleResetPassword}
              disabled={loadingReset}
              className="btn-primary"
            >
              {loadingReset ? "Updating..." : "Reset Password"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
