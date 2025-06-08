import React from 'react';

const InternshipAndWorkExperience = ({ data, setData }) => {
  const experiences = data.experiences || [];

  const calculateDuration = (start, end, currentlyWorking) => {
    if (!start) return '';
    const startDate = new Date(start);
    const endDate = currentlyWorking || !end ? new Date() : new Date(end);
    if (endDate < startDate) return '';

    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    let durationStr = '';
    if (years > 0) durationStr += `${years} year${years > 1 ? 's' : ''} `;
    if (months > 0) durationStr += `${months} month${months > 1 ? 's' : ''}`;

    return durationStr.trim() || 'Less than a month';
  };

  const handleExperienceChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedExperiences = [...experiences];
    updatedExperiences[index][name] = type === 'checkbox' ? checked : value;

    if (name === 'currentlyWorking' && checked) {
      updatedExperiences[index].endDate = '';
    }

    if (['startDate', 'endDate', 'currentlyWorking'].includes(name)) {
      updatedExperiences[index].duration = calculateDuration(
        updatedExperiences[index].startDate,
        updatedExperiences[index].endDate,
        updatedExperiences[index].currentlyWorking
      );
    }

    setData({ ...data, experiences: updatedExperiences });
  };

  const addExperience = () => {
    if (experiences.length < 3) {
      setData({
        ...data,
        experiences: [
          ...experiences,
          {
            title: '',
            employmentType: '',
            company: '',
            currentlyWorking: false,
            startDate: '',
            endDate: '',
            location: '',
            locationType: '',
            description: '',
            mediaLink: '',
            duration: ''
          }
        ]
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Internship & Work Experience submitted successfully.');
    console.log('Form Data:', data);
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
    color: '#000',
    backgroundColor: '#fff',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    marginBottom: '6px',
    fontWeight: '600',
    fontSize: '16px',
    color: '#1e1e3f'
  };

  const cardStyle = {
    backgroundColor: '#f0f4ff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 10px rgba(30, 30, 63, 0.1)',
    marginBottom: '20px'
  };

  return (
    <div style={{
      background: '#fff',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
      border: '1px solid #ccc',
      maxWidth: '900px',
      margin: '0 auto'
    }}>
      <div style={{
        backgroundColor: '#1e1e3f',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px 8px 0 0',
        fontSize: '18px',
        marginBottom: '25px',
        fontWeight: '600'
      }}>
        Internship & Work Experience
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
        {experiences.map((exp, idx) => (
          <div key={idx} style={cardStyle}>
            <div>
              <label style={labelStyle}>Title <span style={{ color: 'red' }}>*</span></label>
              <input type="text" name="title" placeholder="Job or Internship Title" value={exp.title} onChange={(e) => handleExperienceChange(idx, e)} required style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Employment Type <span style={{ color: 'red' }}>*</span></label>
              <input type="text" name="employmentType" placeholder="Full-time, Part-time, Internship etc." value={exp.employmentType} onChange={(e) => handleExperienceChange(idx, e)} required style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Company / Organization <span style={{ color: 'red' }}>*</span></label>
              <input type="text" name="company" placeholder="Company or Organization Name" value={exp.company} onChange={(e) => handleExperienceChange(idx, e)} required style={inputStyle} />
            </div>

            <div style={{ marginTop: '10px' }}>
              <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer', color: '#000', fontWeight: '500' }}>
                <input type="checkbox" name="currentlyWorking" checked={exp.currentlyWorking} onChange={(e) => handleExperienceChange(idx, e)} style={{ marginRight: '8px', width: '16px', height: '16px', accentColor: '#1e1e3f', backgroundColor: '#fff' }} />
                I am currently working in this role
              </label>
            </div>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '10px' }}>
              <div style={{ flex: '1 1 200px' }}>
                <label style={labelStyle}>Start Date <span style={{ color: 'red' }}>*</span></label>
                <input type="date" name="startDate" value={exp.startDate} onChange={(e) => handleExperienceChange(idx, e)} required style={inputStyle} />
              </div>

              <div style={{ flex: '1 1 200px' }}>
                <label style={labelStyle}>End Date {exp.currentlyWorking ? '(Disabled)' : <span style={{ color: 'red' }}>*</span>}</label>
                <input type="date" name="endDate" value={exp.endDate} onChange={(e) => handleExperienceChange(idx, e)} disabled={exp.currentlyWorking} required={!exp.currentlyWorking} style={inputStyle} />
              </div>

              <div style={{ flex: '1 1 200px' }}>
                <label style={labelStyle}>Duration</label>
                <input type="text" name="duration" value={exp.duration} readOnly style={{ ...inputStyle, backgroundColor: '#e9ecef', cursor: 'not-allowed' }} placeholder="Duration will be calculated" />
              </div>
            </div>

            <div style={{ marginTop: '10px' }}>
              <label style={labelStyle}>Location <span style={{ color: 'red' }}>*</span></label>
              <input type="text" name="location" placeholder="City, State, Country" value={exp.location} onChange={(e) => handleExperienceChange(idx, e)} required style={inputStyle} />
            </div>

            <div style={{ marginTop: '10px' }}>
              <label style={labelStyle}>Location Type <span style={{ color: 'red' }}>*</span></label>
              <input type="text" name="locationType" placeholder="Remote, On-site, Hybrid" value={exp.locationType} onChange={(e) => handleExperienceChange(idx, e)} required style={inputStyle} />
            </div>

            <div style={{ marginTop: '10px' }}>
              <label style={labelStyle}>Description</label>
              <textarea name="description" placeholder="Brief description about your role" value={exp.description} onChange={(e) => handleExperienceChange(idx, e)} rows={4} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />
            </div>

            <div style={{ marginTop: '10px' }}>
              <label style={labelStyle}>Media Link (URL)</label>
              <input type="url" name="mediaLink" placeholder="Link to certificate, project, or media" value={exp.mediaLink} onChange={(e) => handleExperienceChange(idx, e)} style={inputStyle} />
            </div>
          </div>
        ))}

        {experiences.length < 3 && (
          <button type="button" onClick={addExperience} style={{ padding: '10px 20px', backgroundColor: '#1e1e3f', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', width: 'fit-content' }}>
            Add Experience
          </button>
        )}

        <button type="submit" style={{ padding: '14px', backgroundColor: '#1e1e3f', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '16px' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default InternshipAndWorkExperience;
