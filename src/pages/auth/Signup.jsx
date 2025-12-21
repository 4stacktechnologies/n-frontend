import { useState } from "react";
import toast from "react-hot-toast";
import OTPInput from "../../components/OTPInput";
import axios from "axios";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const signup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_AUTH_URL}/signup`, form);
      toast.success(res.data.msg);
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Signup failed");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_AUTH_URL}/verify-otp`, {
        email: form.email,
        otp,
        purpose: "VERIFY_EMAIL",
      });
      toast.success(res.data.msg);
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.msg || "OTP failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96 animate-fade">

        {step === 1 && (
          <>
            <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

            <form onSubmit={signup}>
              <input className="input" name="name" placeholder="Name" onChange={handleChange} />
              <input className="input" name="email" placeholder="Email" onChange={handleChange} />
              <input className="input" type="password" name="password" placeholder="Password" onChange={handleChange} />
              <input className="input" name="mobile" placeholder="Mobile" onChange={handleChange} />

              <button className="btn-primary">Send OTP</button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold text-center mb-4">Verify Email</h2>
            <p className="text-sm text-center text-gray-500 mb-4">
              OTP sent to <b>{form.email}</b>
            </p>

            <OTPInput otp={otp} setOtp={setOtp} />

            <button onClick={verifyOtp} className="btn-success mt-4">
              Verify OTP
            </button>
          </>
        )}

        {step === 3 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600">🎉 Success!</h2>
            <p className="mt-2">Your account is verified.</p>
          </div>
        )}

      </div>
    </div>
  );
}
