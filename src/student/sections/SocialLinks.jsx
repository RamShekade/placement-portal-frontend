import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaCode, FaLaptopCode } from 'react-icons/fa';

const SocialLinks = () => {
  const [links, setLinks] = useState({
    linkedin: '',
    github: '',
    competitive: '',
    portfolio: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLinks((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Social links saved!');
    console.log('Saved Links:', links);
  };

  const formGroupStyle = {
    marginBottom: '25px',
    position: 'relative',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '600',
    fontSize: '15px',
    color: '#333',
  };

  const inputWrapperStyle = {
    position: 'relative',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 14px 12px 42px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '1.4px solid #ccc',
    fontSize: '15px',
    outline: 'none',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.04)',
  };

  const iconStyle = {
    position: 'absolute',
    top: '50%',
    left: '12px',
    transform: 'translateY(-50%)',
    color: '#1e1e3f',
    fontSize: '18px',
  };

  return (
    <div
      style={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '12px',
        maxWidth: '700px',
        margin: '0 auto',
        boxShadow: '0 4px 18px rgba(0,0,0,0.05)',
      }}
    >
      <h2
        style={{
          color: '#1e1e3f',
          marginBottom: '25px',
          textAlign: 'center',
          fontWeight: '700',
          fontSize: '22px',
        }}
      >
        Social & Coding Profiles
      </h2>

      <form onSubmit={handleSubmit}>
        {/* LinkedIn */}
        <div style={formGroupStyle}>
          <label style={labelStyle}>LinkedIn</label>
          <div style={inputWrapperStyle}>
            <FaLinkedin style={iconStyle} />
            <input
              type="url"
              name="linkedin"
              placeholder="https://www.linkedin.com/in/your-profile"
              value={links.linkedin}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        {/* GitHub */}
        <div style={formGroupStyle}>
          <label style={labelStyle}>GitHub</label>
          <div style={inputWrapperStyle}>
            <FaGithub style={iconStyle} />
            <input
              type="url"
              name="github"
              placeholder="https://github.com/your-username"
              value={links.github}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Competitive Coding Platform */}
        <div style={formGroupStyle}>
          <label style={labelStyle}>Competitive Coding Platform</label>
          <div style={inputWrapperStyle}>
            <FaCode style={iconStyle} />
            <input
              type="url"
              name="competitive"
              placeholder="https://leetcode.com/your-id"
              value={links.competitive}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Portfolio */}
        <div style={formGroupStyle}>
          <label style={labelStyle}>Portfolio</label>
          <div style={inputWrapperStyle}>
            <FaLaptopCode style={iconStyle} />
            <input
              type="url"
              name="portfolio"
              placeholder="https://your-portfolio.com"
              value={links.portfolio}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#1e1e3f',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontWeight: '700',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#333359')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#1e1e3f')}
        >
          Save Links
        </button>
      </form>
    </div>
  );
};

export default SocialLinks;
