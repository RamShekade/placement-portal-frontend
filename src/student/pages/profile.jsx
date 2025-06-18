import React, { useEffect, useState } from 'react';
import axios from 'axios';

const formatList = (data) => {
  if (Array.isArray(data)) {
    return data.join(', ');
  } else if (typeof data === 'string') {
    return data.split(',').map(s => s.trim()).filter(Boolean).join(', ');
  }
  return '';
};

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(
          'https://placement-portal-backend.ramshekade20.workers.dev/api/student/profile/view',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setProfile(res.data.profile);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>👤 {profile.first_name} {profile.last_name}'s Profile</h1>
      <img
        src={profile.profile_url}
        alt="Profile"
        style={{ width: '150px', borderRadius: '50%', marginBottom: '1rem' }}
      />

      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Student ID:</strong> {profile.student_id}</p>
      <p><strong>DOB:</strong> {profile.date_of_birth}</p>
      <p><strong>Gender:</strong> {profile.gender}</p>
      <p><strong>Department:</strong> {profile.department}</p>
      <p><strong>Contact:</strong> {profile.contact_number_primary}</p>

      <h2>📄 Resume</h2>
      <a href={profile.resume_url} target="_blank" rel="noreferrer">View Resume</a>

      <h2>📚 Academic Info</h2>
      <ul>
        <li>SSC: {profile.ssc_percentage}% ({profile.ssc_year})</li>
        <li><a href={profile.ssc_marksheet_url} target="_blank" rel="noreferrer">SSC Marksheet</a></li>
        <li>HSC: {profile.hsc_percentage || 'N/A'}% ({profile.hsc_year || 'N/A'})</li>
        <li><a href={profile.hsc_marksheet_url} target="_blank" rel="noreferrer">HSC Marksheet</a></li>
        <li>Diploma: {profile.diploma_percentage || 'N/A'}% ({profile.diploma_year || 'N/A'})</li>
        <li><a href={profile.diploma_marksheet_url} target="_blank" rel="noreferrer">Diploma Marksheet</a></li>
      </ul>

      <br></br>
      <br />
      <br />
      <br />

      <h2>🛠️ Skills & Projects</h2>
      <p><strong>Languages:</strong> {formatList(profile.programming_languages)}</p>
      <p><strong>Skills:</strong> {formatList(profile.skills)}</p>
      <p><strong>Certifications:</strong> {formatList(profile.certifications)}</p>
      <p><strong>Projects:</strong> {formatList(profile.projects)}</p>
      <p><strong>Achievements:</strong> {formatList(profile.achievements)}</p>
      <p><strong>Internships:</strong> {formatList(profile.internships)}</p>
    </div>
  );
};

export default ProfilePage;
