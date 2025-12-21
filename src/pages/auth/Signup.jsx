import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* =====================
     SIGNUP
  ===================== */
  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_AUTH_URL}/signup`,
        form
      );
      toast.success(res.data.msg);
      setStep(2);
      startTimer();
    } catch (err) {
      toast.error(err.response?.data?.msg || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  /* =====================
     VERIFY OTP
  ===================== */
  const verifyOtp = async () => {
    if (otp.length !== 6) return toast.error("Enter 6-digit OTP");

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_AUTH_URL}/verify-otp`,
        {
          email: form.email,
          otp,
          purpose: "VERIFY_EMAIL",
        }
      );
      toast.success(res.data.msg);
    } catch (err) {
      toast.error(err.response?.data?.msg || "OTP failed");
    } finally {
      setLoading(false);
    }
  };

  /* =====================
     RESEND OTP
  ===================== */
  const resendOtp = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_AUTH_URL}/resend-otp`,
        {
          email: form.email,
          purpose: "VERIFY_EMAIL",
        }
      );
      toast.success("OTP resent successfully");
      startTimer();
    } catch (err) {
      toast.error(err.response?.data?.msg || "Resend failed");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <Toaster position="top-right" />

      <div className="bg-white w-[380px] p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">
          {step === 1 ? "Create Account" : "Verify OTP"}
        </h2>

        {step === 1 && (
          <form onSubmit={signup} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="input"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="input"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="input"
              required
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile (optional)"
              onChange={handleChange}
              className="input"
            />

            <button disabled={loading} className="btn-primary">
              {loading ? "Please wait..." : "Signup"}
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <input
              type="text"
              maxLength="6"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input text-center tracking-widest"
            />

            <button onClick={verifyOtp} disabled={loading} className="btn-primary">
              Verify OTP
            </button>

            <div className="text-center text-sm">
              {timer > 0 ? (
                <span className="text-gray-500">
                  Resend OTP in {timer}s
                </span>
              ) : (
                <button
                  onClick={resendOtp}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
