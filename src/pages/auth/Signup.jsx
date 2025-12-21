import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔁 original page (About, Product, etc.)
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

  /* =====================
     HANDLE INPUT CHANGE
  ===================== */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    // 🔁 If email changes → reset OTP state
    if (name === "email") {
      setOtpSent(false);
      setOtp("");
      setTimer(0);
    }
  };

  /* =====================
     SIGNUP → SEND OTP
  ===================== */
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

  /* =====================
     VERIFY OTP
  ===================== */
  const verifyOtp = async () => {
    if (otp.length !== 6) {
      return toast.error("Enter 6-digit OTP");
    }

    setLoadingOtp(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_AUTH_URL}/verify-otp`,
        {
          email: form.email,
          otp,
        }
      );

      toast.success(res.data.msg || "Account created");

      // ✅ Go to login with SAME from
      navigate("/login", { state: { from } });
    } catch (err) {
      toast.error(err.response?.data?.msg || "OTP verification failed");
    } finally {
      setLoadingOtp(false);
    }
  };

  /* =====================
     RESEND OTP
  ===================== */
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

  /* =====================
     OTP TIMER
  ===================== */
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <Toaster position="top-right" />

      <div className="bg-white w-[420px] p-8 rounded-2xl shadow-xl">
        {/* LOGO + COMPANY */}
        <div className="text-center mb-6">
          <img
            src="/logo.png"
            alt="logo"
            className="w-14 mx-auto mb-2"
          />
          <h2 className="text-2xl font-bold text-indigo-600">
            YourCompany
          </h2>
          <p className="text-gray-500 text-sm">
            Create your account
          </p>
        </div>

        {/* SIGNUP FORM */}
        <div className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            className="input"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            className="input"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input"
            onChange={handleChange}
          />

          <input
            name="mobile"
            placeholder="Mobile (optional)"
            className="input"
            onChange={handleChange}
          />

          <button
            onClick={signup}
            disabled={loadingSignup}
            className="btn-primary"
          >
            {loadingSignup ? "Sending OTP..." : "Signup"}
          </button>
        </div>

        {/* OTP SECTION (BELOW SIGNUP) */}
        {otpSent && (
          <div className="mt-6 border-t pt-4 space-y-4">
            <input
              maxLength="6"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input text-center tracking-widest"
            />

            <button
              onClick={verifyOtp}
              disabled={loadingOtp}
              className="btn-primary"
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
                  className="text-indigo-600 font-semibold"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </div>
        )}

        {/* NAVIGATION TO LOGIN */}
        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <span
            onClick={() =>
              navigate("/login", { state: { from } })
            }
            className="text-indigo-600 font-semibold cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
