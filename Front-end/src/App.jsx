import React, { useState } from "react";
import EmailForm from "./components/EmailForm";
import OTPForm from "./components/OTPForm";

import './App.css'
import Home from "./components/Home";

function App() {
  const [email, setEmail] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  return (
    <>
      {!email ? (
        <EmailForm onOTPSent={(email) => setEmail(email)} />
      ) : !isVerified ? (
        <OTPForm email={email} onVerified={() => setIsVerified(true)} />
      ) : (
        <Home />
      )}
    </>
  )
}

export default App
