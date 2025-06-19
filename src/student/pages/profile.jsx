// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const formatList = (data) => {
//   if (Array.isArray(data)) {
//     return data.join(', ');
//   } else if (typeof data === 'string') {
//     return data.split(',').map(s => s.trim()).filter(Boolean).join(', ');
//   }
//   return '';
// };

// const ProfilePage = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("token");

//       try {
//         const res = await axios.get(
//           'https://placement-portal-backend.ramshekade20.workers.dev/api/student/profile/view',
//           {
//             withCredentials: true
//           }
//         )

//         setProfile(res.data.profile);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to load profile');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading) return <p>Loading profile...</p>;
//   if (error) return <p style={{ color: 'red' }}>{error}</p>;

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h1>👤 {profile.first_name} {profile.last_name}'s Profile</h1>
//       <img
//         src={profile.profile_url}
//         alt="Profile"
//         style={{ width: '150px', borderRadius: '50%', marginBottom: '1rem' }}
//       />

//       <p><strong>Email:</strong> {profile.email}</p>
//       <p><strong>Student ID:</strong> {profile.student_id}</p>
//       <p><strong>DOB:</strong> {profile.date_of_birth}</p>
//       <p><strong>Gender:</strong> {profile.gender}</p>
//       <p><strong>Department:</strong> {profile.department}</p>
//       <p><strong>Contact:</strong> {profile.contact_number_primary}</p>

//       <h2>📄 Resume</h2>
//       <a href={profile.resume_url} target="_blank" rel="noreferrer">View Resume</a>

//       <h2>📚 Academic Info</h2>
//       <ul>
//         <li>SSC: {profile.ssc_percentage}% ({profile.ssc_year})</li>
//         <li><a href={profile.ssc_marksheet_url} target="_blank" rel="noreferrer">SSC Marksheet</a></li>
//         <li>HSC: {profile.hsc_percentage || 'N/A'}% ({profile.hsc_year || 'N/A'})</li>
//         <li><a href={profile.hsc_marksheet_url} target="_blank" rel="noreferrer">HSC Marksheet</a></li>
//         <li>Diploma: {profile.diploma_percentage || 'N/A'}% ({profile.diploma_year || 'N/A'})</li>
//         <li><a href={profile.diploma_marksheet_url} target="_blank" rel="noreferrer">Diploma Marksheet</a></li>
//       </ul>

//       <br></br>
//       <br />
//       <br />
//       <br />

//       <h2>🛠️ Skills & Projects</h2>
//       <p><strong>Languages:</strong> {formatList(profile.programming_languages)}</p>
//       <p><strong>Skills:</strong> {formatList(profile.skills)}</p>
//       <p><strong>Certifications:</strong> {formatList(profile.certifications)}</p>
//       <p><strong>Projects:</strong> {formatList(profile.projects)}</p>
//       <p><strong>Achievements:</strong> {formatList(profile.achievements)}</p>
//       <p><strong>Internships:</strong> {formatList(profile.internships)}</p>
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import CollegeHeader from "../../shared/CollegeHeader";

