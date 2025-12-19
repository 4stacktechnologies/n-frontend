import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [otp, setOtp] = useState("");

  if (!state?.email) return <p>Invalid access</p>;

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/verify-otp`,
        {
          email: state.email,
          otp,
          purpose: state.purpose,
        }
      );

      alert("Email verified successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "OTP verification failed");
    }
  };

  return (
    <div className="auth-box">
      <h2>Verify OTP</h2>

      <form onSubmit={handleVerify}>
        <input
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button>Verify</button>
      </form>
    </div>
  );
};

export default VerifyOtp;
