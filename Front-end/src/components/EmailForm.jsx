import React, { useState } from "react";
import axios from "axios";

const EmailForm = ({ onOTPSent }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to the backend to send the OTP
      await axios.post("http://localhost:3000/otp/send-otp", { email });
      onOTPSent(email);  // Move to the OTP form on success
    } catch (error) {
      alert("Error sending OTP. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EmailForm;
