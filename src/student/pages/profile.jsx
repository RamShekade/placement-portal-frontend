import React, { useEffect, useState } from "react";
import axios from "axios";
import CollegeHeader from "../../shared/CollegeHeader";

// Utility to format arrays or comma-separated strings
const formatList = (data) => {
  if (Array.isArray(data)) {
    return data.join(', ');
  } else if (typeof data === 'string') {
    return data.split(',').map(s => s.trim()).filter(Boolean).join(', ');
  }
  return '';
};

const ViewProfile = () => {
  const [profile, setProfile] = useState(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "https://placement-portal-backend.ramshekade20.workers.dev/api/student/profile/view",
          { withCredentials: true }
        );
        setProfile(res.data.profile);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading profile...</div>;
  if (error) return <div style={{ padding: "40px", color: "red", textAlign: "center" }}>{error}</div>;

  const data = profile;

  return (
    <div style={containerStyle}>
      <CollegeHeader />
      <div style={cardStyle}>
        <h2 style={headerStyle}>View Profile - Step {step}</h2>

        {step === 1 && (
          <>
            <Section title="Basic Information">
              <Item label="Name" value={`${data?.first_name || ''} ${data?.middle_name || ''} ${data?.last_name || ''}`} />
              <Item label="Gender" value={data?.gender} />
              <Item label="Date of Birth" value={data?.date_of_birth} />
              <Item label="Contact" value={`${data?.contact_number_primary}, ${data?.contact_number_alternate || 'N/A'}`} />
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
              <Item label="Languages" value={formatList(data?.programming_languages)} />
              <Item label="Skills" value={formatList(data?.skills)} />
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
              <Item label="Certifications" value={formatList(data?.certifications)} />
            </Section>
            <Section title="Projects">
              <Item label="Projects" value={formatList(data?.projects)} />
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
              <Item label="Achievements" value={formatList(data?.achievements)} />
            </Section>
            <Section title="Internships">
              <Item label="Internships" value={formatList(data?.internships)} />
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
export default ViewProfile;
