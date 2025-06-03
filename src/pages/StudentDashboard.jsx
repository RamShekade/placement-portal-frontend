import React from 'react';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const grNumber = localStorage.getItem('gr_number') || 'Unknown';

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <h1>🎓 Student Dashboard</h1>
          <p>Welcome back, GR No: <strong>{grNumber}</strong></p>
        </div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>

      <main className="dashboard-grid">
        <div className="dashboard-card">
          <h2>📁 My Profile</h2>
          <p>View or edit your personal details and academic records.</p>
          <button className="card-link">Go to Profile →</button>
        </div>

        <div className="dashboard-card">
          <h2>📊 Placement Stats</h2>
          <p>Track placement updates and eligible companies.</p>
          <button className="card-link">View Statistics →</button>
        </div>

        <div className="dashboard-card">
          <h2>📝 Applied Companies</h2>
          <p>Check the status of your applications.</p>
          <button className="card-link">View Applications →</button>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