const ProfilePage = () => {
  const [data, setData] = useState(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "https://placement-portal-backend.ramshekade20.workers.dev/api/student/profile/view",
          {
            withCredentials: true,
          }
        );

        setData(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error.message);
      }
    };

    fetchProfile();
  }, []);

  if (!data) {
    return <div style={{ padding: "40px", textAlign: "center" }}>Loading profile...</div>;
  }

  return (
    <div style={containerStyle}>
      <CollegeHeader />
      <div style={cardStyle}>
        <h2 style={headerStyle}>View Profile - Step {step}</h2>

        {/* Step-by-step UI remains unchanged */}
        {step === 1 && (
          <>
            <Section title="Basic Information">
              <Item label="Name" value={`${data?.first_name || ''} ${data?.middle_name || ''} ${data?.last_name || ''}`} />
              <Item label="Gender" value={data?.gender} />
              <Item label="Date of Birth" value={data?.date_of_birth} />
              <Item label="Contact" value={`${data?.contact_number_primary}, ${data?.contact_number_alternate}`} />
              <Item label="Email" value={data?.email} />
              <Item label="Aadhaar" value={data?.aadhaar_number} />
              <Item label="PAN" value={data?.pan_number} />
              <Item label="Student ID" value={data?.student_id} />
            </Section>
            <ButtonGroup>
              <Next onClick={() => setStep(2)} />
            </ButtonGroup>
          </>
        )}

        {step === 2 && (
          <>
            <Section title="Academic Information">
              <Item label="Department" value={data?.department} />
              <Item label="Current Year" value={data?.current_year} />
              <Item label="Admission Year" value={data?.year_of_admission} />
              <Item label="Expected Graduation Year" value={data?.expected_graduation_year} />
              <Item label="SSC" value={`${data?.ssc_percentage}% (${data?.ssc_year})`} />
              <Item label="HSC" value={`${data?.hsc_percentage}% (${data?.hsc_year})`} />
              <Item label="Diploma" value={`${data?.diploma_percentage}% (${data?.diploma_year})`} />
            </Section>
            <ButtonGroup>
              <Prev onClick={() => setStep(1)} />
              <Next onClick={() => setStep(3)} />
            </ButtonGroup>
          </>
        )}

        {step === 3 && (
          <>
            <Section title="CGPA & Skills">
              {Array.from({ length: 8 }, (_, i) => (
                <Item key={i} label={`Sem ${i + 1} CGPA`} value={data?.[`sem${i + 1}_cgpa`] || "N/A"} />
              ))}
              <Item label="Languages" value={(data?.programming_languages || []).join(', ') || "None"} />
              <Item label="Soft Skills" value={(data?.soft_skills || []).join(', ') || "None"} />
            </Section>
            <ButtonGroup>
              <Prev onClick={() => setStep(2)} />
              <Next onClick={() => setStep(4)} />
            </ButtonGroup>
          </>
        )}

        {step === 4 && (
          <>
            <Section title="Certifications">
              {(data?.certifications || []).length > 0 ? (
                data.certifications.map((cert, idx) => (
                  <Item key={idx} label={cert?.name} value={cert?.issuer} />
                ))
              ) : (
                <p>No certifications added.</p>
              )}
            </Section>
            <Section title="Projects">
              {(data?.projects || []).length > 0 ? (
                data.projects.map((proj, idx) => (
                  <Item key={idx} label={proj?.title} value={proj?.description} />
                ))
              ) : (
                <p>No projects added.</p>
              )}
            </Section>
            <ButtonGroup>
              <Prev onClick={() => setStep(3)} />
              <Next onClick={() => setStep(5)} />
            </ButtonGroup>
          </>
        )}

        {step === 5 && (
          <>
            <Section title="Achievements">
              {(data?.achievements || []).length > 0 ? (
                data.achievements.map((a, i) => (
                  <Item key={i} label={a?.title} value={a?.description} />
                ))
              ) : (
                <p>No achievements added.</p>
              )}
            </Section>
            <Section title="Internships">
              {(data?.internships || []).length > 0 ? (
                data.internships.map((i, idx) => (
                  <Item key={idx} label={i?.company} value={`${i?.role} (${i?.duration})`} />
                ))
              ) : (
                <p>No internships added.</p>
              )}
            </Section>
            <ButtonGroup>
              <Prev onClick={() => setStep(4)} />
              <button style={btnStyle} onClick={() => alert("Redirect to edit page")}>Edit Profile</button>
            </ButtonGroup>
          </>
        )}
      </div>
    </div>
  );
};

// --- Components ---
const Section = ({ title, children }) => (
  <div style={{ marginBottom: "24px" }}>
    <h3 style={{ color: "#1e3a8a", marginBottom: "10px" }}>{title}</h3>
    {children}
  </div>
);

const Item = ({ label, value }) => (
  <p><strong>{label}:</strong> {value || "N/A"}</p>
);

const ButtonGroup = ({ children }) => (
  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
    {children}
  </div>
);

const Prev = ({ onClick }) => (
  <button style={btnStyle} onClick={onClick}>Previous</button>
);

const Next = ({ onClick }) => (
  <button style={btnStyle} onClick={onClick}>Next</button>
);

// --- Styles ---
const containerStyle = {
  maxWidth: "960px",
  margin: "0 auto",
  padding: "20px",
};

const cardStyle = {
  background: "#fff",
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
  marginTop: "20px",
};

const headerStyle = {
  color: "#1e1e3f",
  textAlign: "center",
  marginBottom: "24px",
};

const btnStyle = {
  backgroundColor: "#1e1e3f",
  color: "white",
  padding: "10px 18px",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  cursor: "pointer",
};

// --- Export ---
export default ProfilePage;
