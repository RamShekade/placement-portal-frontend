import React, { useState } from 'react';

const AcademicDetails = () => {
  const [form, setForm] = useState({
    studentId: '',
    currentClass: '',
    admissionYear: '',
    passYear: '',
    department: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'studentId') {
      if (/^\d{0,12}$/.test(value)) {
        setForm({ ...form, [name]: value });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Academic details submitted successfully.');
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
    fontWeight: '500'
  };

  const yearOptions = [];
  for (let year = 2020; year <= 2030; year++) {
    yearOptions.push(<option key={year} value={year}>{year}</option>);
  }

  const departmentOptions = [
    'Humanities and Science',
    'Information Technology',
    'Civil Engineering',
    'Civil & Infrastructure Engineering',
    'Mechanical Engineering',
    'Computer Engineering',
    'Artificial Intelligence and Data Science Engineering',
    'Electronics and Telecommunication Engineering (Formerly Electronic Engineering',
    'Chemical Engineering)'
  ];

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
        Academic Details
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'grid',
          gap: '20px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        }}
      >
        <input
          name="studentId"
          placeholder="Student ID *"
          value={form.studentId}
          onChange={handleChange}
          required
          maxLength="12"
          pattern="\d{12}"
          style={inputStyle}
        />

        <input
          name="currentClass"
          placeholder="Current Year * "
          value={form.currentClass}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <select
          name="admissionYear"
          value={form.admissionYear}
          onChange={handleChange}
          required
          style={{ ...inputStyle, color: form.admissionYear ? '#000' : '#666' }}
        >
          <option value="">Admission Year *</option>
          {yearOptions}
        </select>

        <select
          name="passYear"
          value={form.passYear}
          onChange={handleChange}
          required
          style={{ ...inputStyle, color: form.passYear ? '#000' : '#666' }}
        >
          <option value="">Passing Year *</option>
          {yearOptions}
        </select>

        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          required
          style={{ ...inputStyle, color: form.department ? '#000' : '#666' }}
        >
          <option value="">Select Department *</option>
          {departmentOptions.map((dept, index) => (
            <option key={index} value={dept}>{dept}</option>
          ))}
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

export default AcademicDetails;
