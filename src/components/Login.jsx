import React, { useState } from 'react';
import './Login.css';
import backgroundImage from '../assets/images/Sign-In Page.png';

const Login = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // Validate student ID length
    if (studentId.length !== 11) {
      setError('❌ Student ID must be exactly 11 characters.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('https://placement-portal-backend.ramshekade20.workers.dev/api/student/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          gr_number: studentId,
          password: password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        // Backend returned error (400/401 etc.)
        setError(data?.message || '❌ Login failed. Try again.');
        return;
      }

     localStorage.setItem('token', data.token);
    localStorage.setItem('gr_number', studentId);

    if (data.password_updated === 0) {
      // First-time login → force password update
      window.location.href = '/pass';
    } else {
      // Password already updated → go to dashboard
      window.location.href = '/student-dashboard';
    }


    } catch (err) {
      console.error('Login error:', err);
      setError('❌ Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <form className="login-form" onSubmit={handleLogin}>
        <h2>STUDENT LOGIN</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          maxLength={11}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
