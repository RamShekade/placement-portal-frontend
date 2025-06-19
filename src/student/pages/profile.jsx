import React, { useEffect, useState } from "react";
import axios from "axios";
import CollegeHeader from "../../shared/CollegeHeader";

const ViewProfile = () => {
  const [data, setData] = useState(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "https://placement-portal-backend.ramshekade20.workers.dev/api/student/profile/view",
          {
            withCredentials: true
          }
        );
        setData(res.data.profile);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center", color: "#1a1a1a" }}>Loading profile...</div>;
  }

  if (error) {
    return <div style={{ padding: "40px", textAlign: "center", color: "red" }}>{error}</div>;
  }

  return (
    <div style={containerStyle}>
      <CollegeHeader />

      {data?.profile_url && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <img
            src={data.profile_url}
            alt="Profile"
            style={{ width: "120px", borderRadius: "50%", border: "2px solid #ddd" }}
          />
        </div>
      )}

      {data?.resume_url && (
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <a href={data.resume_url} target="_blank" rel="noreferrer" style={{ color: "#1e3a8a", fontWeight: "bold" }}>
            📄 View Resume
          </a>
        </div>
      )}

      <div style={cardStyle}>
        <h2 style={headerStyle}>View Profile - Step {step}</h2>

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
              <Item label="HSC" value={`${data?.hsc_percentage || 'N/A'}% (${data?.hsc_year || 'N/A'})`} />
              <Item label="Diploma" value={`${data?.diploma_percentage || 'N/A'}% (${data?.diploma_year || 'N/A'})`} />
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
              <Item label="Skills" value={(data?.skills || []).join(', ') || "None"} />
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
                  <Item key={idx} label={cert?.name || `Certification ${idx + 1}`} value={cert?.link || 'N/A'} />
                ))
              ) : (
                <p style={{ color: '#333' }}>No certifications added.</p>
              )}
            </Section>
            <Section title="Projects">
              {(data?.projects || []).length > 0 ? (
                data.projects.map((proj, idx) => (
                  <Item key={idx} label={proj?.title || `Project ${idx + 1}`} value={proj?.description || 'N/A'} />
                ))
              ) : (
                <p style={{ color: '#333' }}>No projects added.</p>
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
                  <Item key={i} label={a?.title || `Achievement ${i + 1}`} value={a?.description || 'N/A'} />
                ))
              ) : (
                <p style={{ color: '#333' }}>No achievements added.</p>
              )}
            </Section>
            <Section title="Internships">
              {(data?.internships || []).length > 0 ? (
                data.internships.map((i, idx) => (
                  <Item
                    key={idx}
                    label={i?.company || `Internship ${idx + 1}`}
                    value={`${i?.title || 'Role'} (${i?.duration || 'N/A'})`}
                  />
                ))
              ) : (
                <p style={{ color: '#333' }}>No internships added.</p>
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
  <p style={{ color: "#1a1a1a" }}><strong>{label}:</strong> {value || "N/A"}</p>
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
export default ViewProfile;
