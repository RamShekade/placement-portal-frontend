
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CollegeHeader from '../../shared/CollegeHeader';
import Profile from "../sections/profile";
import PersonalDetails from "../sections/PersonalDetails";
import AcademicDetails from '../sections/AcademicDetails';
import EducationalQualification from '../sections/EducationalQualification';
import SkillsAndCertificates from '../sections/SkillsAndCertificates';
import InternshipAndWorkExperience from '../sections/InternshipAndWorkExperience';
import ResumeUpload from "../sections/ResumeUpload";
import Achievements from "../sections/Achievements";
import SocialLinks from "../sections/SocialLinks";
import { FaCheckCircle } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('profile');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [formData, setFormData] = useState({
    profile_photo: null,
    resume: null,
    ssc_marksheet: null,
    hsc_marksheet: null,
    diploma_marksheet: null,
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    contact_number_primary: "",
    contact_number_alternate: "",
    email: localStorage.getItem("email"),
    alternate_email: "",
    aadhaar_number: "",
    pan_number: "",
    student_id: localStorage.getItem("gr_number"),
    prn:"",
    current_year: "",
    division: "",
    department: "",
    year_of_admission: "",
    expected_graduation_year: "",
    ssc_percentage: "",
    ssc_year: "",
    hsc_percentage: "",
    hsc_year: "",
    diploma_percentage: "",
    diploma_year: "",
    cgpa:"",
    programming_languages: [],
    soft_skills: [],
    certifications: [],
    projects: [],
    achievements: [],
    social_links: [],
    internships: [],
    linkedin: "",
    github: "",
    competitive: "",
    portfolio: ""
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentDateTime] = useState('2025-06-16 14:50:16');
  const [currentUser] = useState('kshitij-dmce');

  // Getting gr_no and token from localStorage for authentication
  const gr_no = localStorage.getItem('gr_number');
  const token = localStorage.getItem('token');

  // Responsive check
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch user and pre-fill details
  useEffect(() => {
    const fetchUserData = async () => {
      if (!gr_no) {
        console.warn("No gr_number found in localStorage");
        setLoading(false);
        navigate('/');
        return;
      }

      try {
        const response = await fetch(`https://placement-portal-backend.placementportal.workers.dev/api/profile?gr_no=${gr_no}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            console.log("User profile not found, creating new profile");
            // No profile yet - that's okay, we're creating one
            setUser({
              gr_no: gr_no,
              name: "",
              email: "",
            });
          } else {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
        } else {
          const data = await response.json();
          if (data.user) {
            setUser(data.user);
            setFormData(prev => ({
              ...prev,
              first_name: data.user.first_name || "",
              middle_name: data.user.middle_name || "",
              last_name: data.user.last_name || "",
              email: data.user.email || "",
              address: data.user.address || "",
              profile_photo: data.user.profile_photo_url || null,
              resume: data.user.cv_url || null,
              ...data.user // In case there are more fields
            }));
          } else {
            console.error("Failed to load user data");
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [gr_no, navigate]);

  // Section menu with required fields for each section
  const menuItems = [
    { 
      key: 'profile', 
      label: 'Profile Photo', 
      requiredFields: ['profile_photo'] 
    },
    { 
      key: 'personal', 
      label: 'Personal Details', 
      requiredFields: ['first_name', 'last_name', 'gender', 'date_of_birth', 'contact_number_primary', 'email'] 
    },
    { 
      key: 'academic', 
      label: 'Academic Details', 
      requiredFields: ['student_id', 'current_year', 'department', 'year_of_admission', 'expected_graduation_year']
    },
    { 
      key: 'qualification', 
      label: 'Educational Qualification', 
      requiredFields: ['ssc_percentage', 'ssc_year', 'ssc_marksheet']
    },
    { 
      key: 'skills', 
      label: 'Skills & Certificates', 
      requiredFields: ['programming_languages', 'soft_skills']
    },
    { 
      key: 'internship', 
      label: 'Internship & Work Experience', 
      // Internships are optional, but if added must be complete
      requiredFields: []
    },
    { 
      key: 'resume', 
      label: 'Resume', 
      requiredFields: ['resume'] 
    },
    { 
      key: 'social', 
      label: 'Social Links', 
      // Social links are optional but recommended
      requiredFields: []
    },
    { 
      key: 'achievements', 
      label: 'Achievement & Extra-Curriculars', 
      // Achievements are optional, but encouraged
      requiredFields: [] 
    },
  ];

  // Better section validation to check ALL required fields
  const isSectionFilled = (section) => {
    const item = menuItems.find(item => item.key === section);
    if (!item || item.requiredFields.length === 0) return false;
    
    // Check if ALL required fields are filled
    return item.requiredFields.every(field => {
      const value = formData[field];
      
      // Handle arrays (check if they have items)
      if (Array.isArray(value)) return value.length > 0;
      
      // Handle file uploads and other non-empty values
      return value !== "" && value !== null && value !== undefined;
    });
  };

  // Section render logic
  const renderPage = () => {
    // Pass timestamp to all components for use in headers
    const commonProps = {
      data: formData,
      setData: setFormData,
      onNext: goToNextPage,
      timestamp: currentDateTime,
      username: currentUser
    };

    switch (activePage) {
      case 'profile':
        return <Profile {...commonProps} />;
      case 'personal':
        return <PersonalDetails {...commonProps} />;
      case 'academic':
        return <AcademicDetails {...commonProps} />;
      case 'qualification':
        return <EducationalQualification {...commonProps} />;
      case 'skills':
        return <SkillsAndCertificates {...commonProps} />;
      case 'internship':
        return <InternshipAndWorkExperience {...commonProps} />;
      case 'resume':
        return <ResumeUpload {...commonProps} />;
      case 'achievements':
        return <Achievements {...commonProps} />;
      case 'social':
        return <SocialLinks {...commonProps} />;
      default:
        return <Profile {...commonProps} />;
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

  // Logout logic
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboardContainer">
      <CollegeHeader />
      <div className="contentWrapper">
        {!isMobile && (
          <aside className="sidebar">
            <h3 className="sidebarTitle">Student Portal</h3>
            <ul className="menuList">
              {menuItems.map(item => (
                <li
                  key={item.key}
                  onClick={() => setActivePage(item.key)}
                  className={`menuItem ${activePage === item.key ? 'activeMenuItem' : ''}`}
                >
                  <span>{item.label}</span>
                  {isSectionFilled(item.key) && (
                    <FaCheckCircle className="checkIcon" />
                  )}
                </li>
              ))}
            </ul>
            <button onClick={handleLogout} className="logoutButton">
              Logout
            </button>
          </aside>
        )}

        <main className="mainContent">
          <div className="contentContainer">
            {renderPage()}
          </div>

          {isMobile && (
            <div className="mobileNavigation">
              <button
                onClick={goToPrevPage}
                disabled={menuItems.findIndex(item => item.key === activePage) === 0}
                className={`navigationButton ${menuItems.findIndex(item => item.key === activePage) === 0 ? 'disabledButton' : ''}`}
              >
                Back
              </button>
              <button
                onClick={goToNextPage}
                disabled={menuItems.findIndex(item => item.key === activePage) === menuItems.length - 1}
                className={`navigationButton ${menuItems.findIndex(item => item.key === activePage) === menuItems.length - 1 ? 'disabledButton' : ''}`}
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