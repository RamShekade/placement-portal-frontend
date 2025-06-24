import React from 'react';
import { useNavigate } from 'react-router-dom';
import CollegeHeader from '../../shared/CollegeHeader';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const grNumber = localStorage.getItem('gr_number') || 'Unknown';
  const studentName = localStorage.getItem('full_name') || 'Welcome Student';
  const profile_url = localStorage.getItem('profile_url');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="student-dashboard">
      <CollegeHeader />

      {/* Banner Image */}
      <div className="banner-container">
        <img src="/banner.jpg" alt="Recruiters Banner" className="banner-image" />
      </div>

      <div className="announcement-strip">
        <marquee>📢 Today: Capgemini is visiting for placements! Prepare your documents and attend on time.</marquee>
      </div>

      <div className="dashboard-header">
        <div className="profile-info">
          <img
            src={profile_url}
            alt="Default User"
            className="profile-pic"
          />
          <div className="text-info">
            <h2>{studentName}</h2>
            <p>GR No: <strong>{grNumber}</strong></p>
          </div>
        </div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

      <div className="card-grid">
        <div className="dashboard-card" onClick={() => handleNavigate('/profile')}>
          <h3>📁 View Profile</h3>
          <p>Edit & View your personal and academic details here.</p>
        </div>
        <div className="dashboard-card" onClick={() => handleNavigate('/under-dev')}>
          <h3>📊 View Opportunities</h3>
          <p>Browse and apply for active company openings.</p>
        </div>
        <div className="dashboard-card" onClick={() => handleNavigate('/under-dev')}>
          <h3>📝 Application Status</h3>
          <p>Check the current status of your applications.</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
