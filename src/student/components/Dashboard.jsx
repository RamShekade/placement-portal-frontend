// 	 import React, { useState, useEffect } from 'react';
// import CollegeHeader from '../../shared/CollegeHeader';
// import Profile from "../sections/profile";
// import PersonalDetails from "../sections/PersonalDetails";
// import AcademicDetails from '../sections/AcademicDetails'; 
// import EducationalQualification from '../sections/EducationalQualification';
// import SkillsAndCertificates from '../sections/SkillsAndCertificates';
// import InternshipAndWorkExperience from '../sections/InternshipAndWorkExperience';
// import ResumeUpload from "../sections/ResumeUpload";
// import Achievements from "../sections/Achievements";
// import SocialLinks from "../sections/SocialLinks";





// const Dashboard = () => {
//   const [activePage, setActivePage] = useState('profile');
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const [formData, setFormData] = useState({
//   profile_photo: null,
//   resume: null,
//   ssc_marksheet: null,
//   hsc_marksheet: null,
//   diploma_marksheet: null,

//   // Text Fields
//   first_name: "",
//   middle_name: "",
//   last_name: "",
//   gender: "",
//   date_of_birth: "",
//   contact_number_primary: "",
//   contact_number_alternate: "",
//   email: "",
//   aadhaar_number: "",
//   pan_number: "",
//   student_id: "",
//   current_year: "",
//   department: "",
//   year_of_admission: "",
//   expected_graduation_year: "",
//   ssc_percentage: "",
//   ssc_year: "",
//   hsc_percentage: "",
//   hsc_year: "",
//   diploma_percentage: "",
//   diploma_year: "",
//   sem1_cgpa: "", sem2_cgpa: "", sem3_cgpa: "", sem4_cgpa: "",
//   sem5_cgpa: "", sem6_cgpa: "", sem7_cgpa: "", sem8_cgpa: "",

//   // JSON fields
//   programming_languages: [],
//   soft_skills: [],
//   certifications: [],
//   projects: [],
//   achievements: [],
//   internships: [],
// });


//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const menuItems = [
//     { key: 'profile', label: 'Profile Photo' },
//     { key: 'personal', label: 'Personal Details' },
//     { key: 'academic', label: 'Academic Details' },
//     { key: 'qualification', label: 'Educational Qualification' },
//     { key: 'skills', label: 'Skills & Certificates' },
//     { key: 'internship', label: 'Internship & Work Experience' },
//     { key: 'resume', label: 'Resume' },
//     { key: 'social', label: 'Social Links' },
//     { key: 'achievements', label: 'Achievement & Extra-Curriculars' },
    
    
//   ];

//   const renderPage = () => {
//     switch (activePage) {
//       case 'profile':
//         return <Profile 
//           data={formData}
//   setData={setFormData}
// />;
//       case 'personal':
//         return <PersonalDetails 
//          data={formData}
//   setData={setFormData}/>;
//         case 'academic':
//           return <AcademicDetails
//            data={formData}
//   setData={setFormData} />;
//           case 'qualification':
//             return <EducationalQualification 
//              data={formData}
//   setData={setFormData}/>;
//             case 'skills':
//               return <SkillsAndCertificates 
//                data={formData}
//   setData={setFormData}/>;
//               case 'internship':
//               return <InternshipAndWorkExperience
//                data={formData}
//   setData={setFormData} />;
//               case 'resume':
//               return <ResumeUpload  data={formData}
//   setData={setFormData}/>;
//                case 'achievements':
//               return <Achievements data={formData}
//   setData={setFormData} />;
//               case 'social':
//               return <SocialLinks  data={formData}
//   setData={setFormData}/>;
//       // Add other components as needed
//       default:
//         return <Profile />;
//     }
//   };

//   const goToNextPage = () => {
//     const currentIndex = menuItems.findIndex(item => item.key === activePage);
//     if (currentIndex < menuItems.length - 1) {
//       setActivePage(menuItems[currentIndex + 1].key);
//     }
//   };

//   const goToPrevPage = () => {
//     const currentIndex = menuItems.findIndex(item => item.key === activePage);
//     if (currentIndex > 0) {
//       setActivePage(menuItems[currentIndex - 1].key);
//     }
//   };

//   return (
//     <div style={{
//       fontFamily: 'Arial, sans-serif',
//       background: '#f9f9f9',
//       minHeight: '100vh',
//       width: '100vw',
//       overflowX: 'hidden'
//     }}>
//       <CollegeHeader />

//       <div style={{
//         display: 'flex',
//         flexDirection: 'row',
//         width: '100%',
//         height: 'calc(100vh - 80px)',
//         overflow: 'hidden'
//       }}>
//         {/* Sidebar only on desktop */}
//         {!isMobile && (
//           <aside style={{
//             width: '270px',
//             backgroundColor: '#fff',
//             padding: '20px',
//             boxSizing: 'border-box',
//             borderRight: '1px solid #ccc',
//             color: '#333',
//             userSelect: 'none'
//           }}>
//             <h3 style={{ marginBottom: '20px', fontSize: '18px', color: '#000' }}>
//               Student Portal
//             </h3>

//             <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
//               {menuItems.map(item => (
//                 <li
//                   key={item.key}
//                   onClick={() => setActivePage(item.key)}
//                   style={{
//                     cursor: 'pointer',
//                     margin: '10px 0',
//                     padding: '10px',
//                     backgroundColor: activePage === item.key ? '#1e1e3f' : 'transparent',
//                     color: activePage === item.key ? '#fff' : '#333',
//                     borderRadius: '6px',
//                     fontSize: '14px',
//                     overflow: 'hidden',
//                     whiteSpace: 'nowrap',
//                     textAlign: 'left',
//                     transition: 'background-color 0.3s ease, color 0.3s ease'
//                   }}
//                 >
//                   {item.label}
//                 </li>
//               ))}
//             </ul>
//           </aside>
//         )}

//         {/* Main content */}
//         <main style={{
//           flex: 1,
//           padding: '20px',
//           boxSizing: 'border-box',
//           overflowY: 'auto',
//           width: '100%',
//           maxWidth: '100vw',
//           position: 'relative'
//         }}>
//           <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
//             {renderPage()}
//           </div>

//           {/* Navigation buttons on mobile */}
//           {isMobile && (
//             <div style={{
//               position: 'fixed',
//               bottom: 0,
//               left: 0,
//               width: '100%',
//               backgroundColor: '#fff',
//               borderTop: '1px solid #ccc',
//               display: 'flex',
//               justifyContent: 'space-between',
//               padding: '10px 20px',
//               boxSizing: 'border-box',
//               zIndex: 1000,
//             }}>
//               <button
//                 onClick={goToPrevPage}
//                 disabled={menuItems.findIndex(item => item.key === activePage) === 0}
//                 style={{
//                   padding: '10px 20px',
//                   fontSize: '16px',
//                   backgroundColor: '#1e3a8a',
//                   color: '#fff',
//                   border: 'none',
//                   borderRadius: '8px',
//                   cursor: 'pointer',
//                   opacity: menuItems.findIndex(item => item.key === activePage) === 0 ? 0.5 : 1,
//                 }}
//               >
//                 Back
//               </button>

//               <button
//                 onClick={goToNextPage}
//                 disabled={menuItems.findIndex(item => item.key === activePage) === menuItems.length - 1}
//                 style={{
//                   padding: '10px 20px',
//                   fontSize: '16px',
//                   backgroundColor: '#1e3a8a',
//                   color: '#fff',
//                   border: 'none',
//                   borderRadius: '8px',
//                   cursor: 'pointer',
//                   opacity: menuItems.findIndex(item => item.key === activePage) === menuItems.length - 1 ? 0.5 : 1,
//                 }}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


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
    email: "",
    aadhaar_number: "",
    pan_number: "",
    student_id: "",
    current_year: "",
    department: "",
    year_of_admission: "",
    expected_graduation_year: "",
    ssc_percentage: "",
    ssc_year: "",
    hsc_percentage: "",
    hsc_year: "",
    diploma_percentage: "",
    diploma_year: "",
    sem1_cgpa: "", sem2_cgpa: "", sem3_cgpa: "", sem4_cgpa: "",
    sem5_cgpa: "", sem6_cgpa: "", sem7_cgpa: "", sem8_cgpa: "",
    programming_languages: [],
    soft_skills: [],
    certifications: [],
    projects: [],
    achievements: [],
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
        const response = await fetch(`https://placement-portal-backend.ramshekade20.workers.dev/api/profile?gr_no=${gr_no}`);
        
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