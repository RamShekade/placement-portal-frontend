// import React, { useState } from 'react';
// import './Login.css';
// import backgroundImage from '../assets/images/Sign-In Page.png';

// const Login = () => {
//   const [studentId, setStudentId] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     // Validate student ID length
//     if (studentId.length !== 11) {
//       setError('❌ Student ID must be exactly 11 characters.');
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch('https://placement-portal-backend.ramshekade20.workers.dev/api/student/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           gr_number: studentId,
//           password: password
//         })
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         // Backend returned error (400/401 etc.)
//         setError(data?.message || '❌ Login failed. Try again.');
//         return;
//       }

//      localStorage.setItem('token', data.token);
//     localStorage.setItem('gr_number', studentId);

//     if (data.password_updated === 0) {
//       // First-time login → force password update
//       window.location.href = '/pass';
//     } else {
//       // Password already updated → go to dashboard
//       window.location.href = '/student-dashboard';
//     }


//     } catch (err) {
//       console.error('Login error:', err);
//       setError('❌ Server error. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
//       <form className="login-form" onSubmit={handleLogin}>
//         <h2>STUDENT LOGIN</h2>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         <input
//           type="text"
//           placeholder="Student ID"
//           value={studentId}
//           onChange={(e) => setStudentId(e.target.value)}
//           maxLength={11}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit" disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import './Login.css';
import dmceLogo from '../../assets/images/dmce.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation
    if (!studentId.trim() || !password.trim()) {
      setError('❌ Both fields are required.');
      return;
    }

    if (studentId.length !== 11) {
      setError('❌ Student ID must be exactly 11 characters.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://placement-portal-backend.ramshekade20.workers.dev/api/auth/login', {
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
        setError(data?.message || '❌ Invalid credentials.');
        return;
      }

      // Save credentials securely
      localStorage.setItem('token', data.token);
      localStorage.setItem('gr_number', studentId);

      // Redirect based on dummy password status
      if (data.password_updated === 0) {
        window.location.href = '/update-pass'; // First login - go to change password
      } else {
        window.location.href = '/student-dashboard'; // Normal login
      }

    } catch (err) {
      console.error('Login error:', err);
      setError('❌ Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-wrapper">
      <div className="left-panel">
        <img src={dmceLogo} alt="DMCE Logo" className="logo" />
        <h2>DMCE - Training & Placement Portal</h2>
      </div>

      <div className="right-panel">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>STUDENT LOGIN</h2>

          <input
            type="text"
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            maxLength={11}
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="button" 
              className="password-toggle-btn" 
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading} className="login-btn">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;