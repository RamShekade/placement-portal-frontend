import React, { useState } from 'react';

const PersonalDetails = () => {
  const [form, setForm] = useState({
    first: '', middle: '', last: '', gender: '', dob: '',
    contact: '', email: '', contactAlt: '', aadhar: '', pan: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict specific fields
    if (['first', 'middle', 'last'].includes(name) && /[^a-zA-Z]/.test(value)) return;
    if (name === 'contact' && /\D/.test(value)) return;
    if (name === 'contactAlt' && /\D/.test(value)) return;
    if (name === 'aadhar' && /\D/.test(value)) return;

    setForm({ ...form, [name]: value });
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
    boxSizing: 'border-box'
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '5px',
    display: 'block',
    fontSize: '14px',
    color: '#000',
  };

  return (
    <div style={{
      background: '#fff',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
      border: '1px solid #ccc',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#1e1e3f',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px 8px 0 0',
        fontSize: '18px',
        marginBottom: '25px',
        fontWeight: '600',
        userSelect: 'none'
      }}>
        Personal Details
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'grid',
          gap: '20px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
        }}
      >
        <div>
          <label style={labelStyle}>First Name *</label>
          <input name="first" maxLength={10} value={form.first} onChange={handleChange} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Middle Name</label>
          <input name="middle" maxLength={10} value={form.middle} onChange={handleChange} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Last Name *</label>
          <input name="last" maxLength={10} value={form.last} onChange={handleChange} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Gender *</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
            style={{ ...inputStyle, color: form.gender ? '#000' : '#999' }}
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Date of Birth *</label>
          <input type="date" name="dob" value={form.dob} onChange={handleChange} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Contact Number *</label>
          <input
            name="contact"
            type="tel"
            maxLength={10}
            value={form.contact}
            onChange={handleChange}
            required
            style={inputStyle}
            title="Enter 10 digit mobile number"
          />
        </div>

        <div>
          <label style={labelStyle}>Email ID *</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
            title="Enter valid email address"
          />
        </div>

        <div>
          <label style={labelStyle}>Alternate Contact</label>
          <input
            name="contactAlt"
            type="tel"
            maxLength={10}
            value={form.contactAlt}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Aadhar Number *</label>
          <input
            name="aadhar"
            maxLength={12}
            value={form.aadhar}
            onChange={handleChange}
            required
            style={inputStyle}
            title="Enter 12 digit Aadhar number"
          />
        </div>

        <div>
          <label style={labelStyle}>PAN Card</label>
          <input
            name="pan"
            maxLength={10}
            value={form.pan}
            onChange={(e) => {
              const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
              setForm({ ...form, pan: value });
            }}
            style={inputStyle}
            placeholder="eg...ABCDE1234F"
          />
        </div>

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
              transition: '0.3s'
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
