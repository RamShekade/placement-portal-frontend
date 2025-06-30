import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CollegeHeader from '../shared/CollegeHeader';
import { MdPostAdd, MdWorkOutline, MdPeopleAlt, MdDashboard } from 'react-icons/md';
import { FaChartLine, FaUsers, FaBriefcase } from 'react-icons/fa';
import './Dashboard.css';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    activeJobs: 0
  });

  useEffect(() => {
    // Simulate loading and fetch stats
    const timer = setTimeout(() => {
      setStats({
        totalJobs: 12,
        totalApplications: 245,
        activeJobs: 8
      });
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const dashboardCards = [
    {
      id: 'create-job',
      icon: MdPostAdd,
      title: 'Create Job Posting',
      description: 'Create a new job opportunity for eligible students and manage requirements.',
      action: 'Create Job',
      path: '/company/create-job',
      color: '#1e1e3f'
    },
    {
      id: 'view-jobs',
      icon: MdWorkOutline,
      title: 'View Job Listings',
      description: 'See all jobs your company has posted so far and manage existing postings.',
      action: 'View Jobs',
      path: '/company/view-jobs',
      color: '#1e1e3f'
    },
    {
      id: 'view-applicants',
      icon: MdPeopleAlt,
      title: 'View Applicants',
      description: 'Track applications, review candidates, and manage the recruitment process.',
      action: 'View Applicants',
      path: '/company/view-applicants',
      color: '#1e1e3f'
    }
  ];

  if (loading) {
    return (
      <div className="company-dashboard">
        <CollegeHeader />
        <div className="loading">
          <div>Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="company-dashboard">
      <CollegeHeader />
      
      {/* Timestamp Header */}
   
      <div className="container">
        <h2 className="title">
          <MdDashboard style={{ marginRight: '10px', verticalAlign: 'middle' }} />
          Company Dashboard
        </h2>

        {/* Main Action Cards */}
        <div className="card-container">
          {dashboardCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div key={card.id} className="card">
                <div className="card-content">
                  <div className="icon-wrapper">
                    <IconComponent size={50} color={card.color} className="icon" />
                  </div>
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-text">{card.description}</p>
                </div>
                <button 
                  className="button" 
                  onClick={() => navigate(card.path)}
                  aria-label={`Navigate to ${card.title}`}
                >
                  {card.action}
                </button>
              </div>
            );
          })}
        </div>

        {/* Statistics Section */}
        <div className="stats-section">
          <h3 className="stats-title">Quick Overview</h3>
          <div className="stats-container">
            <div className="stat-card">
              <FaBriefcase size={24} style={{ marginBottom: '10px' }} />
              <div className="stat-number">{stats.totalJobs}</div>
              <div className="stat-label">Total Jobs Posted</div>
            </div>
            <div className="stat-card">
              <FaUsers size={24} style={{ marginBottom: '10px' }} />
              <div className="stat-number">{stats.totalApplications}</div>
              <div className="stat-label">Total Applications</div>
            </div>
            <div className="stat-card">
              <FaChartLine size={24} style={{ marginBottom: '10px' }} />
              <div className="stat-number">{stats.activeJobs}</div>
              <div className="stat-label">Active Job Postings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;