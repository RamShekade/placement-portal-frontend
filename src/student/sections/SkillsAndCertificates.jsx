import React, { useState } from 'react';

const SkillsAndCertificates = () => {
  const [form, setForm] = useState({
    programmingLanguages: '',
    skills: '',
    techStack: '',
    certifications: [
      { name: '', link: '' }
    ],
    projects: [
      { title: '', description: '' }
    ]
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCertificationChange = (index, e) => {
    const certsCopy = [...form.certifications];
    certsCopy[index][e.target.name] = e.target.value;
    setForm({ ...form, certifications: certsCopy });
  };

  const addCertification = () => {
    if (form.certifications.length < 3) {
      setForm({ ...form, certifications: [...form.certifications, { name: '', link: '' }] });
    }
  };

  const handleProjectChange = (index, e) => {
    const projectsCopy = [...form.projects];
    projectsCopy[index][e.target.name] = e.target.value;
    setForm({ ...form, projects: projectsCopy });
  };

  const addProject = () => {
    if (form.projects.length < 3) {
      setForm({ ...form, projects: [...form.projects, { title: '', description: '' }] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Skills & Certificates submitted successfully.');
    console.log('Form Data:', form);
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
        marginBottom: '25px'
      }}>
        Skills & Certificates
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
        <div>
          <label style={labelStyle}>Known Programming Languages <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            name="programmingLanguages"
            placeholder="E.g., JavaScript, Python, Java"
            value={form.programmingLanguages}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Skills <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            name="skills"
            placeholder="E.g., Problem Solving, Data Structures"
            value={form.skills}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Tech Stack <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            name="techStack"
            placeholder="E.g., MERN, LAMP, .NET"
            value={form.techStack}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* Certifications Section */}
        <div>
          <label style={{ ...labelStyle, marginBottom: '12px' }}>Certifications</label>
          {form.certifications.map((cert, idx) => (
            <div key={idx} style={cardStyle}>
              <label style={labelStyle}>Certification Name</label>
              <input
                type="text"
                name="name"
                placeholder="Certification name"
                value={cert.name}
                onChange={(e) => handleCertificationChange(idx, e)}
                style={inputStyle}
              />
              <label style={{ ...labelStyle, marginTop: '12px' }}>Certification Link</label>
              <input
                type="url"
                name="link"
                placeholder="Certification URL"
                value={cert.link}
                onChange={(e) => handleCertificationChange(idx, e)}
                style={inputStyle}
              />
            </div>
          ))}
          {form.certifications.length < 3 && (
            <button
              type="button"
              onClick={addCertification}
              style={{
                padding: '10px 20px',
                backgroundColor: '#1e1e3f',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginTop: '10px'
              }}
            >
              Add Certification
            </button>
          )}
        </div>

        {/* Projects Section */}
        <div>
          <label style={{ ...labelStyle, marginBottom: '12px' }}>Projects</label>
          {form.projects.map((project, idx) => (
            <div key={idx} style={cardStyle}>
              <label style={labelStyle}>Project Title</label>
              <input
                type="text"
                name="title"
                placeholder="Project title"
                value={project.title}
                onChange={(e) => handleProjectChange(idx, e)}
                style={inputStyle}
              />
              <label style={{ ...labelStyle, marginTop: '12px' }}>Project Description</label>
              <textarea
                name="description"
                placeholder="Brief description"
                value={project.description}
                onChange={(e) => handleProjectChange(idx, e)}
                rows={4}
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          ))}

          {form.projects.length < 3 && (
            <button
              type="button"
              onClick={addProject}
              style={{
                padding: '10px 20px',
                backgroundColor: '#1e1e3f',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginTop: '10px'
              }}
            >
              Add Project
            </button>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: '14px',
            backgroundColor: '#1e1e3f',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '16px',
            marginTop: '10px'
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SkillsAndCertificates;
