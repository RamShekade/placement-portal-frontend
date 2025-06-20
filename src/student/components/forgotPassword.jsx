import React, { useState } from 'react';
import './Login.css'; // Reuse the login styles

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [showResetFields, setShowResetFields] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage('❌ Enter a valid email provided by placement coordinator.');
      return;
    }
    setShowOtpField(true);
    setMessage('✅ OTP sent to your email.');
  };

  const handleOtpVerify = (e) => {
    e.preventDefault();
    if (otp.length !== 4 || isNaN(otp)) {
      setMessage('❌ Enter a valid 4-digit OTP.');
      return;
    }
    setShowResetFields(true);
    setMessage('✅ OTP verified. Set your new password.');
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      setMessage("❌ Password must be 8+ chars, 1 uppercase, 1 special char, 1 number.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    setMessage("✅ Password reset successfully!");
    // TODO: Send newPassword and email to backend
  };

  return (
    <div className="login-wrapper">
      <div className="left-panel">
        <img src="/dmce.png" alt="DMCE Logo" className="logo" />
        <h2>DMCE - Training & Placement Portal</h2>
      </div>

      <div className="right-panel">
        <form
          className="login-form"
          onSubmit={
            showResetFields
              ? handleResetPassword
              : showOtpField
              ? handleOtpVerify
              : handleEmailSubmit
          }
        >
          <h2>FORGOT PASSWORD</h2>

          {!showOtpField && (
            <input
              type="email"
              placeholder="Enter college-registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}

          {showOtpField && !showResetFields && (
            <input
              type="text"
              placeholder="Enter 4-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={4}
            />
          )}

          {showResetFields && (
            <>
              <input
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Re-enter New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </>
          )}

          {message && <p className="error">{message}</p>}

          <button type="submit" className="login-btn">
            {showResetFields ? 'Reset Password' : showOtpField ? 'Verify OTP' : 'Send OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
