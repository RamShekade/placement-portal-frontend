import React, { useState, useEffect } from 'react';

const SkillsAndCertificates = ({ data, setData }) => {
  const [suggestions, setSuggestions] = useState({
    programmingLanguages: [],
    skills: []
  });

  const fetchSuggestions = async (type, value) => {
    if (value.length < 2) {
      setSuggestions(prev => ({ ...prev, [type]: [] }));
      return;
    }

    try {
      const res = await fetch(`https://api.datamuse.com/sug?s=${value}`);
      const data = await res.json();
      const words = data.map(item => item.word);
      setSuggestions(prev => ({ ...prev, [type]: words }));
    } catch (err) {
      console.error('Error fetching suggestions:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
    if (name === 'programmingLanguages' || name === 'skills') {
      fetchSuggestions(name, value);
    }
  };

  const handleSelectSuggestion = (field, word) => {
    setData(prev => ({ ...prev, [field]: word }));
    setSuggestions(prev => ({ ...prev, [field]: [] }));
  };

  const handleCertificationChange = (index, e) => {
    const certs = [...(data.certifications || [{ name: '', link: '' }])];
    certs[index][e.target.name] = e.target.value;
    setData(prev => ({ ...prev, certifications: certs }));
  };

  const addCertification = () => {
    const certs = data.certifications || [];
    if (certs.length < 3) {
      setData(prev => ({
        ...prev,
        certifications: [...certs, { name: '', link: '' }]
      }));
    }
  };

  const handleProjectChange = (index, e) => {
    const projects = [...(data.projects || [{ title: '', description: '', url: '' }])];
    projects[index][e.target.name] = e.target.value;
    setData(prev => ({ ...prev, projects }));
  };

  const addProject = () => {
    const projects = data.projects || [];
    if (projects.length < 3) {
      setData(prev => ({
        ...prev,
        projects: [...projects, { title: '', description: '', url: '' }]
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Skills & Certificates submitted successfully.');
    console.log('Submitted:', data);
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
    color: '#000',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
    position: 'relative'
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

  const suggestionBoxStyle = {
    position: 'absolute',
    backgroundColor: '#1e1e3f',
    color: 'white',
    border: '1px solid #ccc',
    zIndex: 100,
    width: '100%',
    borderRadius: '6px',
    marginTop: '2px',
    maxHeight: '150px',
    overflowY: 'auto'
  };

  const renderInputWithSuggestions = (label, name, placeholder) => (
    <div style={{ position: 'relative' }}>
      <label style={labelStyle}>{label} <span style={{ color: 'red' }}>*</span></label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={data[name] || ''}
        onChange={handleChange}
        required
        style={inputStyle}
        autoComplete="off"
      />
      {suggestions[name].length > 0 && (
        <div style={suggestionBoxStyle}>
          {suggestions[name].map((s, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectSuggestion(name, s)}
              style={{
                padding: '10px',
                cursor: 'pointer',
                borderBottom: '1px solid #333'
              }}
            >
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );

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
        {renderInputWithSuggestions("Known Programming Languages", "programmingLanguages", "E.g., JavaScript, Python")}
        {renderInputWithSuggestions("Skills", "skills", "E.g., Problem Solving, DSA")}

        {/* Certifications Section */}
        <div>
          <label style={{ ...labelStyle, marginBottom: '12px' }}>Certifications</label>
          {(data.certifications || [{ name: '', link: '' }]).map((cert, idx) => (
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
          {(data.certifications?.length || 0) < 3 && (
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
          {(data.projects || [{ title: '', description: '', url: '' }]).map((project, idx) => (
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
              <label style={{ ...labelStyle, marginTop: '12px' }}>Project URL</label>
              <input
                type="url"
                name="url"
                placeholder="https://yourproject.com"
                value={project.url}
                onChange={(e) => handleProjectChange(idx, e)}
                style={inputStyle}
              />
            </div>
          ))}

          {(data.projects?.length || 0) < 3 && (
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
