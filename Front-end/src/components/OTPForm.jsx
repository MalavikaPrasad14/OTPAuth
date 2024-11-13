import React, { useState } from "react";
import axios from "axios";

const OTPForm = ({ email, onVerified }) => {
  const [otp, setOTP] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to the backend to verify the OTP
      await axios.post("http://localhost:3000/otp/verify-otp", { email, otp });
      onVerified();  // Proceed to the welcome page on success
    } catch (error) {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <form >
      <label>Enter OTP</label>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
        required
      />
      <button type="submit" onSubmit={handleSubmit}>Submit</button>
    </form>
  );
};

export default OTPForm;
