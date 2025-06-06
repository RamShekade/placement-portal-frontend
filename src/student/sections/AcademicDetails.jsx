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
    setForm({ ...form, [e.target.name]: e.target.value });
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
          style={inputStyle}
        />
        <input
          name="currentClass"
          placeholder="Current Class *"
          value={form.currentClass}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="number"
          name="admissionYear"
          placeholder="Year of Admission *"
          value={form.admissionYear}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="number"
          name="passYear"
          placeholder="Year of Passing *"
          value={form.passYear}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          name="department"
          placeholder="Department *"
          value={form.department}
          onChange={handleChange}
          required
          style={inputStyle}
        />

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
