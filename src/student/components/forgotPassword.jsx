import React, { useState } from 'react';
import './Login.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [showResetFields, setShowResetFields] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const baseUrl = 'https://placement-portal-backend.ramshekade20.workers.dev';

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage('❌ Enter a valid email provided by placement coordinator.');
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/api/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');

      setShowOtpField(true);
      setMessage('✅ OTP sent to your email.');
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setMessage('');

    if (otp.length !== 6 || isNaN(otp)) {
      setMessage('❌ Enter a valid 6-digit OTP.');
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/api/forgot-password/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'OTP verification failed');

      setResetToken(data.reset_token);
      setShowResetFields(true);
      setMessage('✅ OTP verified. Set your new password.');
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  const handleResetPassword = async (e) => {
  e.preventDefault();
  setMessage('');

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(newPassword)) {
    setMessage("❌ Password must be 8+ chars, 1 uppercase, 1 special char, 1 number.");
    return;
  }

  if (newPassword !== confirmPassword) {
    setMessage("❌ Passwords do not match.");
    return;
  }

  try {
    const res = await fetch(`${baseUrl}/api/forgot-password/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        reset_token: resetToken,
        new_password: newPassword,
      }),
    });

    const rawText = await res.text();

    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      data = { error: rawText };
    }

    if (!res.ok) throw new Error(data.error || 'Password reset failed');

    setMessage("✅ Password reset successfully! You can now log in.");
  } catch (err) {
    setMessage(`❌ ${err.message}`);
  }
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
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
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
