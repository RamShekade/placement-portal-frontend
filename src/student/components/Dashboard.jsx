import React, { useState, useEffect } from 'react';
import CollegeHeader from './shared/CollegeHeader';
import Profile from "../sections/profile";
import PersonalDetails from "../sections/PersonalDetails";
import AcademicDetails from '../sections/AcademicDetails'; 
import EducationalQualification from '../sections/EducationalQualification';
import SkillsAndCertificates from '../sections/SkillsAndCertificates';



const Dashboard = () => {
  const [activePage, setActivePage] = useState('profile');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { key: 'profile', label: 'Profile Photo' },
    { key: 'personal', label: 'Personal Details' },
    { key: 'academic', label: 'Academic Details' },
    { key: 'qualification', label: 'Educational Qualification' },
    { key: 'skills', label: 'Skills & Certificates' },
    { key: 'internship', label: 'Internship & Work Experience' },
    { key: 'resume', label: 'Resume' },
    { key: 'achievements', label: 'Achievement & Extra-Curriculars' }
    
  ];

  const renderPage = () => {
    switch (activePage) {
      case 'profile':
        return <Profile />;
      case 'personal':
        return <PersonalDetails />;
        case 'academic':
          return <AcademicDetails />;
          case 'qualification':
            return <EducationalQualification />;
            case 'skills':
              return <SkillsAndCertificates />;
      // Add other components as needed
      default:
        return <Profile />;
    }
  };

  const goToNextPage = () => {
    const currentIndex = menuItems.findIndex(item => item.key === activePage);
    if (currentIndex < menuItems.length - 1) {
      setActivePage(menuItems[currentIndex + 1].key);
    }
  };

  const goToPrevPage = () => {
    const currentIndex = menuItems.findIndex(item => item.key === activePage);
    if (currentIndex > 0) {
      setActivePage(menuItems[currentIndex - 1].key);
    }
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      background: '#f9f9f9',
      minHeight: '100vh',
      width: '100vw',
      overflowX: 'hidden'
    }}>
      <CollegeHeader />

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 'calc(100vh - 80px)',
        overflow: 'hidden'
      }}>
        {/* Sidebar only on desktop */}
        {!isMobile && (
          <aside style={{
            width: '260px',
            backgroundColor: '#fff',
            padding: '20px',
            boxSizing: 'border-box',
            borderRight: '1px solid #ccc',
            color: '#333',
            userSelect: 'none'
          }}>
            <h3 style={{ marginBottom: '20px', fontSize: '18px', color: '#000' }}>
              Student Portal
            </h3>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {menuItems.map(item => (
                <li
                  key={item.key}
                  onClick={() => setActivePage(item.key)}
                  style={{
                    cursor: 'pointer',
                    margin: '10px 0',
                    padding: '10px',
                    backgroundColor: activePage === item.key ? '#1e1e3f' : 'transparent',
                    color: activePage === item.key ? '#fff' : '#333',
                    borderRadius: '6px',
                    fontSize: '14px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textAlign: 'left',
                    transition: 'background-color 0.3s ease, color 0.3s ease'
                  }}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Main content */}
        <main style={{
          flex: 1,
          padding: '20px',
          boxSizing: 'border-box',
          overflowY: 'auto',
          width: '100%',
          maxWidth: '100vw',
          position: 'relative'
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            {renderPage()}
          </div>

          {/* Navigation buttons on mobile */}
          {isMobile && (
            <div style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              width: '100%',
              backgroundColor: '#fff',
              borderTop: '1px solid #ccc',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 20px',
              boxSizing: 'border-box',
              zIndex: 1000,
            }}>
              <button
                onClick={goToPrevPage}
                disabled={menuItems.findIndex(item => item.key === activePage) === 0}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  backgroundColor: '#1e3a8a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  opacity: menuItems.findIndex(item => item.key === activePage) === 0 ? 0.5 : 1,
                }}
              >
                Back
              </button>

              <button
                onClick={goToNextPage}
                disabled={menuItems.findIndex(item => item.key === activePage) === menuItems.length - 1}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  backgroundColor: '#1e3a8a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  opacity: menuItems.findIndex(item => item.key === activePage) === menuItems.length - 1 ? 0.5 : 1,
                }}
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
