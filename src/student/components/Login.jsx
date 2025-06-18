// import React, { useState } from 'react';
// import './Login.css';
// import dmceLogo from '../../assets/images/dmce.png';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

// const Login = () => {
//   const [studentId, setStudentId] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!studentId.trim() || !password.trim()) {
//       setError('❌ Both fields are required.');
//       return;
//     }

//     if (studentId.length !== 11) {
//       setError('❌ Student ID must be exactly 11 characters.');
//       return;
//     }

//     setError('');
//     setLoading(true);

//     try {
//       const response = await fetch('https://placement-portal-backend.ramshekade20.workers.dev/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         credentials: 'include', // This will save cookies automatically
//         body: JSON.stringify({
//           gr_number: studentId,
//           password: password
//         })
//       });

//       let data;
//       try {
//         data = await response.json();
//       } catch (err) {
//         console.error("Error parsing response:", err);
//         throw new Error("Server response was not valid JSON");
//       }

//       if (!response.ok) {
//         setError(data?.error || '❌ Invalid credentials.');
//         return;
//       }

//       // Store gr_number in localStorage
//       localStorage.setItem('gr_number', studentId);
      
//       // Also store token as fallback if cookies don't work
//       if (data.token) {
//         localStorage.setItem('token', data.token);
//       }

//       if (data.password_updated === 0) {
//         window.location.href = '/update-pass';
//       } else {
//         window.location.href = '/student-dashboard';
//       }

//     } catch (err) {
//       console.error('Login error:', err);
//       setError(`❌ ${err.message || 'Server error. Please try again later.'}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="login-wrapper">
//       <div className="left-panel">
//         <img src={dmceLogo} alt="DMCE Logo" className="logo" />
//         <h2>DMCE - Training & Placement Portal</h2>
//         <p className="timestamp">Current Date and Time (UTC): 2025-06-18 11:57:29</p>
//         <p className="user-login">Current User's Login: kshitij-dmcec</p>
//       </div>

//       <div className="right-panel">
//         <form className="login-form" onSubmit={handleLogin}>
//           <h2>STUDENT LOGIN</h2>

//           <input
//             type="text"
//             placeholder="Student ID"
//             value={studentId}
//             onChange={(e) => setStudentId(e.target.value)}
//             maxLength={11}
//           />

//           <div className="password-field">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button
//               type="button"
//               className="password-toggle-btn"
//               onClick={togglePasswordVisibility}
//               aria-label={showPassword ? "Hide password" : "Show password"}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </button>
//           </div>

//           {error && <p className="error">{error}</p>}

//           <button type="submit" disabled={loading} className="login-btn">
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react'
import './Login.css'
import dmceLogo from '../../assets/images/dmce.png'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const Login = () => {
  const [studentId, setStudentId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (e) => {
  e.preventDefault()
  if (!studentId.trim() || !password.trim()) {
    setError('❌ Both fields are required.')
    return
  }

  if (studentId.length !== 11) {
    setError('❌ Student ID must be exactly 11 characters.')
    return
  }

  setError('')
  setLoading(true)

  try {
    const res = await fetch('https://placement-portal-backend.ramshekade20.workers.dev/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        gr_number: studentId,
        password
      })
    })

    let data
    const contentType = res.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      data = await res.json()
    } else {
      const text = await res.text()
      throw new Error(text) // this will be caught below
    }

    if (!res.ok) {
      setError(data?.error || '❌ Login failed')
      return
    }

    // Redirect based on password update status
    if (data.password_updated === 0) {
      window.location.href = '/update-pass'
    } else {
      window.location.href = '/student-dashboard'
    }

  } catch (err) {
    console.error('Login error:', err)
    setError(`❌ ${err.message || 'Server error. Please try again later.'}`)
  } finally {
    setLoading(false)
  }
}


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
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
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
  )
}

export default Login
