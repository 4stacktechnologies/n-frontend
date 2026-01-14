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
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-gray-50 overflow-hidden">
      <Toaster position="top-right" />

      {/* Soft background blobs */}
      <div className="absolute -top-40 -right-40 w-[30rem] h-[30rem] bg-gray-200/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] bg-gray-200/20 rounded-full blur-[140px]" />

      <div className="relative z-10 w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-6">
          <img
            src={import.meta.env.VITE_API_LOGO}
            alt="logo"
            className="w-14 mx-auto mb-2 drop-shadow-sm"
          />
          <h2 className="text-2xl font-bold tracking-wide text-gray-800">
            {import.meta.env.VITE_API_COMPANY_NAME}
          </h2>
          <p className="text-gray-500 text-sm">Create your account</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white border border-gray-300 rounded-3xl p-8 shadow-md">
          {/* Form Heading */}
          <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-800">
            Sign Up
          </h2>

          {/* Signup Form */}
          <div className="space-y-4 mt-4">
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="
                w-full px-4 py-3
                bg-white
                border border-gray-300
                rounded-xl
                text-gray-800 placeholder-gray-400
                focus:outline-none
                focus:border-gray-500
                focus:ring-2 focus:ring-gray-100
                transition
              "
            />

            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="
                w-full px-4 py-3
                bg-white
                border border-gray-300
                rounded-xl
                text-gray-800 placeholder-gray-400
                focus:outline-none
                focus:border-gray-500
                focus:ring-2 focus:ring-gray-100
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
                bg-white
                border border-gray-300
                rounded-xl
                text-gray-800 placeholder-gray-400
                focus:outline-none
                focus:border-gray-500
                focus:ring-2 focus:ring-gray-100
                transition
              "
            />

            <input
              name="mobile"
              placeholder="Mobile (optional)"
              onChange={handleChange}
              className="
                w-full px-4 py-3
                bg-white
                border border-gray-300
                rounded-xl
                text-gray-800 placeholder-gray-400
                focus:outline-none
                focus:border-gray-500
                focus:ring-2 focus:ring-gray-100
                transition
              "
            />

            <button
              onClick={signup}
              disabled={loadingSignup}
              className="
                w-full py-3 rounded-xl
                bg-black
                text-white
                font-semibold
                disabled:opacity-50
                shadow-sm hover:shadow-md
                transition
              "
            >
              {loadingSignup ? "Sending OTP..." : "Signup"}
            </button>
          </div>

          {/* OTP Section */}
          {otpSent && (
            <div className="mt-6 border-t border-gray-200 pt-4 space-y-4">
              <input
                maxLength="6"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="
                  w-full px-4 py-3
                  bg-white
                  border border-gray-300
                  rounded-xl
                  text-center tracking-widest
                  text-gray-800 placeholder-gray-400
                  focus:outline-none
                  focus:border-gray-500
                  focus:ring-2 focus:ring-gray-100
                  transition
                "
              />

              <button
                onClick={verifyOtp}
                disabled={loadingOtp}
                className="
                  w-full py-3 rounded-xl
                  bg-black
                  text-white
                  font-semibold
                  disabled:opacity-50
                  shadow-sm hover:shadow-md
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
                    className="bg-black text-white px-3 py-1 rounded-lg font-semibold hover:bg-gray-800 transition"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Login link */}
          <p className="text-center text-sm mt-6 text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login", { state: { from } })}
              className="text-gray-800 font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
