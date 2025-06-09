import React, { useState, useEffect } from 'react';

const PersonalDetails = ({ data, setData }) => {
  const [form, setForm] = useState({
    first: '', middle: '', last: '', gender: '', dob: '',
    contact: '', email: '', contactAlt: '', aadhar: '', pan: ''
  });

  // Pre-fill the form when `data` is available
 useEffect(() => {
  if (data) {
    setForm(data);
  }
}, [data]);


  const handleChange = (e) => {
  let { name, value } = e.target;
  value = value.trimStart(); // avoid leading whitespace

  if (['first_name', 'middle_name', 'last_name'].includes(name) && /[^a-zA-Z\s]/.test(value)) return;
  if (['contact_number_primary', 'contact_number_alterante'].includes(name) && (!/^\d*$/.test(value) || value.length > 10)) return;
  if (name === 'aadhar_number' && (!/^\d*$/.test(value) || value.length > 12)) return;

  const updatedForm = { ...form, [name]: value };
  setForm(updatedForm);
  setData(updatedForm); // update parent state
};

  const handlePanChange = (e) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const updatedForm = { ...form, pan: value };
    setForm(updatedForm);
    setData(updatedForm); // update parent state
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
        fontWeight: '600'
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
          <input name="first_name" maxLength={20} value={form.first} onChange={handleChange} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Middle Name</label>
          <input name="middle_name" maxLength={20} value={form.middle} onChange={handleChange} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Last Name *</label>
          <input name="last_name" maxLength={20} value={form.last} onChange={handleChange} required style={inputStyle} />
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
          <input type="date" name="date_of_birth" value={form.date_of_birth} onChange={handleChange} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Contact Number *</label>
          <input
            name="contact_number_primary"
            type="tel"
            value={form.contact}
            onChange={handleChange}
            maxLength={10}
            required
            style={inputStyle}
            placeholder="10 digit mobile number"
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
            placeholder="example@email.com"
          />
        </div>

        <div>
          <label style={labelStyle}>Alternate Contact</label>
          <input
            name="contact_number_alternate"
            type="tel"
            value={form.contactAlt}
            onChange={handleChange}
            maxLength={10}
            style={inputStyle}
            placeholder="Optional 10-digit number"
          />
        </div>

        <div>
          <label style={labelStyle}>Aadhar Number *</label>
          <input
            name="aadhaar_number"
            type="text"
            value={form.aadhar}
            onChange={handleChange}
            maxLength={12}
            required
            style={inputStyle}
            placeholder="12-digit Aadhar number"
          />
        </div>

        <div>
          <label style={labelStyle}>PAN Card</label>
          <input
            name="pan"
            value={form.pan}
            maxLength={10}
            onChange={handlePanChange}
            style={inputStyle}
            placeholder="e.g. ABCDE1234F"
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
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;
