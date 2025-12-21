export default function OTPInput({ otp, setOtp }) {
  return (
    <input
      type="text"
      maxLength="6"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      placeholder="Enter 6-digit OTP"
      className="w-full text-center tracking-widest text-lg p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
    />
  );
}
