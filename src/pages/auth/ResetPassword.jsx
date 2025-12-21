import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_AUTH_URL}/reset-password`, { email });
      toast.success(res.data.msg);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Error sending OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleReset}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Reset Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="input"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="btn-primary">Send OTP</button>
      </form>
    </div>
  );
}
