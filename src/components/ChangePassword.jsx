import React, { useState } from 'react';
import './Login.css';
import backgroundImage from '../assets/images/Sign-In Page.png';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  const validations = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  };

  const validatePassword = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!validatePassword(newPassword)) {
      setMessage(
        '❌ Password must be at least 8 characters, include uppercase, lowercase & special character.'
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('❌ New Password and Confirm Password do not match.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        'https://placement-portal-backend.ramshekade20.workers.dev/api/student/change-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            old_password:oldPassword,
            new_password:newPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(`❌ ${data?.error || 'Failed to update password.'}`);
        return;
      }

      setMessage('✅ Password updated successfully!');
      // redirect after 1s
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (err) {
      console.error(err);
      setMessage('❌ Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>CHANGE PASSWORD</h2>
        <br />
        {message && (
          <p
            style={{
              color: message.includes('✅') ? 'green' : 'red',
              fontSize: '14px',
              marginBottom: '1rem',
            }}
          >
            {message}
          </p>
        )}

        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* Password validation indicators */}
        <ul
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.2rem 1rem',
            paddingLeft: '0',
            marginTop: '0',
            marginBottom: '1rem',
            fontSize: '0.75rem',
            color: '#333',
            listStyle: 'none',
            userSelect: 'none',
          }}
        >
          <li style={{ color: validations.length ? 'green' : 'red' }}>
            {validations.length ? '✅' : '❌'} Min 8 characters
          </li>
          <li style={{ color: validations.uppercase ? 'green' : 'red' }}>
            {validations.uppercase ? '✅' : '❌'} 1 uppercase letter
          </li>
          <li style={{ color: validations.lowercase ? 'green' : 'red' }}>
            {validations.lowercase ? '✅' : '❌'} 1 lowercase letter
          </li>
          <li style={{ color: validations.specialChar ? 'green' : 'red' }}>
            {validations.specialChar ? '✅' : '❌'} 1 special character
          </li>
        </ul>

        <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              padding: '0.4rem 1rem',
              background: '#ffffff',
              width: '11rem',
              color: '#000',
              border: '1px solid #ccc',
              borderRadius: '6px',
              fontSize: '0.9rem',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease-in-out',
            }}
          >
            {showPassword ? '🙈 Hide Password' : '👁️ Show Password'}
          </button>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
