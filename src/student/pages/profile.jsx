import React, { useEffect, useState } from "react";
import axios from "axios";
import CollegeHeader from "../../shared/CollegeHeader";

const formatList = (value) => {
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'string') return value;
  return 'None';
};

const ViewProfile = () => {
  const [data, setData] = useState(null);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "https://placement-portal-backend.ramshekade20.workers.dev/api/student/profile/view",
          { withCredentials: true }
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
    return <div style={{ padding: "40px", textAlign: "center" }}>Loading profile...</div>;
  }

  if (error) {
    return <div style={{ padding: "40px", color: "red", textAlign: "center" }}>{error}</div>;
  }

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
              <Item label="Current CGPA" value={data?.cgpa} />
              <Item label="Last Semester" value={data?.last_semester} />
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
              {(data?.certifications || []).length > 0 ? (
                data.certifications.map((cert, idx) => (
                  <Item key={idx} label={cert?.name} value={cert?.link} />
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
  <p style={{ color: "#333", fontSize: "16px" }}><strong>{label}:</strong> {value || "N/A"}</p>
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
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: "#1f2937"
};

const cardStyle = {
  background: "#f9fafb",
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  marginTop: "20px"
};

const headerStyle = {
  color: "#111827",
  textAlign: "center",
  marginBottom: "24px",
  fontSize: "24px"
};

const btnStyle = {
  backgroundColor: "#1e3a8a",
  color: "white",
  padding: "10px 18px",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  cursor: "pointer"
};

// --- Export ---
export default ViewProfile;
