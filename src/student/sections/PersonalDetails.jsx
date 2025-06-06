import React, { useState } from 'react';

const PersonalDetails = () => {
  const [form, setForm] = useState({
    first: '', middle: '', last: '', gender: '', dob: '',
    contact: '', email: '', contactAlt: '', aadhar: '', category: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Personal details submitted successfully.');
    console.log('Form Data:', form);
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1.5px solid #ccc',
    backgroundColor: '#fff',
    color: '#000',
    boxSizing: 'border-box',
  };

  return (
    <div style={{
      background: '#fff',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
      border: '1px solid #ccc',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    }}>
      <div style={{
        backgroundColor: '#1e1e3f',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px 8px 0 0',
        fontSize: '18px',
        marginBottom: '25px',
        fontWeight: '600',
        userSelect: 'none',
      }}>
        Personal Details
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'grid',
          gap: '20px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        }}
      >
        <input name="first" placeholder="First *" value={form.first} onChange={handleChange} required style={inputStyle} />
        <input name="middle" placeholder="Middle" value={form.middle} onChange={handleChange} style={inputStyle} />
        <input name="last" placeholder="Last *" value={form.last} onChange={handleChange} required style={inputStyle} />
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
          style={{ ...inputStyle, color: form.gender ? '#000' : '#999' }}
        >
          <option value="" disabled>Gender *</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="date" name="dob" value={form.dob} onChange={handleChange} required style={inputStyle} />
        <input name="contact" placeholder="Contact *" value={form.contact} onChange={handleChange} required style={inputStyle} />
        <input name="email" placeholder="Email ID *" type="email" value={form.email} onChange={handleChange} required style={inputStyle} />
        <input name="contactAlt" placeholder="Alternate Contact" value={form.contactAlt} onChange={handleChange} style={inputStyle} />
        <input name="aadhar" placeholder="Aadhar/PAN" value={form.aadhar} onChange={handleChange} style={inputStyle} />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          style={{ ...inputStyle, color: form.category ? '#000' : '#999' }}
        >
          <option value="" disabled>Category *</option>
          <option value="Open">Open</option>
          <option value="OBC">OBC</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
        </select>
        <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
          <button
            type="submit"
            style={{
              padding: '12px 30px',
              backgroundColor: '#1e1e3f',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: '0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1e1e3f')}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;
