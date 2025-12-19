import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/signup`,
        form
      );

      alert("OTP sent to your email");
      navigate("/verify-otp", {
        state: { email: form.email, purpose: "VERIFY_EMAIL" },
      });
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-box">
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="mobile"
          placeholder="Mobile (optional)"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button disabled={loading}>
          {loading ? "Sending OTP..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
